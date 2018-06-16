export default [
  {
    path: '/user/account/index',
    meta: {
      title: '钱包',
      login: true
    },
    name: 'account_index',
    component: function (resolve) {
      require(['src/views/finance/account/index'], resolve)
    }
  },
  {
    path: '/user/account/transfer',
    meta: {
      title: '转账',
      login: true
    },
    name: 'account_transfer',
    component: function (resolve) {
      require(['src/views/finance/account/transfer'], resolve)
    }
  },
  {
    path: '/user/account/transferbill',
    meta: {
      title: '转账记录',
      login: true
    },
    name: 'account_transferbill',
    component: function (resolve) {
      require(['src/views/finance/account/transferbill'], resolve)
    }
  },
  {
    path: '/user/account/recharge',
    meta: {
      title: '充值',
      login: true
    },
    name: 'account_recharge',
    component: function (resolve) {
      require(['src/views/finance/account/recharge'], resolve)
    }
  },
  {
    path: '/user/account/rechargebill',
    meta: {
      title: '充值记录',
      login: true
    },
    name: 'account_rechargebill',
    component: function (resolve) {
      require(['src/views/finance/account/rechargebill'], resolve)
    }
  },
  {
    path: '/user/account/withdraw',
    meta: {
      title: '提现',
      login: true
    },
    name: 'account_withdraw',
    component: function (resolve) {
      require(['src/views/finance/account/withdraw'], resolve)
    }
  },
  {
    path: '/user/account/withdrawbill',
    meta: {
      title: '提现记录',
      login: true
    },
    name: 'account_withdrawbill',
    component: function (resolve) {
      require(['src/views/finance/account/withdrawbill'], resolve)
    }
  },
  {
    path: '/user/account/bankcard/index',
    meta: {
      title: '我的银行卡',
      login: true
    },
    name: 'account_bankcard',
    component: function (resolve) {
      require(['src/views/finance/account/bankcard/index'], resolve)
    }
  },
  {
    path: '/user/account/financebill',
    meta: {
      title: '财务记录',
      login: true
    },
    name: 'account_financebill',
    component: function (resolve) {
      require(['src/views/finance/account/financebill'], resolve)
    }
  },
  {
    path: '/user/account/financebillview/:id',
    meta: {
      title: '财务详情',
      login: true
    },
    name: 'account_financebillview',
    component: function (resolve) {
      require(['src/views/finance/account/financebillview'], resolve)
    }
  },
  {
    path: '/user/account/rechargebillview',
    meta: {
      title: '充值详情',
      login: true
    },
    name: 'account_rechargebillview',
    component: function (resolve) {
      require(['src/views/finance/account/rechargebillview'], resolve)
    }
  },
  {
    path: '/user/account/withdrawbillview',
    meta: {
      title: '提现详情',
      login: true
    },
    name: 'account_withdrawbillview',
    component: function (resolve) {
      require(['src/views/finance/account/withdrawbillview'], resolve)
    }
  },
  {
    path: '/user/account/transferbillview',
    meta: {
      title: '转账详情',
      login: true
    },
    name: 'account_transferbillview',
    component: function (resolve) {
      require(['src/views/finance/account/transferbillview'], resolve)
    }
  }
]
