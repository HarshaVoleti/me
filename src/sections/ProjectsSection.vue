<script setup>
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { projects } from "../data/projects.js";
</script>

<template>
  <SectionWrapper id="projects" title="Projects">
    <div class="projects-grid">
      <article v-for="(project, index) in projects" :key="index" class="project-card">
        <img
          :src="project.image"
          :alt="project.title"
          class="project-image"
          loading="lazy"
        />
        <div class="project-body">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tech">
            <TagBadge v-for="t in project.tech" :key="t" :label="t" />
          </div>
          <div class="project-links">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              GitHub
            </a>
            <a
              v-if="project.live"
              :href="project.live"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              Live Demo
            </a>
          </div>
        </div>
      </article>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
  background: var(--color-card);
  transition: border-color 0.2s;
}

.project-card:hover {
  border-color: var(--color-border-hover);
}

.project-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

.project-body {
  padding: 1rem 1.25rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.project-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
}

.project-link {
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  text-decoration: none;
  color: var(--color-text);
  transition: border-color 0.2s, background 0.2s;
}

.project-link:hover {
  border-color: var(--color-border-hover);
  background: var(--color-bg);
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
