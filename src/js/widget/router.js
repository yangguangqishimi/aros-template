/**
 * @Author: songqi
 * @Date:   2017-01-11
 * @Last modified by:   songqi
 * @Last modified time: 2017-04-05
 */
import isFunction from 'lodash/isFunction'
import _isUndefined from 'lodash/isUndefined'
import _isNumber from 'lodash/isNumber'

const modal = weex.requireModule('bmModal')
const storage = weex.requireModule('bmStorage')
const router = weex.requireModule('bmRouter')

// 客户端默认打开页面的动画
export const DEFAULT_ANIMATETYPE = 'PUSH'

export default class Router {
    constructor ({ routes }) {
        this.routes = routes
        return this
    }
    install (Vue, options) {
        const self = this

        Vue.prototype.$router = {
            open (options) {
                options = options || {}
                const currentPageInfo = this.getUrl(options.name)
                if (!currentPageInfo || !currentPageInfo.url) return
                options.canBack = _isUndefined(options.canBack) ? true : options.canBack
                return new Promise((resolve, reject) => {
                    weex.requireModule('bmRouter').open({
                        url: currentPageInfo.url,
                        type: options.type || DEFAULT_ANIMATETYPE,
                        params: options.params || {},
                        canBack: !!options.canBack,
                        navShow: options.navShow || !!currentPageInfo.title,
                        navTitle: options.navTitle || currentPageInfo.title,
                        statusBarStyle: options.statusBarStyle || 'LightContent',
                        isRunBackCallback: isFunction(options.backCallback)
                    }, (data) => {
                        if (isFunction(options.backCallback)) {
                            options.backCallback.call(this, data)
                        }
                    })
                })
            },
            back (options = {}) {
                return new Promise((resolve, reject) => {
                    router.back({
                        type: options.type || DEFAULT_ANIMATETYPE,
                        length: options.length || 1
                    }, (data) => {
                        if (isFunction(options.callback)) {
                            options.callback.call(this, data)
                        }
                        resolve(data)
                    })
                })
            },
            getParams (callback) {
                return new Promise((resolve, reject) => {
                    weex.requireModule('bmRouter').getParams((params) => {
                        if (isFunction(callback)) {
                            callback.call(this, params)
                        }
                        resolve(params)
                    })
                })
            },
            getUrl (page) {
                const currentPageInfo = self.routes[page]
                if (!currentPageInfo) {
                    modal.alert({
                        message: '跳转页面不存在',
                        okTitle: '确定'
                    })
                    return false
                }
                return currentPageInfo
            },
            refresh () {
                router.refreshWeex()
            },
            setBackParams (params) {
                _isNumber(params) && params.toString()
                storage.setData('router.backParams', JSON.stringify(params))
            },
            toWebView (params) {
                if (!params.url) return
                params.title = params.title || 'weex-eros'
                    // params.shareInfo = {
                    //     title: params.shareTitle,
                    //     content: params.content || '',
                    //     image: params.image || '',
                    //     url: params.url || '',
                    //     platforms: params.platforms || [] // 传空的话默认全部
                    // }
                router.toWebView(params)
            },
            toMap (options) {
                // options = {
                //     type:'NAVIGATION', //type类型：NAVIGATION(表现方式为：地图上添加起点终点标示大头针，终点标示上面有个导航的按钮)
                //     title: '页面标题', //页面标题
                //     navigationInfo: {
                //         title: '北京朝阳医院', //目的地名称
                //         address: '北京市朝阳区工体南路8号', //目的地地址
                //         longitude:'', //目的地经度
                //         latitude:'' //目的地纬度
                //      }
                // }
                router.toMap(options)
            },
            openBrowser (url = '') {
                if (!url) return
                router.openBrowser(url)
            },
            setHomePage (url = '') {
                router.setHomePage(url)
            },
            finish () {
                router.finish()
            }
        }
    }
}
