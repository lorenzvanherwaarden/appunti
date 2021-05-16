<template>
    <div class="container">
        <Library />
        <Writer />
    </div>
</template>

<script setup>
import Library from './Library.vue'
import Writer from './Writer.vue'
</script>

<style scoped>
.container {
    display: flex;
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>
