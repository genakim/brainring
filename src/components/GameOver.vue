<template>
  <div>
    <h2 class="round-font">{{round > 1 ? 'Игра окончена' : 'Ждем'}}</h2>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  props: ['round']
}
</script>
