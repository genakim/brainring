<template>
  <q-layout view="lHh Lpr lFf">
    <q-form class="q-pa-sm q-gutter-y-sm" ref="form">
      <p class="text-weigh-bold content-center">Игра</p>
      <div class="q-gutter-sm row">
        <q-input
                class="col"
                v-model="rounds"
                stack-label
                outlined
                label="Количество раундов"
                type="number"
                :rules="[ val => val >= 1 || 'Надо больше)']"
        />
        <q-input
                class="col"
                v-model="roundTime"
                stack-label
                outlined
                label="Время раунда, сек"
                type="number"
                :rules="[ val => val >= 20 || 'Вы серъезно?']"
        />
      </div>
      <p class="text-weigh-bold">Звуки</p>
      <SoundPicker @fileUploaded="fileUploaded" @play="play" label="Старт раунда" :fileName="roundStartSound" soundProperty="roundStartSound"/>
      <SoundPicker @fileUploaded="fileUploaded" @play="play" label="Конец раунда" :fileName="roundFinishedSound" soundProperty="roundFinishedSound"/>
      <SoundPicker @fileUploaded="fileUploaded" @play="play" label="Фальстарт" :fileName="falseStartSound" soundProperty="falseStartSound"/>
      <SoundPicker @fileUploaded="fileUploaded" @play="play" label="Нажата кнопка" :fileName="pushSound" soundProperty="pushSound"/>
      <SoundPicker @fileUploaded="fileUploaded" @play="play" label="Идет игра" :fileName="backgroundSound" soundProperty="backgroundSound"/>
      <SoundPicker @fileUploaded="fileUploaded" @play="play" label="Время кончается" :fileName="timerIsRunningOverSound" soundProperty="timerIsRunningOverSound"/>
      <q-footer class="flex justify-center q-pa-sm bg-transparent">
        <q-btn label="Сохранить" @click="save" color="primary" rounded/>
        <q-btn label="По-умолчанию" @click="reset" color="primary" class="q-ml-sm" flat rounded/>
      </q-footer>
    </q-form>
  </q-layout>
</template>

<script>
import { settings, defaultSettings, saveSettings } from 'src/modules/settings'
import SoundPicker from 'components/SoundPicker'
// const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'SettingsLayout',

  components: {
    SoundPicker
  },
  computed: {

  },
  watch: {
    roundStartSound () {
      console.log(this.roundStartSound)
    }
  },
  data () {
    return {
      rounds: 0,
      roundTime: 0, // in sec
      roundStartSound: '',
      roundFinishedSound: '',
      falseStartSound: '',
      pushSound: '',
      backgroundSound: '',
      timerIsRunningOverSound: '',
      gameOverSound: ''
    }
  },
  methods: {
    fileUploaded (property, file) {
      console.log('upload', file, property)
      this[property] = file.path
    },
    play (property) {
      // TODO: implement sound playing
      console.log('Playing ...' + property)
    },
    save () {
      this.$refs.form.validate().then(isValid => {
        if (!isValid) return
        const properties = Object.keys(defaultSettings), values = {}
        properties.forEach((property) => {
          values[property] = this[property]
        })
        saveSettings(values, function (err) {
          // TODO: notify
          console.log('save', err)
        })
      })
    },
    reset () {
      this.fillSettings(defaultSettings)
    },
    fillSettings (set) {
      for (const key in set) {
        this[key] = set[key]
      }
    }
  },
  created () {
    this.fillSettings(settings)
  }
}
</script>
