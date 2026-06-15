<script setup>
import SectionWrapper from "../components/SectionWrapper.vue";
import { education } from "../data/education.js";
</script>

<template>
  <SectionWrapper id="education" title="Education">
    <div class="education-list">
      <div v-for="(item, index) in education" :key="index" class="education-card">
        <div class="education-main">
          <h3 class="education-degree">{{ item.degree }}</h3>
          <span class="education-duration">{{ item.duration }}</span>
        </div>
        <p class="education-institution">{{ item.institution }}</p>
        <div class="education-meta">
          <span>{{ item.location }}</span>
          <span class="education-score">{{ item.score }}</span>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.education-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.education-card {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  background: var(--color-card);
  transition: border-color 0.2s;
}

.education-card:hover {
  border-color: var(--color-border-hover);
}

.education-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.education-degree {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.education-duration {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.education-institution {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.4rem;
}

.education-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.education-score {
  font-weight: 600;
  color: var(--color-text);
}

@media (max-width: 480px) {
  .education-main,
  .education-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
