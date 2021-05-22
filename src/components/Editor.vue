<template>
  <div class="editor">
    <textarea v-model="note" class="editor__textarea" />
    <div v-if="!note" class="editor__empty">
      Edit here
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      note: this.$store.getters.getContent,
    }
  },

  computed: {
    ...mapGetters(['getContent', 'getGuid']),
  },

  watch: {
    note(){
      this.handleNoteUpdate()
    },

    getGuid() {
      this.note = this.getContent
    }
  },

  methods: {
    handleNoteUpdate: throttle(function() {
      this.$store.commit('setContent', this.note)
    }, 50)
  },
}
</script>

<style scoped>
.editor {
  flex: 1;
  position: relative;
  border-top: solid 1px var(--color-border);
}

.editor:focus-within .editor__empty {
  display: none;
}

.editor__textarea {
  outline: none;
  padding: var(--spacing-x-large);
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-text);
  resize: none;
  font-family: var(--font-family-mono);
  font-size: 1.6rem;
}

.editor__empty {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-text-placeholder);
}
</style>