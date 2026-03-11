<script setup>
import { reactive } from "vue";
import SectionWrapper from "../components/SectionWrapper.vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const submitted = reactive({ value: false });

function handleSubmit() {
  console.log("Contact form submitted:", { ...form });
  submitted.value = true;
  form.name = "";
  form.email = "";
  form.message = "";
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
}
</script>

<template>
  <SectionWrapper id="contact" title="Contact">
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="contact-name">Name</label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          required
          placeholder="Your name"
          autocomplete="name"
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
        />
      </div>
      <div class="form-group">
        <label for="contact-message">Message</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          required
          rows="5"
          placeholder="Your message..."
        ></textarea>
      </div>
      <button type="submit" class="submit-btn">Send Message</button>
      <p v-if="submitted.value" class="success-msg">
        Message logged to console. Thank you!
      </p>
    </form>
  </SectionWrapper>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
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

.form-group textarea {
  resize: vertical;
}

.submit-btn {
  align-self: flex-start;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.submit-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.success-msg {
  font-size: 0.85rem;
  color: #22c55e;
  margin-top: 0.25rem;
}
</style>
