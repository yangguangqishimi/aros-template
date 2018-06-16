<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A top navigation bar.-->

<template>
  <header class="wxc-minibar" :style="{ backgroundColor: backgroundColor, paddingTop: height, height: (90 + height) + 'px' }" v-if="show">
    <div class="left" @click="leftButtonClicked" aria-label="返回" :accessible="true">
      <slot name="left">
        <image :src="leftButton"
               v-if="leftButton && !leftText"
               class="left-button"></image>
        <text v-if="leftText"
              class="icon-text"
              :style="{ color: textColor }">{{leftText}}</text>
      </slot>
    </div>
    <slot name="middle">
      <text class="middle-title" :style="{ color: textColor }">{{title}}</text>
    </slot>
    <div class="right" @click="rightButtonClicked">
      <slot name="right">
        <image v-if="rightButton && !rightText"
               class="right-button"
               :src="rightButton"
               :aria-hidden="true"></image>
        <text v-if="rightText"
              class="icon-text"
              :style="{ color: textColor }">{{rightText}}</text>
      </slot>
    </div>
  </header>
</template>

<style scoped>
  .wxc-minibar {
    width: 750px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
  }

  .left {
    width: 180px;
    padding-left: 32px;
  }

  .middle-title {
    font-size: 30px;
    color: #ffffff;
    height: 36px;
    line-height: 34px;
  }

  .right {
    width: 180px;
    padding-right: 32px;
    align-items: flex-end;
  }

  .left-button {
    width: 21px;
    height: 36px;
  }

  .right-button {
    width: 32px;
    height: 32px;
  }

  .icon-text {
    font-size: 28px;
    color: #ffffff;
  }
</style>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: '#FFC900'
      },
      leftButton: {
        type: String,
        default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
      },
      textColor: {
        type: String,
        default: '#3D3D3D'
      },
      rightButton: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      leftText: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      },
      useDefaultReturn: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        height: 0
      }
    },
    created () {
      this.height = parseFloat(this.$tools.getStatusBarHeight());
    },
    methods: {
      leftButtonClicked () {
        const self = this;
        if (self.useDefaultReturn) {
          this.back();
        }
        self.$emit('wxcMinibarLeftButtonClicked', {});
      },
      rightButtonClicked () {
        const self = this;
        if (self.rightText || self.rightButton) {
          self.$emit('wxcMinibarRightButtonClicked', {});
        }
      }
    }
  };
</script>
