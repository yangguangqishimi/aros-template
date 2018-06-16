<template>
  <slider :style="{height: height + 'px', width: width + 'px'}" :interval="interval" :auto-play="autoPlay">
    <image v-for="(img, key) in images" :key="key" :style="{height: height + 'px', width: width + 'px'}" resize="cover" :src="img.url || img.imageUrl"></image>
    <indicator class="indicator"></indicator>
  </slider>
</template>

<script>
export default {
  props: {
    height: {
      default: 750
    },
    width: {
      default: 750
    },
    interval: {
      default: 2000
    },
    autoPlay: {
      default: true
    },
    images: {
      default: []
    }
  }
};
</script>

<style scoped>
.indicator {
  width: 750px;
  height: 18px;
  item-color: rgb(255, 255, 255, 0.6);
  item-selected-color: rgba(48, 155, 248, 0.6);
  item-size: 18px;
  /* margin-top: 220px; */
  position: absolute;
  bottom: 20px;
  left: 0;
}
</style>
