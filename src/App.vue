<script setup>
import { ref } from "vue";
import NewModal from "@/components/NewModal.vue";
import SnackBar from "@/components/SnackBar.vue";
import ThoughtList from "@/components/ThoughtList.vue";

// NEW MODAL
const newModal = ref(null);
function openDialog() {
  newModal.value.open();
}

const thoughtList = ref(null);
</script>

<template>
  <header class="flex items-center justify-between bg-stone-800 py-1 px-3">
    <h1 class="text-lg font-bold text-stone-50">ithink</h1>
    <button
      class="button py-.5 rounded bg-orange-500 px-2 font-bold text-stone-50"
      @click="openDialog"
      :disabled="!(thoughtList && thoughtList.isLoaded)"
    >
      New
    </button>
  </header>

  <main class="mx-2 mt-4 mb-8">
    <ThoughtList ref="thoughtList" />
  </main>

  <Teleport to="body">
    <NewModal ref="newModal" />
    <SnackBar />
  </Teleport>
</template>
