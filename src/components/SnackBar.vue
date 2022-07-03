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
      class="fixed bottom-0 left-1/2 isolate m-0 mb-4 flex min-w-[70%] max-w-[90%] -translate-x-1/2 transform items-center justify-between truncate rounded bg-stone-50/10 py-2 px-4 text-sm text-stone-50 shadow-md shadow-stone-800 backdrop-blur-lg sm:left-0 sm:ml-4 sm:w-72 sm:min-w-0 sm:translate-x-0"
    >
      <main>{{ message }}</main>
      <footer v-if="actionMessage && actionMethod">
        <button
          @click="actionMethod"
          class="hover:filer rounded-sm bg-stone-700 px-2 py-1 text-stone-50 hover:brightness-110 active:brightness-90"
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
  @apply translate-y-full transform opacity-0;
}
</style>
