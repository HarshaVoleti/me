<script setup>
import { ref, onMounted } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { getPublishedPosts } from "../utils/supabase.js";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

async function load() {
  loading.value = true;
  error.value = null;
  try {
    posts.value = await getPublishedPosts();
  } catch (e) {
    error.value = "Couldn't load posts. Please try again later.";
  } finally {
    loading.value = false;
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

onMounted(load);
</script>

<template>
  <SectionWrapper id="blog" title="Blog">
    <p v-if="loading" class="state-text">Loading posts…</p>
    <p v-else-if="error" class="state-text error">{{ error }}</p>
    <p v-else-if="!posts.length" class="state-text">No posts yet — check back soon.</p>

    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.slug" class="post-item">
        <router-link :to="`/blog/${post.slug}`" class="post-link">
          <h3 class="post-title">{{ post.title }}</h3>
          <time class="post-date" :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
          <p class="post-summary">{{ post.summary }}</p>
          <div v-if="post.tags && post.tags.length" class="post-tags">
            <TagBadge v-for="t in post.tags" :key="t" :label="t" />
          </div>
        </router-link>
      </li>
    </ul>
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

.post-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-card);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.post-item:hover,
.post-item:focus-within {
  border-color: var(--color-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.post-link {
  display: block;
  padding: 1.25rem 1.375rem;
  text-decoration: none;
  color: inherit;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: 0.35rem;
}

.post-date {
  display: block;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
  margin-bottom: 0.6rem;
}

.post-summary {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin-bottom: 0.75rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
</style>
