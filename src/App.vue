<script setup>
import NavBar from "./components/NavBar.vue";
import HeroSection from "./sections/HeroSection.vue";
import SkillsSection from "./sections/SkillsSection.vue";
import ExperienceSection from "./sections/ExperienceSection.vue";
import ProjectsSection from "./sections/ProjectsSection.vue";
import AchievementsSection from "./sections/AchievementsSection.vue";
import ContactSection from "./sections/ContactSection.vue";
import FooterSection from "./sections/FooterSection.vue";
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <AchievementsSection />
    <ContactSection />
  </main>
  <FooterSection />
</template>
