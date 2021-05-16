<template>
  <div class="writer">
    <NoteTitle />
    <Preview />
    <Editor />
  </div>
</template>

<script setup>
import NoteTitle from './NoteTitle.vue'
import Preview from './Preview.vue'
import Editor from './Editor.vue'
</script>

<style scoped>
.writer {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>