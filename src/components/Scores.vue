<template>
    <ul class="score-list">
        <Score v-for="(score, key) in scores" :score="score" :id="key" :key="key"/>
    </ul>
</template>

<script>
import Score from 'components/Score'

export default {
  name: 'Scores',
  components: {
    Score
  },
  props: {
    scores: {
      type: Object,
      required: true
    }
  }
}
</script>
