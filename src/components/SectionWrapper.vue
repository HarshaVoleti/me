<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <section class="section">
    <h2 class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
}
</style>
