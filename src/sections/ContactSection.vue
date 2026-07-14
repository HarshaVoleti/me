<script setup>
import { reactive, ref } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";
import { profile } from "../data/profile.js";
import { submitContact } from "../utils/supabase.js";

const form = reactive({ name: "", email: "", message: "" });
const state = ref("idle"); // idle | loading | success | error

async function handleSubmit() {
  state.value = "loading";
  try {
    await submitContact({ ...form });
    state.value = "success";
    form.name = "";
    form.email = "";
    form.message = "";
    setTimeout(() => (state.value = "idle"), 4000);
  } catch {
    state.value = "error";
    setTimeout(() => (state.value = "idle"), 4000);
  }
}
</script>

<template>
  <SectionWrapper id="contact" title="Contact">
    <div class="contact-body">
      <p class="contact-blurb">
        Open to senior individual contributor roles and staff-level positions at
        product or infrastructure teams. Best reached by email.
      </p>

      <div class="contact-links">
        <a :href="'mailto:' + profile.social.email" class="contact-link contact-link--mono">
          {{ profile.social.email }}
        </a>
        <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer" class="contact-link">
          LinkedIn
        </a>
        <a :href="profile.social.github" target="_blank" rel="noopener noreferrer" class="contact-link">
          GitHub
        </a>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Your name"
              autocomplete="name"
              :disabled="state === 'loading'"
            />
          </div>
          <div class="form-group">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              placeholder="you@example.com"
              autocomplete="email"
              :disabled="state === 'loading'"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            rows="5"
            placeholder="What's on your mind?"
            :disabled="state === 'loading'"
          ></textarea>
        </div>
        <div class="form-footer">
          <button type="submit" class="submit-btn" :disabled="state === 'loading'">
            {{ state === "loading" ? "Sending…" : "Send Message" }}
          </button>
          <p v-if="state === 'success'" class="form-status form-status--ok">Sent — I'll get back to you soon.</p>
          <p v-if="state === 'error'" class="form-status form-status--err">Something went wrong. Try emailing directly.</p>
        </div>
      </form>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.contact-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-blurb {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  max-width: 480px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.contact-link {
  font-size: 0.85rem;
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}

.contact-link:hover {
  border-color: var(--color-border-hover);
  background: var(--color-card);
  transform: translateY(-1px);
}

.contact-link--mono {
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 520px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-border-hover);
}

.form-group input:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
}

.form-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.submit-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.85;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-status {
  font-size: 0.85rem;
}

.form-status--ok {
  color: #22c55e;
}

.form-status--err {
  color: #ef4444;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
