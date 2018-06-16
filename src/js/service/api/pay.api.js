import http from 'src/service/common/http'

export default {
  //  获取支付方式
  async GetList (data) {
    var response = await http.getLogin('pay/GetList', data)
    return response
  },
  //  支付
  async Pay (data) {
    var response = await http.postLogin('pay/pay', data)
    return response
  }
}
