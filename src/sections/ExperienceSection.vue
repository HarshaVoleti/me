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
        :teaser="job.bullets ? job.bullets.slice(0, 2) : []"
      >
        <p class="exp-description">{{ job.description }}</p>

        <ul v-if="job.bullets && job.bullets.length" class="exp-bullets">
          <li v-for="(item, i) in job.bullets" :key="i">{{ item }}</li>
        </ul>

        <div class="exp-tech">
          <TagBadge v-for="tech in job.technologies" :key="tech" :label="tech" />
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
  font-size: 0.9rem;
}

.exp-bullets {
  padding-left: 1.25rem;
  margin: 0 0 1rem;
}

.exp-bullets li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.4rem;
  line-height: 1.55;
}

.exp-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}
</style>
