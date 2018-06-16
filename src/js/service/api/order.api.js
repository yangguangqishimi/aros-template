import httpHelper from './httpHelper'

export default {
  //  根据商品信息，确认订单页面，获取商品的购买信息,包括价格，物理、等计算
  buyProduct (data) {
    var response = httpHelper.post('/order/BuyInfo', {}, data)
    return response
  },
  //  提交订单，购物商品
  Buy (data) {
    var response = httpHelper.post('/order/buy', {}, data)
    return response
  },
  //  提交订单，购物商品
  getPrice (data) {
    var response = httpHelper.post('/order/getPrice', {}, data)
    return response
  },
  //  我的订单
  list (data) {
    var response = httpHelper.get('/order/Index', data)
    return response
  },
  //  订单详情页
  show (data) {
    var response = httpHelper.get('/order/show', data)
    return response
  }
}
