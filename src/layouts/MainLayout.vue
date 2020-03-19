<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
        <Round class="text-h3 text-dark justify-center flex" v-if="gameStarted">Раунд {{round}}</Round>
    </q-header>
    <q-page-container>

      <Scores :scores="scores" class="justify-center flex"></Scores>
      <div class="flex justify-center">
        <FalseStart v-if="falseStartPlayerId" :playerId="falseStartPlayerId"></FalseStart>
        <GameOver v-else-if="!gameStarted" :round="round"></GameOver>
        <q-circular-progress
          v-else
          v-model="value"
          show-value
          :min="0"
          :max="valueStart"
          :thickness="0.3"
          size="300px"
          :color="progressColor"
          track-color="grey-3"
        >
          <span class="round-font">{{timer}}</span>
        </q-circular-progress>
      </div>
    </q-page-container>
    <q-footer class="bg-transparent">
      <q-toolbar class="justify-center q-mb-sm">
        <GameActions v-if="!playerId"
                     :loading="loading"
                     :deviceOn="deviceOn"
                     :gameStarted="gameStarted"
                     @startRound="startRound"
                     @stopRound="stopRound"
                     @push="push($event)"
                     @startGame="startGame"
                     @resetGame="resetGame"
        />
        <PlayerActions v-if="playerId" :playerId="playerId" @answer="answer($event)"/>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import Round from 'components/Round'
import Scores from 'components/Scores'
import PlayerActions from 'components/PlayerActions'
import GameActions from 'components/GameActions'
import FalseStart from 'components/FalseStart'
import GameOver from 'components/GameOver'
const ipcRenderer = require('electron').ipcRenderer

export default {
  name: 'MainLayout',

  components: {
    Round,
    Scores,
    PlayerActions,
    GameActions,
    FalseStart,
    GameOver
  },
  computed: {
    timer: function () {
      return Math.ceil(this.value / 100).toString().padStart(2, 0)
    },
    progressColor: function () {
      if (this.playerId) {
        return this.playerId
      }

      if (this.falseStartPlayerId) {
        return this.falseStartPlayerId
      }

      if (this.value <= 500) {
        return 'negative'
      }

      return 'orange'
    }
  },
  watch: {
    round: function () {
      if (this.round > 5) {
        this.gameStarted = false
      }
    },
    roundStarted: function () { // round count
      if (this.gameStarted && this.roundStarted === false) {
        this.round++
      }
    }
  },
  methods: {
    answer: function (answer) {
      if (answer.isCorrectAnswer) { // answer is correct, we finish round
        this.scores[answer.playerId]++
        this.stopRound()
      } else {
        this.wrongList[answer.playerId] = true // add player to wrong list

        if (Object.keys(this.wrongList).length === Object.keys(this.scores).length) { // all players answered wrong, the round ends
          this.stopRound()
        } else {
          this.startRound(true) // next players continue round
        }
      }
    },
    push: function (playerId) {
      if (!this.gameStarted || this.wrongList[playerId]) {
        return
      }
      if (this.loading) { // player pushed the button
        this.stopTimer()
        this.playerId = playerId
      } else if (!this.roundStarted && !this.falseStartPlayerId) { // falseStart only for first
        this.falseStartPlayerId = playerId
        this.wrongList[playerId] = true
      }
    },
    stopTimer: function () {
      clearInterval(this.timerId)
      this.timerId = null
      this.loading = false
    },
    stopRound: function () {
      this.stopTimer()
      this.value = this.valueStart
      this.roundStarted = false
      this.playerId = null
      this.falseStartPlayerId = null
      this.loading = false
      this.wrongList = {}
    },
    startRound: function (continueRound = false) {
      const vm = this

      if (vm.timerId) {
        return this.stopTimer()
      }

      if (continueRound) {
        vm.value = 2000
      }

      vm.roundStarted = true
      vm.loading = true
      vm.playerId = null
      vm.falseStartPlayerId = null

      vm.timerId = setInterval(function () {
        vm.value = vm.value - 10
        if (vm.value === 0) {
          vm.stopRound()
        }
      }, 100)
    },
    startGame: function () {
      this.resetGame()
      this.gameStarted = true
    },
    resetGame: function () {
      this.stopRound()
      this.gameStarted = false
      this.round = 1
      this.scores = {
        green: 0,
        red: 0
      }
    }
  },
  data () {
    return {
      loading: false,
      value: 3000,
      valueStart: 3000,
      timerId: null,
      roundStarted: false,
      gameStarted: false,
      falseStartPlayerId: null,
      playerId: null,
      wrongList: {},
      deviceOn: false,
      round: 1,
      scores: {
        green: 0,
        red: 0
      }
    }
  },
  created: function () {
    const vm = this
    ipcRenderer.on('push', (event, playerId) => {
      vm.push(playerId)
    })
    ipcRenderer.on('deviceInfo', (event, code) => {
      console.log('deviceInfo', code)
      if (code === 200) {
        vm.deviceOn = true
      }
    })
    ipcRenderer.send('uiCreated', true)
    // ipcRenderer.sendTo(webContentsId, channel, ...args) Sends a message to a window with webContentsId via channel.
  }
}
</script>
