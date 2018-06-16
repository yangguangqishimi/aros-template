// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
  'eslint': false,
  'webpackWarnings': false,
  'exports': [
    'js/config/index.js',
    'js/pages/index.vue',
    'js/pages/shop/product/index.vue',
    'js/pages/shop/cart/index.vue',
    'js/pages/shop/buy/index.vue'
  ],
  'alias': {
    'Components': 'js/components',
    'Utils': 'js/utils',
    'Css': 'js/css',
    'Service': 'js/service',
    'Widget': 'js/widget',
    '@': ''
  },
  'diff': {
    'pwd': 'JSBundles/complete',
    'proxy': 'https://app.weex-eros.com/source'
  },
  'server': {
    'path': './',
    'port': 8889
  },
  'mockServer': {
    'port': 52077,
    'mockDir': './dist/mock'
  },
  'socketServer': {
    'port': 8890,
    'switch': true
  },
  localZipFolder: {
    iOS: '',
    android: 'android/WeexFrameworkWrapper/app/src/main/assets'
  },
  webConfig: {
    prod: {
      SourceMap: false
    },
    dev: {
      SourceMap: false,
      cacheBusting: false
    },
    pluginConfigPath: 'plugins/plugins.json',
    pluginFilePath: 'plugins/plugins.js'
  }
}
