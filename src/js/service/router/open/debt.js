export default [
  {
    path: '/user/debt/apply',
    meta: {
      title: '债事报备',
      login: true
    },
    name: 'debt_apply',
    component: function (resolve) {
      require(['src/views/open/debt/apply'], resolve)
    }
  },
  {
    path: '/user/debt/show/:id',
    meta: {
      title: '债事详情',
      login: true
    },
    name: 'debt_show',
    component: function (resolve) {
      require(['src/views/open/debt/show'], resolve)
    }
  },
  {
    path: '/user/debt/list',
    meta: {
      title: '我的债事',
      login: true
    },
    name: 'debt_list',
    component: function (resolve) {
      require(['src/views/open/debt/list'], resolve)
    }
  }
]
