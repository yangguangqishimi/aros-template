
const storage = weex.requireModule('bmStorage')

var Storage = Object.create(null)

Storage.install = (Vue, options) => {
    Vue.prototype.$storage = {
        setSync (key, value) {
            return storage.setDataSync(key.toString(), JSON.stringify(value))
        },
        getSync (key) {
            const { status, data } = storage.getDataSync(key.toString())
            return status === 0 && data !== '' ? JSON.parse(data) : false
        },
        deleteSync (key) {
            const { status } = storage.deleteDataSync(key.toString())
            return status === 0
        },
        removeAllSync () {
            const { status } = storage.removeDataSync()
            return status === 0
        }
        // record (key) {
        //     var list = this.getSync('record_list')
        //     if (list) {
        //         list = list instanceof Array ? list : []
        //         if (list.indexOf(key) === -1) {
        //             list.push(key)
        //             storage.setDataSync('record_list', JSON.stringify(list))
        //         }
        //     } else {
        //         storage.setDataSync('record_list', JSON.stringify([key]))
        //     }
        // },
        // getRecordList () {
        //     const { status, data } = storage.getDataSync('record_list')
        //     return status === 0 ? JSON.parse(data) : false
        // }
    }
}

Vue.use(Storage)
