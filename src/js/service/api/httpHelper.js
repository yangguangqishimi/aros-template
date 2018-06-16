const _this = Vue.prototype

function get (url, params) {
  return _this.$fetch({ method: 'GET', params, url })
}

function post (url, params, data) {
  return _this.$fetch({ method: 'POST', params, url, data })
}

function put (url, params, data) {
  return _this.$fetch({ method: 'PUT', params, url, data })
}

function del (url, params) {
  return _this.$fetch({ method: 'DELETE', params, url })
}

export default {
  get,
  post,
  put,
  del
}
