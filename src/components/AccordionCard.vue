<script setup>
import { ref, nextTick } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  teaser: { type: Array, default: () => [] },
});

const isOpen = ref(false);
const bodyRef = ref(null);
const bodyHeight = ref("0px");

async function toggle() {
  if (!isOpen.value) {
    isOpen.value = true;
    await nextTick();
    bodyHeight.value = bodyRef.value.scrollHeight + "px";
  } else {
    bodyHeight.value = bodyRef.value.scrollHeight + "px";
    requestAnimationFrame(() => {
      bodyHeight.value = "0px";
      setTimeout(() => {
        isOpen.value = false;
      }, 250);
    });
  }
}
</script>

<template>
  <div class="accordion" :class="{ open: isOpen }">
    <button class="accordion-header" @click="toggle" :aria-expanded="isOpen">
      <div class="accordion-title">
        <strong>{{ title }}</strong>
        <span v-if="subtitle" class="accordion-subtitle">{{ subtitle }}</span>
        <ul v-if="teaser.length" class="accordion-teaser">
          <li v-for="(item, i) in teaser" :key="i">{{ item }}</li>
        </ul>
      </div>
      <span class="accordion-icon" :class="{ rotated: isOpen }">+</span>
    </button>
    <div
      ref="bodyRef"
      class="accordion-body-wrapper"
      :style="{ maxHeight: isOpen ? bodyHeight : '0px' }"
    >
      <div class="accordion-body">
        <slot />
      </div>
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
  transition: background 0.2s;
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

.accordion-teaser {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.accordion-teaser li {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  padding-left: 0.9rem;
  position: relative;
  opacity: 0.85;
}

.accordion-teaser li::before {
  content: "→";
  position: absolute;
  left: 0;
  font-size: 0.7rem;
  opacity: 0.6;
}

.accordion-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform 0.25s ease;
}

.accordion-icon.rotated {
  transform: rotate(45deg);
}

.accordion-body-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease;
}

.accordion-body {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-card);
}
</style>
