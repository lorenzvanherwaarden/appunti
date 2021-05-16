<template>
  <div class="container">
    <Library />
    <Writer v-if="noteGuid" />
    <div class="empty-state" v-else>
      Please select a note or create a new one
    </div>
  </div>
</template>

<script setup>
import Library from './Library.vue'
import Writer from './Writer.vue'
</script>

<script>
export default {
  computed: {
    noteGuid() {
      return this.$store.getters.getGuid
    }
  },
}
</script>


<style scoped>
.container {
  display: flex;
  height: 100%;
  padding: 0;
  margin: 0;
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
