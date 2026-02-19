<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>

<script setup>
import { provide, inject, ref } from "vue";

/* ===== CONTEXT ===== */
const formFields = ref({});

function registerField(name, state) {
  formFields.value[name] = state;
}

function getField(name) {
  return formFields.value[name] || {};
}

provide("formContext", {
  registerField,
  getField,
});

/* ===== FORM FIELD ===== */
export function useFormField(name) {
  const form = inject("formContext");

  if (!form) {
    throw new Error("useFormField must be used inside Form");
  }

  const state = ref({
    error: null,
    value: null,
  });

  form.registerField(name, state);

  return state;
}
</script>

<style scoped>
.text-destructive {
  color: red;
}
.text-muted {
  color: #666;
}
</style>
