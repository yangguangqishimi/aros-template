<template>
<div class="container-gray">
  <title-bar :backgroundColor="showTitle ? 'white' : 'transparent'"
    title="" @appear="headerAppear(0)" >
    <div slot="left" @click="back()" class="arrow-button" :style="{
      backgroundColor: showTitle ? 'white': 'rgba(0, 0, 0, 0.5)' 
    }">
      <div class="arrow" :style="{
        'border-left-color': showTitle ?  '#666666': 'white',
        'border-top-color':  showTitle ?  '#666666': 'white',
      }"></div>
    </div>
    <div slot="middle" class="title" v-if="showTitle">
      <text @click="gotoHeader(0)" :class="['fs36', titleBarNum === 0 ? 'title-item': 'title-item-selected']">商品</text>
      <text @click="gotoHeader(1)" :class="['fs36', titleBarNum === 1 ? 'title-item': 'title-item-selected']">详情</text>
      <text @click="gotoHeader(2)" :class="['fs36', titleBarNum === 2 ? 'title-item': 'title-item-selected']">推荐</text>
    </div>
    <div slot="right"></div>
  </title-bar>
  <waterfall class="box" :column-width="300" :column-count="2" :column-gap="15"
    @loadmore="getProductList" scrollable="true"
    @scroll="recylerScroll" loadmoreoffset="300">
    
    <header style="height:750px;width:750px">
      <images-slider height="750" width="750" :images="productThums"></images-slider>
    </header>
    <header class="product-title solid-border-bottom">
      <text class="fs36 fc-base">{{ product.displayPrice }}</text>
      <div class="flex-row-center space-between">
        <text class="fs30 fc-666 line-through" style="padding: ">￥{{ product.marketPrice }}</text>
        <text class="fs30 fc-666">{{ product.soldCount }}人已购</text>
      </div>
      <text class="fs32 fc-333">{{ product.name }}</text>
    </header>
    <header class="width:750px;">
      <div class="mini-cell cellActive" @click="selectBoxShow = true">
        <text class="fs30 fc-333" style="flex:1">请选择：{{selectProps.name}}</text>
        <text class="fs30 fc-999" style="justify-self: flex-end" >{{selectProps.value}}</text>
        <arrow size="20"></arrow>
      </div>
      <div class="mini-cell cellActive" @click="paramBoxShow = true">
        <text class="fs30 fc-333">商品参数</text>
        <!-- <text class="fs30 fc-999">sfgsdfgs</text> -->
        <arrow size="20"></arrow>
      </div>
    </header>
    <header style="height:20px;"></header>
    <header ref="header1" style="background-color: white;" @appear="headerAppear(1)" >
      <text class="fs30 bold mt20 mb20" style="width:750px;text-align: center;">商品详情</text>
    </header>
    <header v-for="(img, key) in introImages" :key="key" @appear="headerAppear(1)">
      <image style="height:700px;width:750px" :src="img.url"></image>
    </header>
    <header style="height:20px;"></header>
    <header ref="header2" style="background-color: white;" @appear="headerAppear(2)">
      <text class="fs30 bold mt20 mb20" style="width:750px;text-align: center;">推荐商品</text>
    </header>
    <cell v-for="(product, id) in productRecommend" :key="id" class="product-item" @click="jump('shop.product', {id: product.id})" @appear="headerAppear(2)">
      <div class="product-item-text">
        <image :src="product.thumbnailUrl" resize="cover" style="height:360px;width:360px"></image>
        <text class="fc-555 fs28 mt10 ml20" style="text-overflow:ellipsis;width:330px">{{ product.name }}</text>
        <text class="fc-base fs24 mt10 ml20">{{ product.displayPrice }}</text>
        <text class="fc-666 fs24 mt5 ml20" style="text-decoration:line-through">{{ '￥' + product.marketPrice }}</text>
      </div>
    </cell>
    <header style="width:750px;height:100px;"></header>
    <header class="footbar">
      <div class="footbar-item-1" @click="jump('main', {})">
        <image class="icon" :src="imageUrlTransform('zk-home.svg')" resize="cover" @click="jump('main', {})"></image>
        <text class="fs24 fc-666">首页</text>
      </div>
      <div class="footbar-item-1">
        <image class="icon" :src="imageUrlTransform('zk-favorites.svg')" resize="cover"></image>
        <text class="fs24 fc-666">收藏</text>
      </div>
      <div class="footbar-item-1"  @click="jump('shop.cart', {})">
        <image class="icon" :src="imageUrlTransform('zk-cart.svg')" resize="cover" @click="jump('shop.cart', {})"></image>
        <text class="fs24 fc-666">购物车</text>
      </div>
      <div class="footbar-item-2" style="background-color: #e64340" @click="selectBoxShow = true">
        <text class="fs32 fc-white">加入购物车</text>
      </div>
      <div class="footbar-item-2" style="background-color: #0090ff" @click="selectBoxShow = true">
        <text class="fs32 fc-white">立即购买</text>
      </div>
    </header>
  </waterfall>
  <wxc-popup :height="selectBoxHeight"
              :show="selectBoxShow"
              pos="bottom"
              style="z-index:999"
              @wxcPopupOverlayClicked="popupOverlayAutoClick">
    <div class="class-title-box solid-border-bottom">
      <image style="height:165px;width:165px;margin-top:10px;margin-left:20px;" :src="product.thumbnailUrl"></image>
      <div style="width:490px;">
        <text class="fs30 fc-333 mt20">{{ product.name }}</text>
        <text class="fs36 fc-red mt10">{{ selectSku.displayPrice }}</text>
        <text class="fs30 fc-999 line-through mt10">￥{{ selectSku.marketPrice }}</text>
        <text class="fs30 fc-999 mt10" >{{`库存：${selectSku.stock} 货号：${selectSku.bn}`}}</text>
      </div>
      <div style="width:30px;height:30px;backgroud-color:blue">
      </div>
    </div>
    <div class="solid-border-bottom" style="height:250px; padding:20px;">
      <div v-for="(prop,index) in salePropertys" :key="index+'123'">
        <text class="fs30 bold fc-333 mb10">{{ prop.name }}</text>
        <wxc-grid-select
          :list="prop.list"
          :single="true"
          @select="params => onSelect(index,params)">
        </wxc-grid-select>
      </div>
    </div>
    <div class="flex-row-center space-between mt20 mb10" style="padding-left:30px;padding-right:30px">
      <text class="fs30 fc-333 bold">购买数量</text>
      <wxc-stepper @wxcStepperValueChanged="wxcStepperValueChanged"></wxc-stepper>
    </div>
    <div class="flex-row-center mt10">
      <text class="fs30 fc-white left-button" @click="addToCart">加入购物车</text>
      <text class="fs30 fc-white right-button" @click="buyProduct">立即购买</text>
    </div>
  </wxc-popup>
  <wxc-popup :height="paramBoxHeight"
              :show="paramBoxShow"
              pos="bottom"
              style="z-index:999"
              @wxcPopupOverlayClicked="popupOverlayAutoClick">
    <div class="solid-border-bottom center-center" style="width:750px;height:100px;">
      <text class="fs36 fc-333 bold">商品详情</text>
    </div>
    <scroller style="height:400px;width:750px;padding-left:20px;">
      <div class="flex-row-center space-between solid-border-bottom" style="padding-top:20px;padding-bottom:20px; padding-right:20px;" v-for="(item, key) in displayPropertys" :key="key" >
        <text class="fs30 fc-666">{{item.name}}</text>
        <text class="fs30 fc-999">{{item.displayValue}}</text>
      </div>
    </scroller>
    <div class="solid-border-bottom center-center cellActive" style="width:750px;height:100px;" @click="paramBoxShow = false">
      <text class="fs36 fc-333 bold">确定</text>
    </div>
  </wxc-popup>
