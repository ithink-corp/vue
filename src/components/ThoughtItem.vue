<script setup>
defineProps({
  message: String,
});
</script>

<template>
  <article
    class="rounded border-[1px] border-stone-50/10 bg-stone-800 px-2 py-1 text-sm text-stone-50"
  >
    {{ message }}
  </article>
</template>
