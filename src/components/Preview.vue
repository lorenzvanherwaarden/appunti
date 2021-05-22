<template>
  <div class="preview-container" >
    <div class="preview" v-html="parsedNote" :style="'--font-size: calc(' + zoomLevel + ' * 1.5rem);'" />
    <div class="view-tools">
      <button 
        class="button--subtle button--small" 
        :disabled="zoomLevel < 0.7"
        @click="decreaseZoom"
      >
        Zoom out
      </button>
      <button 
        class="button--subtle button--small"
        :disabled="zoomLevel > 1.6"
        @click="increaseZoom"
      >
        Zoom in
      </button>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked'

export default {
  data() {
    return {
      parsedNote: '',
      zoomLevel: 1.0
    }
  },

  computed: {
    note() {
      return this.$store.getters.getContent
    },
  },

  watch: {
    note() {
      this.parse()
    }
  },
  
  methods: {
    parse: debounce(function() {
      this.parsedNote = marked(this.note)
    }, 100),

    increaseZoom() {
      this.zoomLevel *= 1.25
    },

    decreaseZoom() {
      this.zoomLevel /= 1.25
    }
  }
}
</script>

<style scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: var(--spacing-small) var(--spacing-x-large) var(--spacing-x-large);
}

.preview {
  flex: 1;
  font-size: var(--font-size);
}

.view-tools {
  display: flex;
  justify-content: flex-end;
}
</style>
