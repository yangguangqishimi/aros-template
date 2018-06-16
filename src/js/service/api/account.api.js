import http from 'src/service/common/http'

export default {
 //  财务记录
  financeBill (data) {
    var response = http.getLogin('/user/account/bill', data)
    return response
  },
 //  会员所有资产账户
  allAccounts () {
    var response = http.getLogin('/user/account/AllAccounts')
    return response
  },
 //  财务明细
  financeBillView (data) {
    var response = http.getLogin('/user/account/billview', data)
    return response
  },
 //  充值记录
  recharge: function (data) {
    var response = http.getLogin('/user/account/recharge', data)
    return response
  },
 //  转账记录
  transfer: function (data) {
    var response = http.getLogin('/user/account/transfer', data)
    return response
  },
 //  提现记录
  withdraw: function (data) {
    var response = http.getLogin('/user/account/withdraw', data)
    return response
  }
}
