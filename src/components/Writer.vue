<template>
  <div v-if="noteGuid" class="writer">
    <NoteTitle />
    <Preview />
    <Editor />
  </div>
  <div v-else class="empty-state">
    Please select a note or create a new one
  </div>
</template>

<script setup>
import NoteTitle from './NoteTitle.vue'
import Preview from './Preview.vue'
import Editor from './Editor.vue'
import { mapGetters } from 'vuex'
</script>

<script>

export default {
  computed: {
    ...mapGetters({ noteGuid: 'getGuid' })
  }
}
</script>


<style scoped>
.writer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.empty-state {
  align-self: center;
  width: 100%;
  padding: var(--spacing-x-large);
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: center;
}
</style>