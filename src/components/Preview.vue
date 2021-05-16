<template>
  <div class="preview" v-html="parsedNote" />
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked'

export default {
  props: {
    note: String,
  },

  data() {
    return {
      parsedNote: '',
    }
  },

  watch: {
    note() {
      this.parse()
    }
  },
  
  methods: {
    parse: debounce(function() {
      this.parsedNote = marked(this.note)
    }, 200)
  }
}
</script>

<style scoped>
.preview {
  flex: 2;
  padding: var(--spacing-x-large);
}
</style>
