<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import getSnackbarStore from "@/stores/snackbar";
import getThoughtsStore from "@/stores/thoughts";

const emit = defineEmits(['close'])
function close() {
  emit('close')
}

// AUTOMATICALLY FOCUS TEXTAREA
const textarea = ref(null);
onMounted(() => {
  textarea.value.focus()
})

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
    class="fixed inset-0 grid place-items-center backdrop-brightness-50"
  >
    <dialog
      open
      class="w-[75%] rounded-lg bg-stone-800 py-4 px-3 sm:w-96"
      ref="dialog"
    >
      <main>
        <form method="dialog" @submit.prevent="submit">
          <label class="sr-only" for="content">Content</label>
          <textarea
            id="content"
            ref="textarea"
            v-model="thought"
            class="block h-32 w-full resize-none rounded border-[1px] border-stone-700 bg-transparent text-xs text-sm text-stone-50 caret-orange-500 focus:border-orange-500 focus:shadow-none"
          ></textarea>

          <div class="mt-2 flex items-center justify-end gap-2">
            <button
              @click.prevent="close"
              value="cancel"
              class="button py-.5 rounded bg-stone-400 px-2 text-sm font-bold text-stone-50"
            >
              Cancel
            </button>
            <button
              value="default"
              class="button py-.5 rounded bg-orange-500 px-2 text-sm font-bold text-stone-50"
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
