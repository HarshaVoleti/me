<script setup>
import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/common";
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { getPostBySlug } from "../utils/supabase.js";
import { DEFAULT_TITLE } from "../router/index.js";

const route = useRoute();

const post = ref(null);
const html = ref("");
const loading = ref(true);
const notFound = ref(false);
const error = ref(null);
const contentRef = ref(null);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function load(slug) {
  loading.value = true;
  notFound.value = false;
  error.value = null;
  post.value = null;
  html.value = "";
  document.title = "Loading… — Harsha Voleti";

  try {
    const data = await getPostBySlug(slug);
    if (!data) {
      notFound.value = true;
      document.title = "Post not found — Harsha Voleti";
      return;
    }
    post.value = data;
    html.value = DOMPurify.sanitize(marked.parse(data.content_md));
    document.title = `${data.title} — Harsha Voleti`;
    await nextTick();
    contentRef.value?.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  } catch (e) {
    error.value = "Couldn't load this post. Please try again later.";
    document.title = DEFAULT_TITLE;
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.slug,
  (slug) => { if (slug) load(slug); },
  { immediate: true }
);
</script>

<template>
  <SectionWrapper id="blog-post" :title="post ? post.title : 'Blog'">
    <p v-if="loading" class="state-text">Loading…</p>
    <p v-else-if="notFound" class="state-text">
      Post not found. It may have been unpublished, or the link is wrong.
      <router-link to="/blog" class="back-link">Back to blog</router-link>
    </p>
    <p v-else-if="error" class="state-text error">{{ error }}</p>

    <article v-else-if="post" class="post-article">
      <div class="post-meta">
        <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
        <div v-if="post.tags && post.tags.length" class="post-tags">
          <TagBadge v-for="t in post.tags" :key="t" :label="t" />
        </div>
      </div>
      <div ref="contentRef" class="markdown-body" v-html="html"></div>
    </article>
  </SectionWrapper>
</template>

<style scoped>
.state-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.state-text.error {
  color: #d9534f;
}

.back-link {
  color: var(--color-text);
  text-decoration: underline;
}

.post-article {
  max-width: 68ch;
  margin: 0 auto;
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.post-meta time {
  font-size: 0.78rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

/* ── Markdown body ── */
.markdown-body {
  line-height: 1.75;
  color: var(--color-text);
  font-size: 0.95rem;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.35;
  margin: 1.75rem 0 0.75rem;
}

.markdown-body :deep(h1) { font-size: 1.4rem; }
.markdown-body :deep(h2) { font-size: 1.2rem; }
.markdown-body :deep(h3) { font-size: 1.05rem; }

.markdown-body :deep(p),
.markdown-body :deep(ul),
.markdown-body :deep(ol),
.markdown-body :deep(blockquote) {
  margin-bottom: 1.1rem;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.4rem;
}

.markdown-body :deep(li) {
  margin-bottom: 0.4rem;
}

.markdown-body :deep(a) {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--color-border);
  padding-left: 1rem;
  color: var(--color-text-secondary);
}

.markdown-body :deep(img) {
  border-radius: 8px;
  margin: 1rem 0;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2rem 0;
}

.markdown-body :deep(table) {
  display: block;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25rem;
  font-size: 0.88rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--color-border);
  padding: 0.55rem 0.85rem;
  text-align: left;
  vertical-align: top;
}

.markdown-body :deep(th) {
  background: var(--color-card);
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
}

.markdown-body :deep(:not(pre) > code) {
  background: var(--code-bg);
  border-radius: 4px;
  padding: 0.15rem 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.85em;
}

.markdown-body :deep(pre) {
  background: var(--code-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem 1.125rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}

.markdown-body :deep(pre code) {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.6;
  background: none;
  padding: 0;
}

/* ── Highlight.js token colors, mapped to theme tokens ── */
.markdown-body :deep(.hljs-keyword),
.markdown-body :deep(.hljs-selector-tag),
.markdown-body :deep(.hljs-literal) {
  color: var(--code-keyword);
}

.markdown-body :deep(.hljs-string),
.markdown-body :deep(.hljs-regexp) {
  color: var(--code-string);
}

.markdown-body :deep(.hljs-comment),
.markdown-body :deep(.hljs-quote) {
  color: var(--code-comment);
  font-style: italic;
}

.markdown-body :deep(.hljs-title),
.markdown-body :deep(.hljs-title.function_),
.markdown-body :deep(.hljs-section) {
  color: var(--code-function);
}

.markdown-body :deep(.hljs-number) {
  color: var(--code-number);
}

.markdown-body :deep(.hljs-attr),
.markdown-body :deep(.hljs-attribute),
.markdown-body :deep(.hljs-variable),
.markdown-body :deep(.hljs-params) {
  color: var(--code-attr);
}
</style>
