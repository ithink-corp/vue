<script setup>
import { ref } from "vue";
import NewModal from "@/components/NewModal.vue";
import SnackBar from "@/components/SnackBar.vue";
import ThoughtList from "@/components/ThoughtList.vue";
import ThoughtSkeleton from "@/components/ThoughtSkeleton.vue";

// NEW MODAL
const isNewModalOpen = ref(false);
function openDialog() {
  isNewModalOpen.value = true;
}
function close() {
  isNewModalOpen.value = false;
}

const thoughtList = ref(null);
</script>

<template>
  <header class="flex items-center justify-between bg-stone-800 py-1 px-3">
    <h1 class="text-lg font-bold text-stone-50">ithink</h1>
    <button
      class="button py-.5 rounded bg-orange-500 px-2 font-bold text-stone-50"
      @click="openDialog"
      :disabled="!thoughtList"
    >
      New
    </button>
  </header>

  <main class="mx-2 mt-4 mb-8">
    <Suspense>
      <ThoughtList ref="thoughtList" />

      <template #fallback>
        <div class="flex flex-wrap gap-2">
          <ThoughtSkeleton v-for="i in 15" :key="i" />
        </div>
      </template>
    </Suspense>
  </main>

  <Teleport to="body">
    <NewModal v-if="isNewModalOpen" @close="close" />
    <SnackBar />
  </Teleport>
</template>
