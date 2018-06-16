export default [{
    path: '/user/index',
    meta: {
      title: '会员中心',
      login: true
    },
    name: 'user_index',
    component: function (resolve) {
      require(['src/views/core/user/index'], resolve)
    }
  },
  {
    path: '/user/login',
    meta: {
      title: '会员中心'
    },
    name: 'user_login',
    component: function (resolve) {
      require(['src/views/core/user/login'], resolve)
    }
  },
  {
    path: '/user/reg',
    meta: {
      title: '会员注册'
    },
    name: 'user_reg',
    component: function (resolve) {
      require(['src/views/core/user/reg'], resolve)
    }
  },
  {
    path: '/user/agreement',
    meta: {
      title: '注册协议'
    },
    name: 'user_agreement',
    component: function (resolve) {
      require(['src/views/core/user/agreement'], resolve)
    }
  },
  {
    path: '/user/qrcode',
    meta: {
      title: '二维码名片',
      login: true
    },
    name: 'user_qrcode',
    component: function (resolve) {
      require(['src/views/core/user/qrcode'], resolve)
    }
  },
  {
    path: '/user/tree',
    meta: {
      title: '组织架构图',
      login: true
    },
    name: 'user_tree',
    component: function (resolve) {
      require(['src/views/core/user/tree'], resolve)
    }
  },
  {
    path: '/user/recuser',
    meta: {
      title: '我的会员',
      login: true
    },
    name: 'user_recuser',
    component: function (resolve) {
      require(['src/views/core/user/recuser'], resolve)
    }
  },
  {
    path: '/user/security',
    meta: {
      title: '安全设置',
      login: true
    },
    name: 'user_security',
    component: function (resolve) {
      require(['src/views/core/user/security'], resolve)
    }
  },
  {
    path: '/user/password',
    meta: {
      title: '密码修改',
      login: true
    },
    name: 'user_password',
    component: function (resolve) {
      require(['src/views/core/user/password'], resolve)
    }
  },
  {
    path: '/user/safepassword',
    meta: {
      title: '安全设置',
      login: true
    },
    name: 'user_safepassword',
    component: function (resolve) {
      require(['src/views/core/user/safepassword'], resolve)
    }
  },
  {
    path: '/user/findpassword',
    meta: {
      title: '找回密码'
    },
    name: 'user_findpassword',
    component: function (resolve) {
      require(['src/views/core/user/findpassword'], resolve)
    }
  },
  {
    path: '/user/info',
    meta: {
      title: '账户信息',
      login: true
    },
    name: 'user_info',
    component: function (resolve) {
      require(['src/views/core/user/info'], resolve)
    }
  },
  {
    path: '/user/adduser',
    meta: {
      title: '注册会员',
      login: true
    },
    name: 'user_adduser',
    component: function (resolve) {
      require(['src/views/core/user/adduser'], resolve)
    }
  },
  {
    path: '/user/view/:id',
    meta: {
      title: '会员详情',
      login: true
    },
    name: 'user_view',
    component: function (resolve) {
      require(['src/views/core/user/view'], resolve)
    }
  },
  {
    path: '/user/logout',
    meta: {
      title: '退出登录',
      login: true
    },
    name: 'user_logout',
    component: function (resolve) {
      require(['src/views/core/user/logout'], resolve)
    }
  },
  {
    path: '/identity/index',
    meta: {
      title: '实名认证',
      login: true
    },
    name: 'user_identity',
    component: function (resolve) {
      require(['src/views/core/identity/index'], resolve)
    }
  },
  {
    path: '/user/address/edit',
    meta: {
      title: '添加地址',
      login: true
    },
    params: {
      id: '',
      type: ''
    },
    name: 'address_edit',
    component: function (resolve) {
      require(['src/views/core/address/edit'], resolve)
    }
  },
  {
    path: '/user/address/index',
    meta: {
      title: '收货地址',
      login: true
    },
    params: {
      selectType: true
    },
    name: 'address_index',
    component: function (resolve) {
      require(['src/views/core/address/index'], resolve)
    }
  },
  {
    path: '/user/address/select',
    meta: {
      title: '选择地址',
      login: true
    },
    params: {},
    name: 'address_select',
    component: function (resolve) {
      require(['src/views/core/address/select'], resolve)
    }
  },
  {
    path: '/user/favorite/index',
    meta: {
      title: '我的收藏',
      login: true
    },
    name: 'user_favorite',
    component: function (resolve) {
      require(['src/views/core/favorite/index'], resolve)
    }
  }
]
