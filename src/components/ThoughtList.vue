<script setup>
import { ref, watch } from "vue";
import ThoughtSkeleton from "@/components/ThoughtSkeleton.vue";
import ThoughtItem from "@/components/ThoughtItem.vue";
import getThoughtsStore from "@/stores/thoughts";
import { storeToRefs } from "pinia";

import getSnackbarStore from "@/stores/snackbar";
const { new: newSnackbar, reset: closeSnackbar } = getSnackbarStore();

const { load: loadItems } = getThoughtsStore();
const { items } = storeToRefs(getThoughtsStore());
const isLoaded = ref(false);

async function load() {
  try {
    await loadItems(); // load data
    isLoaded.value = true;
  } catch (e) {
    newSnackbar("Failed to load data", "Retry", () => {
      load();
      closeSnackbar();
    });
  }
}

watch(
  isLoaded,
  (state) => {
    if (state) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  },
  { immediate: true }
);

load();

defineExpose({
  isLoaded,
});
</script>

<template>
  <div class="flex flex-wrap gap-2" v-if="isLoaded">
    <ThoughtItem
      class="min-h-[4rem] w-48"
      v-for="message in items"
      :message="message"
      :key="message"
    />
  </div>
  <div class="flex flex-wrap gap-2" v-else>
    <ThoughtSkeleton v-for="i in 15" :key="i" />
  </div>
</template>
