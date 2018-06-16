
import Widget from 'Widget'
import routes from './routes'
import ajax from './ajax'
import './components'
import './apis'

/* eslint-disable no-new */
new Widget({
    router: {
        // 路由配置表
        routes
    },
    ajax
})

Vue.prototype.formatTime = (d1, format) => {
    if (d1 instanceof Date) {
        var date = {
            'M+': d1.getMonth() + 1,
            'd+': d1.getDate(),
            'h+': d1.getHours(),
            'm+': d1.getMinutes(),
            's+': d1.getSeconds(),
            'q+': Math.floor((d1.getMonth() + 3) / 3),
            'S+': d1.getMilliseconds()
        }
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (d1.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('00' + date[k]).length - RegExp.$1.length))
            }
        }
        return format
    }
}

Vue.prototype.toFixed = (data, num) => {
    if (typeof (data) !== 'number') return data || '--';
    return data && Math.round(data * num) / num
}

Vue.prototype.jump = (to, params, title) => {
    if (to && to !== '') {
        Vue.prototype.$router.open({
            name: to,
            type: 'PUSH',
            params: params,
            navTitle: title,
            canBack: true,
            statusBarStyle: 'LightContent',
            navShow: title && title !== '',
            isRunBackCallback: true
        })
    }
}
Vue.prototype.back = () => {
    Vue.prototype.$router.back()
}
Vue.prototype.$animationFn = (el, options, fn) => {
    weex.requireModule('animation').transition(el, {
        styles: {
            opacity: options.opacity,
            transform: options.translate,
            transformOrigin: options.transformOrigin || 'center center'
        },
        duration: options.duration || 200, // ms
        timingFunction: options.timing || 'ease-in',
        delay: options.delay || 0 // ms
    }, function () {
        fn && fn();
    })
}

const ResourceHelper = require('Utils/resourcehelper.js')
Vue.prototype.imageUrlTransform = (path, bm) => {
    return ResourceHelper.imagePathConvert(path, bm)
}
