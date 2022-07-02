<script setup>
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import getSnackbarStore from "@/stores/snackbar";
import getThoughtsStore from "@/stores/thoughts";

const isOpen = ref(false);
function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}

const textarea = ref(null);
watch(
  textarea,
  (target) => {
    if (target) target.focus();
  },
  { immediate: true }
);

const dialog = ref(null);
const isLoading = ref(false);
onClickOutside(dialog, () => {
  if (!isLoading.value) close();
});

const { new: newSnackbar, reset: closeSnackbar } = getSnackbarStore();

const thought = ref("");
function clear() {
  thought.value = "";
}

const { add: addItem } = getThoughtsStore();
async function submit() {
  // prepare loading
  isLoading.value = true;
  dialog.value.setAttribute("inert", true);

  try {
    // send data to server
    await addItem(thought.value);

    // trigger snackbar
    newSnackbar("Posted!", null, null, 3000);
    clear();
  } catch (e) {
    newSnackbar(
      "An error happened.",
      "Retry",
      () => {
        open();
        closeSnackbar();
      },
      5000
    );
  }

  close();
  dialog.value.removeAttribute("inert");
  isLoading.value = false;
}

defineExpose({
  open,
  close,
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 grid place-items-center backdrop-brightness-50"
  >
    <dialog
      open
      class="bg-stone-800 rounded-lg py-4 px-3 w-[75%] sm:w-96"
      ref="dialog"
    >
      <main>
        <form method="dialog" @submit.prevent="submit">
          <label class="sr-only" for="content">Content</label>
          <textarea
            id="content"
            ref="textarea"
            v-model="thought"
            class="block w-full text-xs bg-transparent text-stone-50 border-[1px] border-stone-700 rounded focus:border-orange-500 focus:shadow-none resize-none caret-orange-500 text-sm h-32"
          ></textarea>

          <div class="flex items-center justify-end gap-2 mt-2">
            <button
              @click.prevent="close"
              value="cancel"
              class="button px-2 py-.5 text-stone-50 text-sm font-bold bg-stone-400 rounded"
            >
              Cancel
            </button>
            <button
              value="default"
              class="button px-2 py-.5 text-stone-50 text-sm font-bold bg-orange-500 rounded"
            >
              Post
            </button>
          </div>
        </form>
      </main>
      <footer class="mt-4">
        <p class="text-xs text-stone-300">
          <font-awesome-icon
            icon="fa-solid fa-circle-info"
            class="mr-1"
          />Whatever you write will become public.
        </p>
      </footer>
    </dialog>
  </div>
</template>

<style scoped>
dialog[inert] {
  filter: brightness(0.9);
}
</style>
