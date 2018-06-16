import _isFunction from 'lodash/isFunction'
const bmAxios = weex.requireModule('bmAxios')
export default class Axios {
    constructor ({ timeout, apis, baseUrl = '', requestHandler, responseHandler }) {
        this.apis = apis
        this.timeout = timeout
        this.baseUrl = baseUrl
        this.requestHandler = requestHandler
        this.responseHandler = responseHandler
        return this
    }
    install (Vue) {
        const self = this
        Vue.prototype.$fetch = (options) => {
            return new Promise((resolve, reject) => {
                if (_isFunction(self.requestHandler)) {
                    self.requestHandler(options, () => { handleAxios(options, resolve, reject) })
                } else {
                    handleAxios(options, resolve, reject)
                }
            })
        }

        function handleAxios ({ name, url = '', data, method, header }, resolve, reject) {
            bmAxios.fetch({
                url: url ? (self.baseUrl + url) : (self.baseUrl + self.apis[name]),
                data: data || {},
                method: method || 'GET',
                header: header || {},
                timeout: self.timeout || 30000
            }, (resData) => {
                // 统一的监控
                if (_isFunction(self.responseHandler)) {
                    self.responseHandler({ name, url, data, method, header }, resData, resolve, reject)
                } else {
                    resolve(resData)
                }
            })
        }
    }
}
