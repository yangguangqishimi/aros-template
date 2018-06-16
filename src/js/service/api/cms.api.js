import http from 'src/service/common/http'

export default {
  // 文章详情页
  async articleDetail (data) {
    var response = await http.get('/Article/ArticleDetail', data)
    return response
  },
  // 关于详情页
  async aboutDetail (data) {
    var response = await http.get('/Article/aboutDetail', data)
    return response
  }
}
