<template>
  <div v-if="username" class="user-info">
    <img v-if="avatar" :src="avatar" class="user-info__avatar" />
    <div class="user-info__name">
       <h4 class="u-mb-x-small u-mt-x-small" v-text="username" />
       <button class="button--x-small" @click="goToSettings">
         Settings
       </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      username: 'getUsername', 
      avatar: 'getAvatarUrl',
    })
  },

  methods: {
    goToSettings() {
      this.$router.push('settings')
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-medium);
}

.user-info__avatar {
  margin-right: var(--spacing-medium);
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.user-info__name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
