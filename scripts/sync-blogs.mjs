#!/usr/bin/env node
// Reads /blogs/*.md, diffs against the blog_posts table by content hash, and
// upserts selected posts via the Supabase secret key. Publishing a post
// is running this script — there is no other write path into blog_posts.

import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";

try {
  process.loadEnvFile();
} catch {
  // no .env file — assume env vars are set externally (e.g. CI)
}

const ROOT = process.cwd();
const BLOGS_DIR = path.join(ROOT, "blogs");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const allFlag = args.includes("--all");
const slugArgs = args.filter((a) => !a.startsWith("--"));

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SECRET_KEY) {
  fail(
    "missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SECRET_KEY in .env (see .env.example)."
  );
}

const supabase = createClient(SUPABASE_URL, SECRET_KEY, {
  auth: { persistSession: false },
});

function hashContent(raw) {
  return createHash("sha256").update(raw).digest("hex");
}

async function loadLocalPosts() {
  let files;
  try {
    files = (await readdir(BLOGS_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    fail(`couldn't read ${BLOGS_DIR} — does the /blogs directory exist?`);
  }

  const posts = [];
  const seenSlugs = new Map();

  for (const file of files) {
    const filePath = path.join(BLOGS_DIR, file);
    const raw = await readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    if (!data.slug) fail(`${file}: missing required frontmatter field "slug"`);
    if (!data.title) fail(`${file}: missing required frontmatter field "title"`);

    if (seenSlugs.has(data.slug)) {
      fail(`duplicate slug "${data.slug}" in ${file} and ${seenSlugs.get(data.slug)}`);
    }
    seenSlugs.set(data.slug, file);

    posts.push({
      file,
      slug: data.slug,
      title: data.title,
      summary: data.summary ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      published: Boolean(data.published),
      publishedAt: data.published_at ?? null,
      content: content.trim(),
      contentHash: hashContent(raw),
    });
  }

  return posts;
}

async function loadRemoteHashes() {
  const { data, error } = await supabase.from("blog_posts").select("slug, content_hash");
  if (error) fail(`couldn't read blog_posts from Supabase: ${error.message}`);
  return new Map(data.map((row) => [row.slug, row.content_hash]));
}

function statusFor(post, remoteHashes) {
  if (!remoteHashes.has(post.slug)) return "NEW";
  if (remoteHashes.get(post.slug) !== post.contentHash) return "MODIFIED";
  return "UNCHANGED";
}

function printStatus(posts, remoteHashes) {
  console.log("Local posts:\n");
  for (const post of posts) {
    const status = statusFor(post, remoteHashes).padEnd(9);
    console.log(`  ${status} ${post.slug}`);
  }
  console.log("");
}

async function selectInteractive(posts, remoteHashes) {
  const syncable = posts.filter((p) => statusFor(p, remoteHashes) !== "UNCHANGED");
  if (!syncable.length) {
    console.log("Nothing to sync — all local posts match Supabase.");
    return [];
  }

  const { checkbox } = await import("@inquirer/prompts");
  const selected = await checkbox({
    message: "Select posts to sync (space to toggle, enter to confirm)",
    choices: posts.map((post) => {
      const status = statusFor(post, remoteHashes);
      return {
        name: `${status.padEnd(9)} ${post.slug}`,
        value: post.slug,
        checked: status !== "UNCHANGED",
        disabled: status === "UNCHANGED" ? "unchanged" : false,
      };
    }),
  });

  if (!selected.length) {
    console.log("\nNo posts selected — nothing to sync.");
  }

  return posts.filter((p) => selected.includes(p.slug));
}

function selectBySlugs(posts, slugs) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const missing = slugs.filter((s) => !bySlug.has(s));
  if (missing.length) {
    fail(`unknown slug(s): ${missing.join(", ")} — not found in ${BLOGS_DIR}`);
  }
  return slugs.map((s) => bySlug.get(s));
}

function selectAll(posts, remoteHashes) {
  return posts.filter((p) => statusFor(p, remoteHashes) !== "UNCHANGED");
}

async function syncPost(post, remoteHashes) {
  const status = statusFor(post, remoteHashes);

  if (status === "UNCHANGED") {
    console.log(`  skipped   ${post.slug} (unchanged)`);
    return;
  }

  const verb = status === "NEW" ? "created" : "updated";

  if (dryRun) {
    console.log(`  would-${status === "NEW" ? "create" : "update"} ${post.slug}`);
    return;
  }

  const { error } = await supabase.from("blog_posts").upsert(
    {
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      tags: post.tags,
      content_md: post.content,
      content_hash: post.contentHash,
      published: post.published,
      published_at: post.publishedAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.log(`  error     ${post.slug}: ${error.message}`);
    return;
  }

  console.log(`  ${verb.padEnd(9)} ${post.slug}`);
}

async function main() {
  const posts = await loadLocalPosts();
  const remoteHashes = await loadRemoteHashes();

  printStatus(posts, remoteHashes);

  let toSync;
  if (slugArgs.length) {
    toSync = selectBySlugs(posts, slugArgs);
  } else if (allFlag) {
    toSync = selectAll(posts, remoteHashes);
    if (!toSync.length) {
      console.log("Nothing to sync — all local posts match Supabase.");
      return;
    }
  } else {
    toSync = await selectInteractive(posts, remoteHashes);
    if (!toSync.length) return;
  }

  console.log(dryRun ? "\nDry run — no writes will be made:\n" : "\nSyncing:\n");
  for (const post of toSync) {
    await syncPost(post, remoteHashes);
  }
}

main();
