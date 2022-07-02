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
  <header class="bg-stone-800 py-1 px-3 flex items-center justify-between">
    <h1 class="text-stone-50 font-bold text-lg">ithink</h1>
    <button
      class="button px-2 py-.5 bg-orange-500 rounded text-stone-50 font-bold"
      @click="openDialog"
      :disabled="!(thoughtList && thoughtList.isLoaded)"
    >
      New
    </button>
  </header>

  <main class="mt-4 mx-2 mb-8">
    <ThoughtList ref="thoughtList" />
  </main>

  <Teleport to="body">
    <NewModal ref="newModal" />
    <SnackBar />
  </Teleport>
</template>
