<template>
  <div>
    <q-file :ref="soundProperty" @input="fileUploaded($event)" class="hidden"></q-file>
    <div class="q-gutter-sm row">
      <q-btn class="col-auto" color="primary" icon="folder_open" @click="openFile(soundProperty)" outline></q-btn>
      <q-input class="col-grow" v-model="fileName" :label="label" outlined stack-label disabled/>
      <q-btn class="col-auto" outline color="primary" icon="play_arrow" @click="play(soundProperty)">
        <template v-slot:loading>
          <q-spinner-bars color="primary" />
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FalseStart',
  props: ['soundProperty', 'label', 'fileName'],
  computed: {
    falseStartClass: function () {
      return `text-${this.playerId}`
    }
  },
  data () {
    return {
      soundValue: ''
    }
  },
  methods: {
    openFile (soundProperty) {
      this.$refs[soundProperty].pickFiles()
    },
    fileUploaded (file) {
      this[this.soundProperty] = file.name
      this.$emit('fileUploaded', this.soundProperty, file)
    },
    play (soundProperty) {
      this.$emit('play', soundProperty)
    }
  }
}
</script>
