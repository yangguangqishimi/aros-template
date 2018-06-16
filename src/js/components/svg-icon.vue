<template>
  <svg version="1.1" :class="clazz" :width="fontSize" :height="fontSize" :viewBox="box" @click="onClick" v-if="name !== undefined">
    <path :d="path.d" :fill="path.fill || '#666666'" :stroke="path.stroke" v-for="path in icon.paths" :key="path.d" />
  </svg>
</template>
<script>
  import parse from './parse'
  export default {
    props: {
      name: {
        type: String
      },
      spin: Boolean,
      size: {
        type: String,
        default: '1.5rem'
      }
    },
    data () {
      return {
        fontSize: this.size
      }
    },
    methods: {
      onClick () {
        this.$emit('click');
      }
    },
    computed: {

      clazz () {
        return {
          'svg-icon': true,
          spin: this.spin
        }
      },
      icon () {
        if (this.name !== undefined) {
          let xml = require(`!xml-loader!./svg/${this.name}.svg`)
          const t = xml.svg.$.viewBox.split(' ')
          // console.info(`src/assets/svg/${this.name}.svg has been loaded`)
          return {
            width: t[2],
            height: t[3],
            paths: parse.SVGtoArray(xml.svg)
          }
        }

      },
      box () {
        if (this.name !== undefined) {
          return `0 0 ${this.icon.width} ${this.icon.height}`
        }
      }
    }
  }
</script>


<style>
  .svg-icon {
    display: inline-block;
    fill: currentColor;
  }

  .svg-icon.spin {
    animation: fa-spin 1s 0s infinite linear;
  }

  @keyframes fa-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
