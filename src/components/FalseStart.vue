<template>
  <div>
    <h1 class="round-font" :class="falseStartClass">Фальстарт</h1>
  </div>
</template>

<script>
export default {
  name: 'FalseStart',
  props: ['playerId'],
  computed: {
    falseStartClass: function () {
      return `text-${this.playerId}`
    }
  }
}
</script>
