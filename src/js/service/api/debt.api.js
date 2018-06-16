import http from 'src/service/common/http'

export default {
  //  债事申请
  async apply (data) {
    var response = await http.postLogin('User/Debt/apply', data)
    return response
  },
  //  债事详情
  async show (data) {
    var response = await http.getLogin('User/Debt/show', data)
    return response
  }
}
