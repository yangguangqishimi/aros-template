<template>
  <div class="box" :style="boxStyle" @click="onClick">
    <div class="gou" :style="gouStyle" ></div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      default: 'blue'
    },
    color: {
      default: 'white'
    },
    size: {
      default: 50
    },
    checked: {
      default: true
    }
  },
  watch: {
    checked () {
      this.mchecked = this.checked;
    }
  },
  data () {
    return {
      mchecked: true
    }
  },
  created () {
    this.mchecked = this.checked;
  },
  methods: {
    onClick () {
      this.mchecked = !this.mchecked;
      this.$emit('check',this.mchecked);
    }
  },
  computed: {
    boxStyle () {
      return {
        'background-color': this.mchecked ? this.bgColor: 'transparent',
        'border-radius': this.size + 'px',
        'border-color': this.mchecked ? this.bgColor: '#bebebe',
        width: this.size+'px',
        height: this.size+'px'
      }
    },
    gouStyle () {
      return {
        'border-left-color': this.mchecked ? this.color : 'transparent',
        'border-bottom-color': this.mchecked ? this.color : 'transparent',
        width: this.size/2 + 'px',
        height: this.size/4 + 'px',
        'margin-bottom': this.size/6 + 'px',
      }
    }
  }
}
</script>

<style scoped>
.gou {
  border-left-width: 2px;
  border-left-style: solid;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  transform: rotate(-35deg);
}
.box {
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 2px;
}

</style>
