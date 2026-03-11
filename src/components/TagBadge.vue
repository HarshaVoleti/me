<script setup>
defineProps({
  label: { type: String, required: true },
});
</script>

<template>
  <span class="badge">{{ label }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}
</style>
