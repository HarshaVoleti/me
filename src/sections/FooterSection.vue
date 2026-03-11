<template>
  <footer class="footer">
    <p>&copy; {{ year }} {{ name }}. Built with Vue.js.</p>
  </footer>
</template>

<script setup>
import { profile } from "../data/profile.js";

const year = new Date().getFullYear();
const name = profile.name;
</script>

<style scoped>
.footer {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
}
</style>
