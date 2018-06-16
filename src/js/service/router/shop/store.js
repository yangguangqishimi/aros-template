export default [
  {
    path: '/store/class', // 店铺分类页面
    meta: {
      title: '分类'
    },
    name: 'store_class',
    component: function (resolve) {
      require(['src/views/shop/store/class.vue'], resolve)
    }
  },
  {
    path: '/store/index', // 店铺首页
    meta: {
      title: '店铺首页'
    },
    name: 'store_index',
    component: function (resolve) {
      require(['src/views/shop/store/index.vue'], resolve)
    }
  },
  {
    path: '/store/info', // 店铺首页
    meta: {
      title: '店铺信息'
    },
    name: 'store_info',
    component: function (resolve) {
      require(['src/views/shop/store/info.vue'], resolve)
    }
  },
  {
    path: '/store/news', // 店铺首页
    meta: {
      title: '店铺动态'
    },
    name: 'store_news',
    component: function (resolve) {
      require(['src/views/shop/store/news.vue'], resolve)
    }
  },
  {
    path: '/store/new', // 店铺上新
    meta: {
      title: '店铺上新'
    },
    name: 'store_new',
    component: function (resolve) {
      require(['src/views/shop/store/news.vue'], resolve)
    }
  }
]
