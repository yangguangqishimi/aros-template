/**
 * ResourceHelper类
 * @class ResourceHelper
 * @constructor
 */
function ResourceHelper () {
}

function isNetUrl (str) {
  var index = str.indexOf('http://')
  var index1 = str.indexOf('https://')
  return index === 0 || index1 === 0
}
function isServerUrl (str) {
  if (typeof (str) === 'string' && str.length > 0 && str[0] === '/') {
    return true
  }
  return false
}
/**
 * 图片资源路径转换，实现三端统一
 * @param {string} path - 路径
 * @returns {string} - 实际路径
 */
ResourceHelper.imagePathConvert = function (path) {
  if (isNetUrl(path)) return path
  if (isServerUrl(path)) {
    return Vue.prototype.ZlgCloudHelper.baseUrl + path
  }
  var url
  var isSvg = path.substring(path.lastIndexOf('.') + 1) === 'svg';
  if (weex.config.env.platform === 'android') {
    if (isSvg) {
      url = 'bmlocal://assets/svg/' + path
    } else {
      url = 'bmlocal://assets/images/' + path
    }
  } else if (weex.config.env.platform === 'iOS') {
    if (isSvg) {
      url = 'bmlocal://assets/svg/' + path
    } else {
      url = 'bmlocal://assets/images/' + path
    }
  } else {
    url = isSvg ? '/dist/assets/svg/' + path : '/dist/assets/images/' + path
  }
  return url
}
/**
 * 字体资源路径转换，实现三端统一
 * @param {string} path - 路径
 * @returns {string} - 实际路径
 */
ResourceHelper.fontPathConvert = function (path) {
  if (isNetUrl(path)) return path
  var urlBase
  if (weex.config.env.platform === 'android') {
    urlBase = 'local:///iconfont/'
    // urlBase = 'bmlocal://iconfont/'
  } else if (weex.config.env.platform === 'iOS') {
    urlBase = 'bmlocal://iconfont/'
  } else {
    urlBase = './assets/iconfonts/'
  }
  return `url('${urlBase + path}')`
}

module.exports = ResourceHelper
