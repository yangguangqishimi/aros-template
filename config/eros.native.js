module.exports = {
  'appName': 'aros-template-name',
  'appBoard': '/config/index.js',
  // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
  'androidIsListenHomeBack': 'true',
  'version': {
    'android': 'aros-template-version',
    'iOS': 'aros-template-version'
  },
  'versionCode': {
    'android': '1',
    'iOS': '1'
  },
  'page': {
    'homePage': '/pages/index.js',
    'mediatorPage': '/mediator/index.js',
    'navBarColor': '#309bf8',
    'navItemColor': '#ffffff'
  },
  'url': {
    'image': 'https://www.zlgcloud.com/v1/users/lfg/avatar'
    // 'bundleUpdate': 'https://www.zlgcloud.com/debug/app/solarApp/version.json',
  },
  'zipFolder': {
    'iOS': '/ios/WeexEros/WeexEros',
    'android': '/android/app/src/main/assets'
  },
  'getui': {
    'enabled': 'false',
    'appId': '',
    'appKey': '',
    'appSecret': ''
  },
  'umeng': {
    'enabled': 'true',
    'iOSAppKey': '5a7199e3f43e4833d8000189',
    'androidAppKey': '5a5c1bb9a40fa3288f000047'
  },
  'wechat': {
    'enabled': 'true',
    'appId': 'wx37a9ed00ba5ed11b',
    'appSecret': '8b056d107b51fb332123b7bb9001461d'
  },
  'qq': {
    'enabled': 'true',
    'appId': '1106706340',
    'appKey': 'ruKKOB2CrAr4wCGf'
  },
  'weibo': {
    'enabled': 'true',
    'appId': '1218726272',
    'appSecret': '0f9f9f19e8b4f229e7113a7f300919fa'
  },
  'amap': {
    'enabled': 'true',
    'iOSAppKey': 'b16d491bf238a4f7f7028e6bbd6c9bb7',
    'androidAppKey': 'c4bd6faf727d14ec01ebf820aef95192'
  }
}
