<template>
  <Container />
</template>

<script setup>
import './styles/app.css'

import Container from './components/Container.vue'
</script>

<script>
export default {
  created() {
    this.$store.dispatch('setupToken')
  }
}
</script>


<style>
#app {
  height: 100%;
}
</style>
