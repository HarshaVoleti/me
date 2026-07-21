<script setup>
import { onMounted } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";
import { certifications } from "../data/certifications.js";

const CREDLY_SCRIPT_SRC = "//cdn.credly.com/assets/utilities/embed.js";

onMounted(() => {
  if (document.querySelector(`script[src="${CREDLY_SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = CREDLY_SCRIPT_SRC;
  document.body.appendChild(script);
});
</script>

<template>
  <SectionWrapper id="certifications" title="Certifications">
    <div class="certifications-grid">
      <div v-for="cert in certifications" :key="cert.badgeId" class="certification-badge">
        <div
          :data-iframe-width="150"
          :data-iframe-height="270"
          :data-share-badge-id="cert.badgeId"
          data-share-badge-host="https://www.credly.com"
        ></div>
        <a
          class="certification-verify-link"
          :href="`https://www.credly.com/badges/${cert.badgeId}`"
          target="_blank"
          rel="noopener noreferrer"
          >Verify credential</a
        >
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.certifications-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.certification-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.certification-verify-link {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  text-decoration: none;
}

.certification-verify-link:hover {
  color: var(--color-text);
  text-decoration: underline;
}
</style>
