export default [
  {
    path: '/help/index',
    meta: {
      title: '客服中心'
    },
    component: function (resolve) {
      require(['src/views/cms/help/index'], resolve)
    }
  },
  {
    path: '/help/show/:id',
    meta: {
      title: '客服中心详情页'
    },
    component: function (resolve) {
      require(['src/views/cms/help/show'], resolve)
    }
  },
  {
    path: '/help/feedback',
    meta: {
      title: '意见反馈'
    },
    component: function (resolve) {
      require(['src/views/cms/help/feedback'], resolve)
    }
  }
]
