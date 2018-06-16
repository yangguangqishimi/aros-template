<template>
  <div>
    <wxc-minibar title="确认下单" background-color="#0090ff" text-color="#FFFFFF">
      <arrow @click="back()" slot="left" size="30" deg="-45" color="white"></arrow>
    </wxc-minibar>
    <list>
      <cell class="flex-row-center p10">
        <image style="width:100px;height:100px" :src="imageUrlTransform('zk-orderaddress.svg')" resize="cover"></image>
        <div style="flex:1" class="ml20" >
          <div class="flex-row-center space-between ">
            <text class="fs30 fc-666" style="flex:1">收货人：{{ defaultAddress.name }}</text>
            <text class="fs30 fc-666">{{ defaultAddress.mobile }}</text>
          </div>
          <text class="fs30 fc-666 mt10">收货地址：{{ defaultAddress.addressDescription }}</text>
        </div>
        <arrow class="ml20" style="margin-right:20px;" size="35" width="3"></arrow>
      </cell>
      <cell style="background-color:#f2f2f2;width:750px;height:20px;"></cell>
      <cell v-for="(store, storekey) in modelView.storeItems" :key="storekey">
        <div class="store solid-border-bottom">
          <text class="fs30 fc-666 ml20 p10">{{ store.storeName }}</text>
        </div>
        <div v-for="(productSku, key) in store.productSkuItems" :key="key" class="flex-row-center space-between" style="padding-top:20px;padding-left:20px;padding-right:20px;">
          <image :src="productSku.thumbnailUrl" resize="cover" style="height:180px;width:180px"></image>
          <div style="width:460px;padding-bottom:10px" class="solid-border-bottom">
            <text class="fs28 fc-666 mt10">{{productSku.name}}</text>
            <text class="fs28 fc-999 mt10">{{ productSku.bn}} {{productSku.propertyValueDesc}} 重量：{{productSku.weight}}g</text>
            <text class="fs30 fc-red mt10">￥{{ productSku.displayPrice}}</text>
            <div class="flex-row-center space-between mt10">
              <text class="fs28 fc-999 line-through">￥{{ productSku.marketPrice }}</text>
              <text class="fs28 fc-999">X{{productSku.buyCount}}</text>
            </div>
          </div>
        </div>
        <div class="mini-cell cellActive" @click="expressBoxShow = true, selectStore = store">
          <text class="fs30 fc-333" style="flex:1">请选择：</text>
          <text class="fs30 fc-999" >{{ store.selectExpress }}</text>
          <arrow size="20"></arrow>
        </div>
        <div class="mini-cell">
          <text class="fs30 fc-333" >卖家留言</text>
          <input type="text" style="flex:1" placeholder="填写内容已与卖家协商确认" class="input-text"/>
        </div>
        <div class="mini-cell">
          <div style="flex:1"></div>
          <text class="fs30 fc-999">共{{ store.productSkuItems.length }}件-运费122-小计12356</text>
        </div>
        <div style="background-color:#f2f2f2; height:20px; width:750px"></div>
      </cell>
      <header style="height:100px;width:750px"></header>
      <header class="flex-row-center solid-border footbar" >
        <text class="fs36 fc-666 ml10">总计</text>
        <text class="fs36 fc-red ml20" style="flex:1">￥12350</text>
        <text class="fs30 fc-999 ml20">共13件商品</text>
        <div class="center-center ml10" @click="buy" style="height:100px;width:220px;background-color:#0090ff">
          <text class="fs30 fc-white">提交订单</text>
        </div>
      </header>
    </list>
    <wxc-popup :height="expressBoxHeight"
                :show="expressBoxShow"
                pos="bottom"
                style="z-index:999"
                @wxcPopupOverlayClicked="popupOverlayAutoClick">
      <div class="solid-border-bottom center-center" style="width:750px;height:100px;">
        <text class="fs36 fc-333">选择快递方式</text>
      </div>
      <scroller style="height:460px;width:750px;padding-left:20px;">
        <div @click="selectExpress(express.value)" class="flex-row-center space-between solid-border-bottom cellActive" style="padding-top:20px;padding-bottom:20px" v-for="express in selectStore.expressTemplates" :key="express.key" >
          <text class="fs30 fc-666">{{express.value}}</text>
        </div>
      </scroller>
    </wxc-popup>
  </div>
</template>

<script>
import WxcMinibar from "weex-ui/packages/wxc-minibar";
import Arrow from "Components/arrow.vue";
import WxcPopup from "weex-ui/packages/wxc-popup";
const modal = weex.requireModule("modal");
export default {
  components: { WxcMinibar, Arrow, WxcPopup },
  data() {
    return {
      defaultAddress: {
        name: "老板",
        mobile: "12312341233",
        addressDescription: "广州市天河区黄洲工业区7栋420室6号桌"
      },
      buyProductInfo: {},
      isFromCart: false,
      modelView: {},
      showDelivery: [],
      userMessages: [],
      reduceMoneys: [],
      expressBoxHeight: 560,
      expressBoxShow: false,
      selectStore: {}
    };
  },
  created() {
    this.$router.getParams(params => {
      this.buyProductInfo = params.buyInfo;
      this.isFromCart = params.isFromCart;
      this.GetData();
    });
  },
  methods: {
    popupOverlayAutoClick () {
      this.expressBoxShow = false
    },
    selectExpress(val) {
      this.selectStore.selectExpress = val;
    },
    async GetData() {
      if (this.buyProductInfo === undefined) {
        // this.$vux.toast.warn("暂无商品，清先购买商品");
        // this.$router.push({
        //   name: "commont_index"
        // });
      } else {
        var buyInfoInput = {
          loginUserId: this.buyProductInfo[0].loginUserId,
          productJson: JSON.stringify(this.buyProductInfo)
        };
        // console.info('购物信息', buyInfoInput)
        var response = await this.$thiorderApi.buyProduct(buyInfoInput);
        this.modelView = response.result;
        // 初始运费模板
        for (var i = 0; i < this.modelView.storeItems.length; i++) {
          this.showDelivery[i] = this.modelView.storeItems[i].expressTemplates[0].key;
          this.userMessages[i] = ""; // 初始化留言信息
        }
        // 初始化币种
        for (var k = 0; k < this.modelView.allowMoneys.length; k++) {
          this.reduceMoneys[k] = true;
        }
      }
    }
  }
};
</script>

<style src="Css/core/common.css" scoped></style>
<style scoped>
.input-text {
  flex: 1;
  font-size: 30px;
  height: 60px;
  color: black;
  placeholder-color: #999999;
  text-align: left;
  margin-left: 20px;
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
</style>
