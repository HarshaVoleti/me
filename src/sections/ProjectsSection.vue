<script setup>
import { ref, computed, watch, nextTick } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";
import TagBadge from "../components/TagBadge.vue";
import { projects } from "../data/projects.js";

const FILTERS = [
  { label: "Featured", key: "featured" },
  { label: "All", key: "all" },
  { label: "Apps", key: "app" },
  { label: "Client", key: "client" },
  { label: "Work", key: "work" },
];

const activeFilter = ref("featured");
const selectedProject = ref(null);
const closeButtonRef = ref(null);

const filtered = computed(() => {
  if (activeFilter.value === "featured") return projects.filter((p) => p.featured);
  if (activeFilter.value === "all") return projects;
  return projects.filter((p) => p.category === activeFilter.value);
});

function openModal(project) {
  selectedProject.value = project;
}

function closeModal() {
  selectedProject.value = null;
}

watch(selectedProject, async (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
    await nextTick();
    closeButtonRef.value?.focus();
  } else {
    document.body.style.overflow = "";
  }
});

function onBackdropKeydown(e) {
  if (e.key === "Escape") closeModal();
}
</script>

<template>
  <SectionWrapper id="projects" title="Projects">
    <div class="filter-tabs" role="tablist" aria-label="Filter projects">
      <button
        v-for="f in FILTERS"
        :key="f.key"
        class="filter-tab"
        :class="{ active: activeFilter === f.key }"
        role="tab"
        :aria-selected="activeFilter === f.key"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="projects-grid">
      <article
        v-for="project in filtered"
        :key="project.title"
        class="project-card"
        tabindex="0"
        @click="openModal(project)"
        @keydown.enter="openModal(project)"
        @keydown.space.prevent="openModal(project)"
      >
        <img
          :src="project.image"
          :alt="project.title"
          class="project-image"
          loading="lazy"
        />
        <div class="project-body">
          <span class="project-category">{{ project.category }}</span>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-summary">{{ project.description }}</p>
          <div class="project-tech-preview">
            <TagBadge v-for="t in project.tech.slice(0, 3)" :key="t" :label="t" />
            <span v-if="project.tech.length > 3" class="tech-more">+{{ project.tech.length - 3 }}</span>
          </div>
        </div>
      </article>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedProject"
        class="modal-backdrop"
        @click.self="closeModal"
        @keydown="onBackdropKeydown"
      >
        <div class="modal" role="dialog" :aria-label="selectedProject.title" aria-modal="true">
          <button
            ref="closeButtonRef"
            class="modal-close"
            @click="closeModal"
            aria-label="Close"
          >✕</button>

          <img
            :src="selectedProject.image"
            :alt="selectedProject.title"
            class="modal-image"
          />

          <div class="modal-body">
            <span class="project-category">{{ selectedProject.category }}</span>
            <h2 class="modal-title">{{ selectedProject.title }}</h2>
            <p class="modal-description">{{ selectedProject.description }}</p>

            <div
              v-if="selectedProject.highlights && selectedProject.highlights.length"
              class="modal-highlights"
            >
              <h4>Highlights</h4>
              <ul>
                <li v-for="(h, i) in selectedProject.highlights" :key="i">{{ h }}</li>
              </ul>
            </div>

            <div class="modal-tech">
              <TagBadge v-for="t in selectedProject.tech" :key="t" :label="t" />
            </div>

            <div
              v-if="selectedProject.links && selectedProject.links.filter((l) => l.url).length"
              class="modal-links"
            >
              <a
                v-for="link in selectedProject.links.filter((l) => l.url)"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="modal-link"
              >{{ link.label }} ↗</a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </SectionWrapper>
</template>

<style scoped>
/* ── Filter tabs ── */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.filter-tab {
  font-size: 0.82rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.filter-tab:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
}

.filter-tab.active {
  border-color: var(--color-text);
  background: var(--color-text);
  color: var(--color-bg);
}

/* ── Grid ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  align-items: start;
}

/* ── Card ── */
.project-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-card);
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  outline: none;
}

.project-card:hover,
.project-card:focus-visible {
  border-color: var(--color-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.project-card:focus-visible {
  box-shadow: 0 0 0 3px var(--color-border-hover);
}

.project-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
  display: block;
}

.project-body {
  padding: 1rem 1.125rem;
}

.project-category {
  display: inline-block;
  font-size: 0.7rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  margin-bottom: 0.35rem;
}

.project-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.4rem;
  line-height: 1.3;
}

.project-summary {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.tech-more {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  max-width: 640px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text);
  font-size: 0.8rem;
  z-index: 1;
  transition: background 0.2s, border-color 0.2s;
}

.modal-close:hover {
  border-color: var(--color-border-hover);
  background: var(--color-card);
}

.modal-close:focus-visible {
  outline: 2px solid var(--color-border-hover);
  outline-offset: 2px;
}

.modal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid var(--color-border);
}

.modal-body {
  padding: 1.5rem;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0.25rem 0 0.75rem;
  line-height: 1.25;
}

.modal-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 1.25rem;
}

.modal-highlights {
  margin-bottom: 1.25rem;
}

.modal-highlights h4 {
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  margin-bottom: 0.6rem;
}

.modal-highlights ul {
  padding-left: 1.1rem;
  margin: 0;
}

.modal-highlights li {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.4rem;
  line-height: 1.6;
}

.modal-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.modal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding-top: 0.25rem;
  border-top: 1px solid var(--color-border);
  margin-top: 0.25rem;
  padding-top: 1rem;
}

.modal-link {
  font-size: 0.82rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  text-decoration: none;
  color: var(--color-text);
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}

.modal-link:hover {
  border-color: var(--color-border-hover);
  background: var(--color-bg);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .modal-backdrop {
    padding: 0;
    align-items: flex-end;
  }

  .modal {
    max-height: 92vh;
    border-radius: 16px 16px 0 0;
  }

  .modal-image {
    border-radius: 16px 16px 0 0;
  }
}
</style>
