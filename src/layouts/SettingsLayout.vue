<template>
  <q-layout view="lHh Lpr lFf">
    <q-form class="q-pa-sm q-gutter-y-sm">
      <p class="text-weigh-bold content-center">Игра</p>
      <template>
        <q-input
                v-model="rounds"
                stack-label
                outlined
                label="Количество раундов"
                type="number"
        />
        <q-input
                v-model="time"
                stack-label
                outlined
                label="Время раунда, сек"
                type="number"
        />
      </template>
      <p class="text-weigh-bold">Звуки</p>

      <q-file outlined v-model="file" label="Старт раунда" stack-label>
        <template v-slot:after>
          <q-icon name="play_circle_outline" />
        </template>
        <template v-slot:append>
          <q-icon name="folder" />
        </template>
      </q-file>

      <q-file outlined v-model="file" label="Конец раунда" stack-label>
        <template v-slot:after>
          <q-icon name="play_circle_outline" />
        </template>
        <template v-slot:append>
          <q-icon name="folder" />
        </template>
      </q-file>

      <q-file outlined v-model="file" label="Фальстарт" stack-label>
        <template v-slot:after>
          <q-icon name="play_circle_outline" />
        </template>
        <template v-slot:append>
          <q-icon name="folder" />
        </template>
      </q-file>

      <q-file outlined v-model="file" label="Нажата кнопка" stack-label>
        <template v-slot:after>
          <q-icon name="play_circle_outline" />
        </template>
        <template v-slot:append>
          <q-icon name="folder" />
        </template>
      </q-file>

      <q-file outlined v-model="file" label="Идет игра" stack-label>
        <template v-slot:after>
          <q-icon name="play_circle_outline" />
        </template>
        <template v-slot:append>
          <q-icon name="folder" />
        </template>
      </q-file>

      <q-file outlined v-model="file" label="Время кончается" stack-label>
        <template v-slot:after>
          <q-icon name="play_circle_outline" />
        </template>
        <template v-slot:append>
          <q-icon name="folder" />
        </template>
      </q-file>

      <q-footer class="flex justify-center q-pa-sm bg-transparent">
        <q-btn label="Сохранить" type="submit" color="primary"/>
        <q-btn label="По-умолчанию" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="Отмена" type="reset" color="primary" flat class="q-ml-sm" />
      </q-footer>
    </q-form>
  </q-layout>
</template>

<script>
// const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'SettingsLayout',

  components: {

  },
  computed: {

  },
  data () {
    return {
      rounds: 5,
      time: 30,
      file: ''
    }
  },
  created: function () {

  }
}
</script>
