<script setup>
import { ref, onMounted } from "vue";
import { profile } from "../data/profile.js";

const isVisible = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true;
  });
});
</script>

<template>
  <section id="hero" class="hero fade-section" :class="{ visible: isVisible }">
    <img :src="profile.image" :alt="profile.name" class="hero-image" />
    <h1 class="hero-name">{{ profile.name }}</h1>
    <p class="hero-tagline">{{ profile.tagline }}</p>
    <p class="hero-bio">{{ profile.bio }}</p>
    <div class="hero-links">
      <a
        v-if="profile.social.github"
        :href="profile.social.github"
        target="_blank"
        rel="noopener noreferrer"
        class="hero-link"
      >
        GitHub
      </a>
      <a
        v-if="profile.social.linkedin"
        :href="profile.social.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="hero-link"
      >
        LinkedIn
      </a>
      <a
        v-if="profile.social.email"
        :href="'mailto:' + profile.social.email"
        class="hero-link"
      >
        Email
      </a>
    </div>

    <div class="hero-stats">
      <div v-for="stat in profile.stats" :key="stat.label" class="stat-item">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  max-width: 800px;
  margin: 0 auto;
  padding: 5rem 1.5rem 3rem;
  text-align: center;
}

.hero-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  margin-bottom: 1.5rem;
  object-fit: cover;
}

.hero-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.hero-tagline {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.hero-bio {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.hero-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-link {
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}

.hero-link:hover {
  border-color: var(--color-border-hover);
  background: var(--color-card);
  transform: translateY(-1px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  font-family: var(--font-mono);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

@media (max-width: 480px) {
  .hero-stats {
    gap: 1.5rem;
  }
}
</style>
