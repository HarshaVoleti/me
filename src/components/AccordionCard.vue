<script setup>
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
});

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="accordion" :class="{ open: isOpen }">
    <button class="accordion-header" @click="toggle" :aria-expanded="isOpen">
      <div class="accordion-title">
        <strong>{{ title }}</strong>
        <span v-if="subtitle" class="accordion-subtitle">{{ subtitle }}</span>
      </div>
      <span class="accordion-icon">{{ isOpen ? "−" : "+" }}</span>
    </button>
    <div class="accordion-body" v-show="isOpen">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.accordion:hover {
  border-color: var(--color-border-hover);
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--color-card);
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  gap: 1rem;
}

.accordion-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.accordion-subtitle {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.accordion-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

.accordion-body {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-card);
}
</style>
