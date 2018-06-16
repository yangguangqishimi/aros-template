export default [
  {
    path: '/user/reward/list',
    meta: {
      title: '我的分润',
      login: true
    },
    name: 'reward_list',
    component: function (resolve) {
      require(['src/views/open/reward/list'], resolve)
    }
  },
  {
    path: '/user/reward/show/:id',
    meta: {
      title: '分润详情',
      login: true
    },
    name: 'reward_show',
    component: function (resolve) {
      require(['src/views/open/reward/show'], resolve)
    }
  }
]
