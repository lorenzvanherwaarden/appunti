<template>
  <div class="container">
    <Library />
    <router-view />
  </div>
</template>

<script setup>
import Library from './Library.vue'
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
