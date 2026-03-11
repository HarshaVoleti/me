<script setup>
import SectionWrapper from "../components/SectionWrapper.vue";
import AccordionCard from "../components/AccordionCard.vue";
import TagBadge from "../components/TagBadge.vue";
import { experience } from "../data/experience.js";
</script>

<template>
  <SectionWrapper id="experience" title="Experience">
    <div class="experience-list">
      <AccordionCard
        v-for="(job, index) in experience"
        :key="index"
        :title="job.role"
        :subtitle="`${job.company} · ${job.duration}`"
      >
        <p class="exp-description">{{ job.description }}</p>

        <div v-if="job.responsibilities.length" class="exp-block">
          <h4>Responsibilities</h4>
          <ul>
            <li v-for="(item, i) in job.responsibilities" :key="i">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="job.achievements.length" class="exp-block">
          <h4>Achievements</h4>
          <ul>
            <li v-for="(item, i) in job.achievements" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div class="exp-tech">
          <TagBadge
            v-for="tech in job.technologies"
            :key="tech"
            :label="tech"
          />
        </div>
      </AccordionCard>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.exp-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.exp-block {
  margin-bottom: 1rem;
}

.exp-block h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

.exp-block ul {
  padding-left: 1.25rem;
  margin: 0;
}

.exp-block li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.exp-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}
</style>
