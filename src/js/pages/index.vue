<template>
  <wxc-tab-bar :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" 
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <home class="item-container" :style="contentStyle"></home> 
    <manager class="item-container" :style="contentStyle"></manager>
    <com-circle class="item-container" :style="contentStyle"></com-circle>
    <div class="item-container" :style="contentStyle">
      <text @click="haha" style="size: 36px;margin-top:50px;">分类中心</text>
      <text>{{txt}}</text>
      <text>{{formatTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</text>
      <header style="height:50px;width:750px;background-color:red"></header>
    </div>
    <user class="item-container" :style="contentStyle"></user>
  </wxc-tab-bar>
</template>

<script>
import User from "./user.vue";
import Home from "./home.vue";
import Config from "./tabConfig";
import Manager from "./manager.vue";
import Utils from "weex-ui/packages/utils";
import ComCircle from "Components/com-circle.vue";
import WxcTabBar from "weex-ui/packages/wxc-tab-bar";
export default {
  components: { WxcTabBar, Home, Manager, User },
  data: () => ({
    tabTitles: Config.tabTitles,
    tabStyles: Config.tabStyles,
    txt: "123"
  }),
  created() {
    const tabPageHeight = this.$tools.getDevicesHeight();
    console.log('home: '+tabPageHeight);
    const { tabStyles } = this;
    this.contentStyle = {
      height: tabPageHeight - tabStyles.height + "px"
    };
    console.log(this.contentStyle.height + ", " + tabStyles.height);
  },
  methods: {
    wxcTabBarCurrentTabSelected(e) {
      const index = e.page;
      console.log(index);
    },
    haha() {
      // this.txt = this.$storage.getSync("123");
      // this.txt = weex.config.env;
      // this.$storage.removeAllSync();
      // const modal = weex.requireModule('modal');
      // modal.alert({message: 'hahahah'});
      // this.$notice.loading.show('正在加载...');
      // setTimeout(() => {
      //   this.$notice.loading.hide();
      // }, 2000);
      // this.$notice.confirm({message: 'wo men dou shi hao hai zi'})
      // .then(res => {
      //   console.log(res)
      //   this.$notice.toast(res);
      // })
      //  this.$notice.prompt({message: 'wo men dou shi hao hai zi'})
      // .then(res => {
      //   console.log(res)
      //   this.$notice.toast(res);
      // })
      // this.$pay.alipay('app_id=2018032802463171&biz_content=%7B%22out_trade_no%22%3A%229000000038%22%2C%22passback_params%22%3A%2242%22%2C%22subject%22%3A%22%E6%94%AF%E4%BB%98%E8%AE%A2%E5%8D%95(%E7%BC%96%E5%8F%B79000000038)%22%2C%22total_amount%22%3A%223546.12%22%7D&charset=utf-8&format=json&method=alipay.trade.wap.pay&notify_url=zkdebt.5ug.com%2FPay%2FWapPayAsync&return_url=null%2Forder%2Fshow%3Fid%3D38&sign_type=RSA2&timestamp=2018-06-11+23%3A32%3A13&version=1.0&sign=L1KpqWhPr60BUHebGQPCPNRXCTkcI28TiiTrCFlJVTWz2KauBxW47iZNH%2F%2BisDtAGLC2R7kOyV8BFkoF4BDcwWxd%2FJGeNT0%2BHeN2kVkWDtvAazABB3OZLR2t3nx7peO1APfMkNanJ9zMtg6JqLipHVf2S0JUqusLpqcuZHV%2BiglxQji5roGSA%2FtAFd8iHHZop8BIjcVrtqBa2dTsr4JxBpANz7qkz8NaiOuJlePVFa8l76hGAyj7PYY2rheoiXmTWejBugPZNmx%2FHWwfJdV2CUyZZhLXI277JwWcfar7d%2F5HypzExhZS%2BG3ivDPJs1RdisokxnCV%2F0UEF4VNx%2BtMOQ%3D%3D')
      // .then(res => {
      //   console.log(JSON.stringify(res));
      // })
    }
  }
};
</script>

<style scoped>
.item-container {
  width: 750px;
  background-color: white;
  /* align-items: center;
  justify-content: center; */
}
.item-shape {
  width: 400px;
  height: 400px;
}
</style>
