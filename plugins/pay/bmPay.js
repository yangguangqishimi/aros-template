
'use strict'

import isFunction from 'lodash/isFunction'

const bmPay = {
  payByWechat (params, callback) {
    console.log(params)
    if (isFunction(callback)) {
      callback(resultMode(9, '暂不支持'));
    }
  }
}

function resultMode (status, errorMsg, data) {
  return {
    status,
    errorMsg: errorMsg || '',
    data: data || ''
  }
}

const meta = {
  bmPay: [
    {
      name: 'payByWechat',
      args: ['object', 'function']
    }
  ]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('bmPay', bmPay, meta);
  }
}
