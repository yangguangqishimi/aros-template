<template>
  <div class="wrap" @appear="appeared" @disappear="disappeared">
    <div ref="anim" class="anim">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  overflow: hidden;
  position: relative;
}

.anim {
  flex-direction: column;
  position: absolute;
  transform: translateY(0) translateZ(0);
}
</style>

<script>
var animation = weex.requireModule('animation')

module.exports = {
  props: {
    step: { default: 0 },
    count: { default: 0 },
    index: { default: 1 },
    duration: { default: 0 },
    interval: { default: 0 },
    outofview: { default: false }
  },
  data () {
    return {
      _index: 1
    }
  },
  created () {
    this._index = this.index
    if (this.interval > 0 && this.step > 0 && this.duration > 0) {
      this.run()
    }
  },
  methods: {
    run () {
      if (this.outofview) {
        setTimeout(this.run, this.interval)
      } else {
        setTimeout(() => {
          this.animation(this.run)
        }, this.interval)
      }
    },
    animation: function (cb) {
      var offset = -this.step * this._index;
      animation.transition(this.$refs.anim, {
        styles: {
          transform: 'translateY(' + offset + 'px) translateZ(0)'
        },
        timingFunction: 'ease',
        duration: this.duration
      }, function () {
        this._index = (this._index + 1) % (this.count);
        this.$emit('change', {
          index: this._index,
          count: this.count
        });
        cb && cb();
      }.bind(this));
    },
    appeared: function () {
      this.outofview = false
    },
    disappeared: function () {
      this.outofview = true
    }
  }
}
</script>
