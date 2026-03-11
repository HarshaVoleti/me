<script setup>
import { ref, nextTick } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { projects } from "../data/projects.js";

const expandedIndex = ref(null);
const detailRefs = ref([]);

async function toggle(index) {
  if (expandedIndex.value === index) {
    expandedIndex.value = null;
  } else {
    expandedIndex.value = index;
    await nextTick();
  }
}

function truncate(text, max = 80) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}
</script>

<template>
  <SectionWrapper id="projects" title="Projects">
    <div class="projects-grid">
      <article
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        :class="{ expanded: expandedIndex === index }"
        @click="toggle(index)"
      >
        <img
          :src="project.image"
          :alt="project.title"
          class="project-image"
          loading="lazy"
        />
        <div class="project-body">
          <div class="project-header">
            <h3 class="project-title">{{ project.title }}</h3>
            <span class="expand-icon" :class="{ rotated: expandedIndex === index }">+</span>
          </div>
          <p class="project-summary">
            {{ expandedIndex === index ? project.description : truncate(project.description) }}
          </p>

          <div
            class="project-details"
            :class="{ open: expandedIndex === index }"
          >
            <div v-if="project.highlights && project.highlights.length" class="project-highlights">
              <h4>Highlights</h4>
              <ul>
                <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
              </ul>
            </div>

            <div class="project-tech">
              <TagBadge v-for="t in project.tech" :key="t" :label="t" />
            </div>

            <div class="project-links" v-if="project.links && project.links.length">
              <a
                v-for="link in project.links"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link"
                @click.stop
              >
                {{ link.label }}
              </a>
            </div>
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
  cursor: pointer;
  align-self: start;
  transition: border-color 0.2s, transform 0.25s ease, box-shadow 0.25s ease;
}

.project-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.project-card.expanded {
  transform: none;
  box-shadow: none;
}

.project-card.expanded:hover {
  transform: none;
}

.project-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

.project-body {
  padding: 1rem 1.25rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
}

.expand-icon {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  transition: transform 0.25s ease;
  line-height: 1;
}

.expand-icon.rotated {
  transform: rotate(45deg);
}

.project-summary {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.project-details {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.project-details.open {
  grid-template-rows: 1fr;
}

.project-details > * {
  overflow: hidden;
}

.project-highlights {
  margin-top: 0.75rem;
}

.project-highlights h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

.project-highlights ul {
  padding-left: 1.25rem;
  margin: 0;
}

.project-highlights li {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.2rem;
  line-height: 1.5;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.project-link {
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}

.project-link:hover {
  border-color: var(--color-border-hover);
  background: var(--color-bg);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
