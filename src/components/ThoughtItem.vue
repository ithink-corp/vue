<script setup>
defineProps({
  message: String,
});
</script>

<template>
  <article
    class="text-sm bg-stone-800 text-stone-50 border-stone-50/10 border-[1px] px-2 py-1 rounded"
  >
    {{ message }}
  </article>
</template>
