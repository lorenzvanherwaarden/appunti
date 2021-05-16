<template>
  <div class="writer">
    <Preview :note="note" />
    <Editor :note="note" @update:note="note = $event" />
  </div>
</template>

<script setup>
import Preview from './Preview.vue'
import Editor from './Editor.vue'
</script>

<script>
export default {
  data() {
    return {
      note: ''
    }
  }
}
</script>

<style scoped>
.writer {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>