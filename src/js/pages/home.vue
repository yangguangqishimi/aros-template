<template>
  <waterfall class="box" :column-width="360" :column-count="2" :column-gap="15" 
  @loadmore="getProductList" loadmoreoffset="300"
  @scroll="recylerScroll">
    <header class="image-house">
      <images-slider height="375" width="750" :images="imageMap.swiper_index"></images-slider>
    </header>
    <header style="width:750px;">
      <div class="grid">
        <div v-for="(img,key) in imageMap.grid_index" :key="key" class="grid-item">
          <image :src="img.imageUrl" style="width:84px;height:84px"></image>
          <text class="fs24 fc-666 mt10">{{ img.name }}</text>
        </div>
      </div>
      <div class="fashion-title">
        <text class="fs28 fc-base">最新快报:</text>
        <swiper-item class="marquee" :step="marquee.height * 2" :count="marquee.list.length" :interval="marquee.interval" :duration="marquee.duration" :style="{
                            height: marquee.height * 2 + 'px',
                          }" @change="marqueeChange">
          <div v-for="(item,i) in marquee.list" :key="i" :style="{
                              height: marquee.height * marquee.length + 'px',
                              paddingTop: marquee.height * 0.5 + 'px',
                              paddingBottom: marquee.height * 0.5 + 'px',
                              overflow: 'hidden'
                            }">
            <text :style="{
                                height: marquee.height + 'px',
                                color: '#309bf8',
                                fontSize: 28 + 'px'
                              }">{{item.title}}</text>
          </div>
        </swiper-item>
        <image style="height:50px;width:50px" :src="imageUrlTransform('zk-trumpet.svg')" resize="cover" ></image>
      </div>
    </header>
    <cell v-for="(product, id) in products" :key="id" class="product-item" @click="jump('shop.product', { id: product.id })">
      <div class="product-item-text">
        <image :src="product.thumbnailUrl" resize="cover" style="height:360px;width:360px"></image>
        <text class="fc-555 fs28 mt10 ml20" style="text-overflow:ellipsis;width:330px">{{ product.name }}</text>
        <text class="fc-base fs24 mt10 ml20">{{ product.displayPrice }}</text>
        <text class="fc-666 fs24 mt5 ml20 line-through">{{ '￥' + product.marketPrice }}</text>
      </div>
    </cell>
  </waterfall>
</template>

<script>
import productApi from "Service/api/product.api";
import SwiperItem from "Components/swiper-item.vue";
import ImagesSlider from "Components/images-slider.vue";
export default {
  components: { SwiperItem, ImagesSlider },
  data() {
    return {
      imageMap: {
        swiper_index: [],
        grid_index: []
      },
      marquee: {
        height: 35,
        duration: 1500,
        interval: 2000,
        list: []
      },
      products: [],
      pageNum: 0
    };
  },
  created() {
    this.imageMap = this.$storage.getSync("imageMap") || {
      swiper_index: [],
      grid_index: []
    };
    const products = this.$storage.getSync("products") || {};
    this.pageNum = products.pageNum || 0;
    this.products = products.products || [];
    this.getData("swiper_index");
    this.getData("grid_index");
    this.getProductList();
    this.getTopline();
  },
  methods: {
    recylerScroll () {
      // console.log(123)
    },
    async getData(type) {
      let ret = await this.$diyApi.getLink(type);
      console.log(ret);
      if (ret.status === 1) {
        this.imageMap[type] = ret.result;
        this.$storage.setSync("imageMap", this.imageMap);
      } else {
        console.log(ret);
      }
    },
    async getProductList() {
      let ret = await this.$productApi.list({
        pageIndex: this.pageNum++, // 当前第页,下拉一次增加一次
        pageSize: 10
      });
      if (ret.status === 1) {
        this.products = this.products.concat(ret.result.productItems);
        this.$storage.setSync("products", {
          pageNum: this.pageNum,
          products: this.products
        });
      } else {
        console.log(ret);
      }
    },
    async getTopline() {
      let style = {
        DataType: "topline"
      };
      let ret = await this.$userApi.topline(style);
      if (ret.status === 1) {
        this.marquee.list = this.marquee.list.concat(ret.result.apiDataList);
      } else {
        console.log(ret);
      }
    },
    marqueeChange(e) {
      console.log(e);
    }
  }
};
</script>

<style src="Css/core/common.css" scoped></style>

<style scoped>
.image-house {
  width: 750px;
  height: 375px;
}

.grid {
  width: 750px;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
}

.grid-item {
  width: 187.5px;
  padding: 15px;
  align-items: center;
  border-right-color: #eeeeee;
  border-right-width: 1px;
  border-right-style: solid;
  border-bottom-color: #eeeeee;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.marquee {
  width: 520px;
  background-color: white;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
}

.fashion-title {
  flex-direction: row;
  border-top-color: #bebebe;
  border-top-style: solid;
  border-top-width: 2px;
  border-bottom-color: #bebebe;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  padding-left: 20px;
  align-items: center;
  background-color: white;
}

.box {
  /* width: 750px; */
}

.product-item {
  padding-top: 10px;
  padding-bottom: 10px;
}
.product-item-text {
  background-color: white;
  width: 362px;
  border-style: solid;
  border-color: #eeeeee;
  border-width: 1px;
}
</style>
