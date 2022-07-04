<script setup>
import ThoughtItem from "@/components/ThoughtItem.vue";
import getThoughtsStore from "@/stores/thoughts";
import { storeToRefs } from "pinia";

import getSnackbarStore from "@/stores/snackbar";
const { new: newSnackbar, reset: closeSnackbar } = getSnackbarStore();

const { load: loadItems } = getThoughtsStore();
const { items } = storeToRefs(getThoughtsStore());

async function load() {
  try {
    await loadItems();
  } catch (e) {
    newSnackbar("Failed to load data", "Retry", () => {
      load();
      closeSnackbar();
    });
  }
}

await load();
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li class="min-h-[4rem] w-48" v-for="message in items" :key="message">
      <ThoughtItem :message="message" />
    </li>
  </ul>
</template>
