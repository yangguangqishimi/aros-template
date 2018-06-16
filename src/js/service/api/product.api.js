import httpHelper from './httpHelper'

export default {
  //  商品分类
  class () {
    var response = httpHelper.get('/product/class')
    return response
  },
  //  商品详情
  show (data) {
    var response = httpHelper.get('/product/show', data)
    return response
  },
  //  商品列表
  list (data) {
    return httpHelper.get('/product/list', data)
  },
  //  商品搜索下
  search (data) {
    var response = httpHelper.get('/Diy/SearchKeyWord', data)
    return response
  },
  //  商品收藏
  favorite (data) {
    var response = httpHelper.get('/product/favoriteProduct', data)
    return response
  },
  //  足迹
  footprint (data) {
    var response = httpHelper.get('/product/FootprintProduct', data)
    return response
  }
}
