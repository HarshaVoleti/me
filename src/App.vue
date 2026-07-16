<script setup>
import { onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import FooterSection from "./sections/FooterSection.vue";
import InsightsPanel from "./components/InsightsPanel.vue";
import { showInsights } from "./utils/adminState.js";
import { trackPageView } from "./utils/supabase.js";

onMounted(() => {
  trackPageView(null); // overall visit — section=null means landing/hero
});
</script>

<template>
  <NavBar />
  <router-view />
  <FooterSection />
  <InsightsPanel v-if="showInsights" />
</template>
