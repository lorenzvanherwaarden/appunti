<template>
  <div class="u-mb-medium">
    <a href="" @click="back" class="back-button"> ← Back </a>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-button {
  font-size: 1.7rem;
}
</style>
