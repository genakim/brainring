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
    <q-btn rounded push color="red-8" size="lg" class="round-font" @click="stopRound()">Стоп</q-btn>
    <q-btn rounded push color="red-8" size="lg" class="round-font" @click="resetGame()">Сбросить</q-btn>
    <q-btn v-if="!deviceOn" rounded push color="red-8" size="lg" class="round-font" @click="push('green')">1</q-btn>
    <q-btn v-if="!deviceOn" rounded push color="red-8" size="lg" class="round-font" @click="push('red')">2</q-btn>
  </div>
</template>

<script>
export default {
  name: 'GameActions',
  props: ['loading', 'gameStarted', 'deviceOn'],
  methods: {
    startRound: function () {
      this.$emit('startRound')
    },
    stopRound: function () {
      this.$emit('stopRound')
    },
    push: function (id) {
      this.$emit('push', id)
    },
    startGame: function (id) {
      this.$emit('startGame')
    },
    resetGame: function (id) {
      this.$emit('resetGame')
    }
  }
}
</script>
