<script setup>
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { skills } from "../data/skills.js";
</script>

<template>
  <SectionWrapper id="skills" title="Skills">
    <div class="skills-grid">
      <div v-for="group in skills" :key="group.category" class="skill-group">
        <h3 class="skill-category">{{ group.category }}</h3>
        <div class="skill-items">
          <TagBadge v-for="item in group.items" :key="item" :label="item" />
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.skill-group {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-card);
  transition: border-color 0.2s, transform 0.25s ease, box-shadow 0.25s ease;
}

.skill-group:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.skill-category {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-text);
  font-family: var(--font-mono);
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>
