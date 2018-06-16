<template>
<div>
  <wxc-minibar title="购物车" background-color="#0090ff" text-color="#FFFFFF">
     <arrow @click="back()" slot="left" size="30" deg="-45" color="white"></arrow>
  </wxc-minibar>
  <list>
    <cell v-for="(store, storekey) in storeItems" :key="storekey">
      <div class="store solid-border-bottom">
        <checkbox :checked="store.selectProduct !== 0" bgColor="#0090ff" size="40" @check="onCheck($event,storekey,'store')"></checkbox>
        <text class="fs30 fc-666 ml10">{{ store.storeName }}</text>
      </div>
      <div v-for="(product, key) in store.productSkuItems" :key="key" class="flex-row-center space-between" style="padding-top:20px;padding-left:20px;padding-right:20px;">
        <checkbox :checked="product.checked" bgColor="#e64340" size="35" @check="onCheck($event,storekey, key)"></checkbox>
        <image :src="product.thumbnailUrl" resize="cover" style="height:180px;width:180px"></image>
        <div style="width:460px;padding-bottom:10px" class="solid-border-bottom">
          <text class="fs28 fc-666 mt10">{{product.name}}</text>
          <text class="fs28 fc-999 mt10">{{ product.propertyValueDesc}}</text>
          <text class="fs36 fc-red mt10">￥{{ product.price}}</text>
          <div class="flex-row-center space-between mt10">
            <text class="fs28 fc-999 line-through">￥{{ product.marketPrice }}</text>
            <wxc-stepper :defaultValue="product.buyCount" @wxcStepperValueChanged="wxcStepperValueChanged($event, storekey, key)"></wxc-stepper>
          </div>
        </div>
      </div>
      <div style="background-color:#f2f2f2; height:20px; width:750px"></div>
    </cell>
    <header style="height:100px;width:750px"></header>
    <header class="flex-row-center solid-border footbar" >
      <checkbox bgColor="#0090ff" size="40" class="ml20" @check="onCheck($event,'','all')"></checkbox>
      <text class="fs30 fc-999 ml10" style="flex:1">全选({{this.storeItems.length}})</text>
      <text class="fs30 fc-base">￥{{totalPay}}</text>
      <div class="center-center ml10" @click="buy" style="height:100px;width:220px;background-color:#0090ff">
        <text class="fs30 fc-white">结算</text>
      </div>
    </header>
  </list>
</div>
 
</template>

<script>
import WxcMinibar from "weex-ui/packages/wxc-minibar";
import Checkbox from "Components/checkbox.vue";
import Arrow from "Components/arrow.vue";
import WxcStepper from "weex-ui/packages/wxc-stepper";
const modal = weex.requireModule("modal");
export default {
  components: { WxcMinibar, Arrow, Checkbox, WxcStepper },
  data() {
    return {
      storeItems: [],
      totalPay: 0,
      loginUser: {}
    };
  },
  methods: {
    async getCartData() {
      let ret = await this.$userApi.GetCart();
      if (ret.status === 1) {
        this.storeItems = ret.result.storeItems.map(store => {
          store.selectProduct = store.productSkuItems.length;
          store.productSkuItems = store.productSkuItems.map(product => {
            this.totalPay += product.price * product.buyCount;
            product.checked = true;
            return product;
          });
          return store;
        });
      }
    },
    wxcStepperValueChanged(item, storekey, key) {
      let product = this.storeItems[storekey].productSkuItems[key];
      this.totalPay += product.fenRunPrice * (item.value - product.buyCount);
      product.buyCount = item.value;
    },
    onCheck(checked, storekey, key) {
      if (key === "store") {
        this.storeItems[storekey].productSkuItems = this.storeItems[
          storekey
        ].productSkuItems.map(product => {
          if (checked && !product.checked) {
            this.totalPay += product.buyCount * product.price;
          } else if (!checked && product.checked) {
            this.totalPay -= product.buyCount * product.price;
          }
          product.checked = checked;
          return product;
        });
      } else if (key === "all") {
        this.storeItems = this.storeItems.map(store => {
          store.selectProduct = checked ? store.productSkuItems.length : 0;
          store.productSkuItems = store.productSkuItems.map(product => {
            if (checked && !product.checked) {
              this.totalPay += product.buyCount * product.price;
            } else if (!checked && product.checked) {
              this.totalPay -= product.buyCount * product.price;
            }
            product.checked = checked;
            return product;
          });
          return store;
        });
      } else {
        let product = this.storeItems[storekey].productSkuItems[key];
        product.checked = checked;
        this.totalPay += checked
          ? product.buyCount * product.price
          : -product.buyCount * product.price;
        this.storeItems[storekey].selectProduct += checked ? 1 : -1;
      }
    },
    buy() {
      let buyProductInfo = [];
      this.storeItems.map(store => {
        store.productSkuItems.map(product => {
          if (product.checked) {
            buyProductInfo.push({
              ProductSkuId: product.productSkuId,
              Count: product.buyCount,
              ProductId: product.productId,
              storeId: store.storeId,
              LoginUserId: this.loginUser.id
            });
          }
        });
      });
      this.jump("shop.buy", {
        buyInfo: buyProductInfo,
        isFromCart: true // 购买信息来自购物车
      });
    }
  },
  created() {
    this.getCartData();
    this.loginUser = this.$storage.getSync('loginuser') || {};
  }
};
</script>

<style src="Css/core/common.css" scoped></style>
<style scoped>
.store {
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
}
.footbar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  height: 100px;
  left: 0px;
  background-color: white;
}
</style>
