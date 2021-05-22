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
    this.$store.dispatch('setupRepo')
  }
}
</script>


<style>
#app {
  height: 100%;
}
</style>
