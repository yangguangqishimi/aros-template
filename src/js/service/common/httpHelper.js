'use strict'

import { baseUrl, key, projectId } from 'Service/config/env'
import md5 from 'blueimp-md5' // md5 函数
import Vue from 'vue';
const timestamp = Math.round(new Date().getTime() / 1000)
const bmAxios = weex.requireModule('bmAxios')

function getSign (url) {
  var zyTool = weex.requireModule('zyTool')
  var ip = zyTool ? 'localhost' : document.domain.toLowerCase()
  var sign =
    timestamp +
    url.toLowerCase() +
    key +
    projectId + ip
  console.info('sign', sign)
  return md5(sign)
}

export default {
  // post数据接口，一般用于数据增加 对应增删改查 中的增加
  post (url, data) {
    return new Promise((resolve, reject) => {
      if (url.substring(0, 1) !== '/') {
        url = '/' + url
      }
      let loginUser = Vue.prototype.$storage.getSync('loginuser') || {};
      var token = url.toLowerCase() + timestamp + loginUser.userName.toLowerCase()
      token = md5(token)
      var sign = getSign(url)
      url = baseUrl + '/api/' + url
      url = url + '?sign=' + sign + '&timestamp=' + timestamp + '&token=' + token + '&loginuserid=' + loginUser.id
      data.loginUserId = loginUser.id
      if (bmAxios) {
        var bmoptions = {}
        bmoptions.method = 'POST'
        bmoptions.url = url
        bmoptions.header = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        bmoptions.data = data
        bmoptions.timeout = 10000
        bmAxios.fetch(bmoptions, res => {
          const { status, data } = res
          if (status >= 200 && status < 300) {
            resolve(data)
          } else {
            reject(res)
          }
        })
      } else {
        axios.default.timeout = 10000
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        const instance = axios.create()
        instance.defaults.headers.post['Content-Type'] = 'application/json'
        instance.post(url, data).then(res => {
          if (res.status >= 200 && res.status < 300) {
            resolve(res.data)
          } else {
            reject(res)
          }
        }).catch(res => {
          reject(res)
        })
      }
    })
  },
  // get数据接口，一般用于数据获取 对应增删改查 中的查
  get (url, params) {
    return new Promise((resolve, reject) => {
      if (url.substring(0, 1) !== '/') {
        url = '/' + url
      }
      let loginUser = Vue.prototype.$storage.getSync('loginuser') || {};
      var token = url.toLowerCase() + timestamp + loginUser.userName.toLowerCase()
      token = md5(token)
      var sign = getSign(url)
      params = {
        ...params,
        sign,
        timestamp,
        token,
        loginuserid: loginUser.id
      }
      if (bmAxios) {
        var bmoptions = {}
        bmoptions.method = 'GET'
        bmoptions.url = baseUrl + '/api/' + url + '?' + this.object2query(params)
        bmoptions.header = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        bmoptions.timeout = 10000
        bmAxios.fetch(bmoptions, res => {
          const { status, data } = res
          if (status >= 200 && status < 300) {
            resolve(data)
          } else {
            reject(res)
          }
        })
      } else {
        axios.get(baseUrl + '/api/' + url, {
          params
        }).then(res => {
          if (res.status >= 200 && res.status < 300) {
            resolve(res.data)
          } else {
            reject(res)
          }
        }).catch(res => {
          reject(res)
        })
      }
    })
  },

  // put数据接口，一般用于数据更新 对应增删改查 中的改
  put (url, data) {
    let apiUrl = url
    axios.default.timeout = 10000
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    const instance = axios.create()
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    if (url.substring(0, 1) !== '/') {
      url = '/' + url
    }
    var sign = getSign(url)
    url = baseUrl + '/api/' + url
    url = url + '?sign=' + sign + '&timestamp=' + timestamp
    console.dir(data)
    var result = instance.put(url, data).then(response => {
      return checkStatus(response)
    })
    console.info(result, 'put接口:' + apiUrl, 'URL:' + url)
    return result
  },

  // delete数据接口，一般用于数据删除 对应增删改查 中的删
  delete (url, params) {
    let apiUrl = url
    if (url.substring(0, 1) !== '/') {
      url = '/' + url
    }
    var sign = getSign(url)
    params = {
      ...params,
      sign,
      timestamp
    }
    var result = axios({
      method: 'delete',
      baseURL: baseUrl + '/api/',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => {
      return checkStatus(response)
    })
    console.info(
      result,
      'delete接口:' + apiUrl,
      'URL:' + baseUrl + '/api/' + url
    )
    return result
  },
  object2query (queryObject) {
    var query = ''
    for (var name in queryObject) {
      if (queryObject[name] !== '') {
        query = query + name + '=' + queryObject[name] + '&'
      }
    }
    if (query[query.length - 1] === '&') {
      query = query.substring(0, query.length - 1)
    }
    // 最后一个&不去掉没关系
    return query
  }
}
