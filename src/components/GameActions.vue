<template>
  <div class="q-gutter-sm">
    <q-btn v-if="gameStarted" rounded :disable="loading" :loading="loading" push color="primary" size="lg" class="round-font" @click="startRound()">
      Начать раунд
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Идет игра
      </template>
    </q-btn>
    <q-btn v-else rounded push color="positive" size="lg" class="round-font" @click="startGame()">Начать Игру</q-btn>
    <q-btn v-if="gameStarted" rounded push color="red-8" size="lg" class="round-font" @click="resetGame()">Сбросить</q-btn>
    <q-btn v-if="!deviceOn" rounded push color="red-8" size="lg" class="round-font" @click="push('green')">1</q-btn>
    <q-btn v-if="!deviceOn" rounded push color="red-8" size="lg" class="round-font" @click="push('red')">2</q-btn>

    <q-dialog v-model="showResetWarning" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"><b>Внимание! Игра начата</b><br>Очки и раунды будут обнулены.<br>Вы действительно хотите сбросить?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Да" color="primary"  @click="resetGame(true)" v-close-popup/>
          <q-btn flat label="Нет" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'GameActions',
  props: ['loading', 'gameStarted', 'deviceOn'],
  data () {
    return {
      showResetWarning: false
    }
  },
  methods: {
    startRound: function () {
      this.$emit('startRound')
    },
    push: function (id) {
      this.$emit('push', id)
    },
    startGame: function () {
      this.$emit('startGame')
    },
    resetGame: function (reset = false) {
      if (reset) {
        this.$emit('resetGame')
      } else if (this.gameStarted) {
        this.showResetWarning = true
      }
    }
  }
}
</script>
