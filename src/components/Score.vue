<template>
  <li
    class="score-list-item round-font"
    :class="scoreClass"
  >{{score}}</li>
</template>

<script>
export default {
  name: 'Score',
  computed: {
    scoreClass: function () {
      return `bg-${this.id}`
    }
  },
  props: ['score', 'id']
}
</script>
