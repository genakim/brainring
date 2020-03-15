<template>
  <div>
    <h4 class="text-dark round-font">Ответ верный?</h4>
    <div class="flex justify-center q-gutter-sm">
      <q-btn rounded push color="positive" size="lg" class="round-font" @click="answer(playerId, true)">Да</q-btn>
      <q-btn rounded push color="negative" size="lg" class="round-font" @click="answer(playerId, false)">Нет</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerActions',
  props: ['playerId'],
  methods: {
    answer: function (playerId, isCorrectAnswer) {
      console.log('pas', playerId, isCorrectAnswer)
      this.$emit('answer', {
        playerId,
        isCorrectAnswer
      })
    }
  }
}
</script>
