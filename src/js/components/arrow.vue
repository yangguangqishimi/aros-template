<template>
  <div class="arrow" :style="{
            'border-left-color': color,
            'border-top-color':  color,
            width: size + 'px',
            height: size + 'px',
            'border-top-width': width + 'px',
            'border-left-width': width + 'px',
            transform: `rotate(${deg}deg)`
          }"></div>
</template>

<script>
export default {
  props: {
    color: {
      default: '#bebebe'
    },
    size: {
      default: 30,
    },
    width: {
      default: 2
    },
    deg: {
      default: 135
    }
  }
}
</script>

<style scoped>
.arrow {
  border-top-style: solid;
  border-left-style: solid;
}
</style>
