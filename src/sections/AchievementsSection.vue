<script setup>
import SectionWrapper from "../components/SectionWrapper.vue";
import AccordionCard from "../components/AccordionCard.vue";
import { achievements } from "../data/achievements.js";
</script>

<template>
  <SectionWrapper id="achievements" title="Achievements">
    <div class="achievements-list">
      <AccordionCard
        v-for="(item, index) in achievements"
        :key="index"
        :title="item.title"
        :subtitle="item.summary"
      >
        <ul class="achievement-details">
          <li v-for="(detail, i) in item.details" :key="i">{{ detail }}</li>
        </ul>
      </AccordionCard>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.achievement-details {
  padding-left: 1.25rem;
  margin: 0;
}

.achievement-details li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
  line-height: 1.5;
}
</style>
