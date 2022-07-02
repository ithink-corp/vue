<script setup>
import { storeToRefs } from "pinia";
import getSnackbarStore from "@/stores/snackbar";

const { message, actionMessage, actionMethod } = storeToRefs(
  getSnackbarStore()
);
</script>

<template>
  <Transition name="slide-up">
    <dialog
      v-if="message"
      open
      class="fixed isolate bottom-0 transform -translate-x-1/2 left-1/2 text-sm m-0 mb-4 min-w-[70%] max-w-[90%] truncate sm:left-0 sm:translate-x-0 sm:ml-4 sm:min-w-0 sm:w-72 py-2 px-4 bg-stone-50/10 backdrop-blur-lg text-stone-50 flex justify-between items-center rounded shadow-md shadow-stone-800"
    >
      <main>{{ message }}</main>
      <footer v-if="actionMessage && actionMethod">
        <button
          @click="actionMethod"
          class="text-stone-50 bg-stone-700 px-2 py-1 rounded-sm hover:filer hover:brightness-110 active:brightness-90"
        >
          {{ actionMessage }}
        </button>
      </footer>
    </dialog>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  @apply transform translate-y-full opacity-0;
}
</style>
