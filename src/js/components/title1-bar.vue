<template>
  <header :style="{
    width: '750px',
    backgroundColor: bgColar,
    paddingTop: height
  }">
    <slot></slot>
  </header>
</template>

<script>
export default {
  props: {
    bgColar: {
      default: 'black'
    }
  },
  data () {
    return {
      height: 0
    }
  },
  created () {
    this.height = this.$tools.getStatusBarHeight();
  }
}
</script>

<style scoped>

</style>
