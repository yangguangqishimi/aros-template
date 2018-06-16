export default [
  {
    path: '/order/cart',
    meta: {
      title: '购物车'
    },
    name: 'order_cart',
    component: function (resolve) {
      require(['src/views/shop/order/cart'], resolve)
    }
  },
  {
    path: '/order/buy',
    params: {
      buyInfo: '',
      isFromCart: false,
      selectId: ''
    },
    meta: {
      title: '确认下单',
      login: true
    },
    name: 'order_buy',
    component: function (resolve) {
      require(['src/views/shop/order/buy'], resolve)
    }
  },
  {
    path: '/order/list',
    meta: {
      title: '我的订单'
    },
    name: 'order_list',
    component: function (resolve) {
      require(['src/views/shop/order/list'], resolve)
    }
  },
  {
    path: '/order/show',
    meta: {
      title: '订单详情'
    },
    params: {
      showId: ''
    },
    name: 'order_show',
    component: function (resolve) {
      require(['src/views/shop/order/show'], resolve)
    }
  }
]