</div>
</template>

<script>
import ImagesSlider from "Components/images-slider.vue";
import Arrow from "Components/arrow.vue";
import WxcPopup from "weex-ui/packages/wxc-popup";
import WxcGridSelect from "weex-ui/packages/wxc-grid-select";
import WxcStepper from "weex-ui/packages/wxc-stepper";
const modal = weex.requireModule("modal");
export default {
  components: {
    ImagesSlider,
    Arrow,
    WxcPopup,
    WxcGridSelect,
    WxcStepper
  },
  data() {
    return {
      titleBarNum: 0,
      showTitle: false,
      product: {},
      productThums: [],
      introImages: [],
      pageNum: 0,
      productRecommend: [],
      contentOffset: 0,
      lastItem: 0,
      selectBoxShow: false,
      selectBoxHeight: 700,
      paramBoxShow: false,
      paramBoxHeight: 600,
      selectSku: {},
      salePropertys: [],
      displayPropertys: [],
      selectProps: {},
      buyCount: 1
    };
  },
  methods: {
    async getProduct(id) {
      var ret = await this.$productApi.show({ id });
      if (ret.status !== 1) {
        console.log(ret.data.message);
        return;
      }
      this.product = ret.result;
      this.productThums = ret.result.productExtensions.productThums.map(
        thum => {
          return { url: thum.originalUrl };
        }
      );
      let reg = /<img src=\"([^\"]*)\" class/g;
      let arr_intro = this.product.detail && this.product.detail.intro.match(reg);
      this.introImages = arr_intro && arr_intro.map(item => {
        return { url: item.replace(/<img src=\"([^\"]*)\" class/g, "$1") };
      });
      this.selectSku = this.product.productExtensions.productSkus[0];
      this.salePropertys = this.product.productExtensions.productCategory.salePropertys.map(
        item => {
          return {
            name: item.name,
            list: item.propertyValues.map(it => {
              return { title: it.valueName };
            })
          };
        }
      );
      this.selectProps = {
        name: this.salePropertys[0].name,
        value: this.salePropertys[0].list[0].title
      };
      this.displayPropertys = this.product.productExtensions.productCategory.displayPropertys;
      this.$storage.setSync("product_" + this.product.id, {
        product: this.product,
        productThums: this.productThums,
        introImages: this.introImages,
        salePropertys: this.salePropertys
      });
      console.log(this.displayPropertys);
      console.log(this.selectSku);
    },
    getProductList() {
      console.log("123321");
      this.$productApi
        .list({
          pageIndex: this.pageNum++, // 当前第页,下拉一次增加一次
          pageSize: 10
        })
        .then(res => {
          this.productRecommend = this.productRecommend.concat(
            res.result.productItems
          );
          console.log("123321");
        });
    },
    recylerScroll(e) {
      this.contentOffset = e.contentOffset.y;
      if (this.contentOffset < -50) {
        this.showTitle = true;
      } else {
        this.showTitle = false;
      }
    },
    headerAppear(item) {
      this.titleBarNum = item;
    },
    gotoHeader(item) {
      weex.requireModule("dom").scrollToElement(this.$refs["header" + item], {
        offset: 0,
        animated: false
      });
      if (item === 0) {
        this.showTitle = false;
      }
    },
    popupOverlayAutoClick() {
      this.selectBoxShow = false;
      this.paramBoxShow = false;
    },
    onSelect(index, e) {
      this.selectSku = this.product.productExtensions.productSkus[
        e.selectIndex
      ];
      this.selectProps = {
        name: this.salePropertys[index].name,
        value: this.salePropertys[index].list[e.selectIndex].title
      };
    },
    wxcStepperValueChanged(e) {
      this.buyCount = e.value;
    },
    buyProduct() {
      this.selectBoxShow = true;
    },
    async addToCart() {
      if (this.selectSku.id === undefined) {
        modal.toast({
          message: "请选择商品规格",
          duration: 0.3
        });
      } else {
        let params = {
          ProductSkuId: this.selectSku.id,
          productId: this.product.id,
          storeId: this.product.storeId,
          count: this.buyCount
        };
        const res = await userApi.AddCart(params);
        if (res.status === 1) {
          modal.toast({ message: "加入购物车成功" });
        }
      }
    }
  },
  created() {
    this.$router.getParams(params => {
      this.getProduct(params.id);
      this.getProductList();
      const data = this.$storage.getSync("product_" + params.id);
      if (!data) return;
      this.product = data.product || {};
      this.productThums = data.productThums || {};
      this.introImages = data.introImages || [];
      this.selectSku = this.product.productExtensions && this.product.productExtensions.productSkus[0] || {};
      this.salePropertys = data.salePropertys || [];
      this.selectProps = {
        name: this.salePropertys[0].name,
        value: this.salePropertys[0].list[0].title
      };
      this.displayPropertys = this.product.productExtensions.productCategory.displayPropertys;
    });
    this.contentOffset = 0;
  }
};
</script>

<style src="Css/core/common.css" scoped></style>
<style scoped>
.box {
  background-color: #f2f2f2;
  z-index: 10;
  width: 750px;
  flex: 1;
}
.arrow-button {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
}
.arrow {
  width: 30px;
  height: 30px;
  border-top-width: 4px;
  border-top-style: solid;
  border-left-width: 4px;
  border-left-style: solid;
  transform: rotate(-45deg);
}
.title {
  flex-direction: row;
}
.title-item {
  padding-bottom: 10px;
  border-bottom-color: #309bf8;
  border-bottom-width: 5px;
  border-bottom-style: solid;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
  margin-right: 20px;
  color: #309bf8;
}
.title-item-selected {
  padding-bottom: 10px;
  border-bottom-color: transparent;
  border-bottom-width: 5px;
  border-bottom-style: solid;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
  margin-right: 20px;
  color: #666666;
}
.product-title {
  padding-top: 30px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 10px;
  background-color: white;
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
.footbar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  height: 100px;
  left: 0px;
  background-color: white;
  flex-direction: row;
}
.footbar-item-1 {
  width: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-right-color: #bebebe;
  border-right-style: solid;
  border-right-width: 1px;
}
.footbar-item-2 {
  flex: 1;
  align-items: center;
  justify-content: center;
}
.class-title-box {
  padding-top: 10px;
  flex-direction: row;
  width: 750px;
  justify-content: space-between;
  padding-bottom: 10px;
}
.left-button {
  background-color: #e64340;
  width: 375px;
  text-align: center;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.right-button {
  background-color: #0090ff;
  width: 375px;
  text-align: center;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.icon {
  height: 40px;
  width: 40px;
}
</style>
