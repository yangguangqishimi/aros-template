import http from 'src/service/common/http'

export default {
  //  分润记录
  list (data) {
    var response = http.getLogin('/user/reward/list', data)
    return response
  },
  //  分润明细
  show (data) {
    var response = http.getLogin('/user/reward/show', data)
    return response
  },
  //  分润明细
  ceshi (data) {
    var response = http.getLogin('/user/reward/show', data)
    return response
  }
}
