import md5 from 'blueimp-md5'

const key = '5C017EC7FF0045D1B8B00076067D3B3B'
const projectId = 'b93900e2-26ad-4ae0-bc3f-e639c2d482a0'
const timestamp = Math.round(new Date().getTime() / 1000)

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

function object2query (queryObject) {
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

/**
 * 请求发送统一拦截器 （可选）
 * options 你请求传入的所有参数和配置
 * next
 */
function requestHandler (options, next) {
  let url = options.url
  let sign = getSign(url);

  let params = {
    sign,
    timestamp,
    ...options.params
  }
  let loginUser = Vue.prototype.$storage.getSync('loginuser') || {};
  if (loginUser.id) {
    let token = md5(url.toLowerCase() + timestamp + loginUser.userName.toLowerCase())
    params['loginuserid'] = loginUser.id;
    params['token'] = token;
    if (options.data) {
      options.data['loginUserId'] = loginUser.id;
    }
  }
  delete options.params;
  url += `?${object2query(params)}`;
  options.url = url;
  console.log('request-opts', options)
  next()
}
/**
* 请求返回统一拦截器 （可选）
* options 你请求传入的所有参数和配置
* resData 服务器端返回的所有数据
* resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
* reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
*/
function responseHandler (options, resData, resolve, reject) {
  const { status, errorMsg, data } = resData
  if (status < 200 && status >= 300) {
    console.log(`invoke error status: ${status}`)
    console.log(`invoke error message: ${errorMsg}`)
    reject({ status, errorMsg, data })
  } else {
    // 自定义请求逻辑
    resolve(data)
  }
}

export default {
  baseUrl: 'http://zkdebt.5ug.com/api',
  /**
   * 接口别名
   */
  apis: {},
  // 接口超时时间
  timeout: 30000,

  requestHandler,

  responseHandler
}
