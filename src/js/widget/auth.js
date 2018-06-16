/**
 * @Author: lfg
 * @Date:   2018-05-22
 * @Last modified by:   lfg
 * @Last modified time: 2018-06-05
 */

const bmAuth = weex.requireModule('bmAuth')
const Auth = Object.create(null)

Auth.install = (Vue, options) => {
  Vue.prototype.$auth = {
    // 扫一扫
    login (platform) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$notice.loading.show(Vue.prototype.$t('tips.auth'))
        bmAuth.login(platform, ({ status, errorMsg, data }) => {
          Vue.prototype.$notice.loading.hide()
          status === 0 ? resolve(data) : reject({ status, errorMsg, data })
        })
      })
    },
    unAuth (platform) {
      return new Promise((resolve, reject) => {
        bmAuth.unAuth(platform, ({ status, errorMsg, data }) => {
          status === 0 ? resolve(data) : reject({ status, errorMsg, data })
        })
      })
    },
    share (params) {
      return new Promise((resolve, reject) => {
        params.title || params.platform || reject({ status: 9, errorMsg: 'wrong params' })
        bmAuth.share({
          title: params.title,
          content: params.content || '',
          image: params.image || '',
          url: params.url || '',
          platform: params.platform,
          mediaType: params.mediaType || 'WEB'
        }, ({ status, errorMsg, data }) => {
          status === 0 ? resolve(data) : reject({ status, errorMsg, data })
        })
      })
    }
  }
}

Vue.use(Auth)
