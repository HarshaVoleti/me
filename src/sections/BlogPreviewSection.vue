<script setup>
import { ref, onMounted } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { getPublishedPosts } from "../utils/supabase.js";

const POST_LIMIT = 3;

const posts = ref([]);
const loaded = ref(false);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function load() {
  try {
    const all = await getPublishedPosts();
    posts.value = all.slice(0, POST_LIMIT);
  } catch (e) {
    posts.value = [];
  } finally {
    loaded.value = true;
  }
}

onMounted(load);
</script>

<template>
  <SectionWrapper v-if="loaded && posts.length" id="blog-preview" title="Blogs">
    <div class="preview-grid">
      <router-link
        v-for="post in posts"
        :key="post.slug"
        :to="`/blogs/${post.slug}`"
        class="preview-card"
      >
        <time class="preview-date" :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
        <h3 class="preview-title">{{ post.title }}</h3>
        <p class="preview-summary">{{ post.summary }}</p>
        <div v-if="post.tags && post.tags.length" class="preview-tags">
          <TagBadge v-for="t in post.tags" :key="t" :label="t" />
        </div>
      </router-link>
    </div>

    <router-link to="/blogs" class="view-all">View all posts →</router-link>
  </SectionWrapper>
</template>

<style scoped>
.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.preview-card {
  display: block;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-card);
  padding: 1.125rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.preview-card:hover,
.preview-card:focus-visible {
  border-color: var(--color-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.preview-date {
  display: block;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.preview-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: 0.4rem;
}

.preview-summary {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.view-all {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border-hover);
  padding-bottom: 0.1rem;
}

.view-all:hover {
  color: var(--color-text-secondary);
}
</style>
