
'use strict'

import isFunction from 'lodash/isFunction'

const bmCamera = {
  scan (callback) {
    console.log('扫码。。。')
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
  bmCamera: [
    {
      name: 'open',
      args: ['object', 'function']
    },
    {
      name: 'getParams',
      args: ['function']
    },
    {
      name: 'back',
      args: ['object', 'function']
    },
    {
      name: 'refresh',
      args: []
    }
  ]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('bmCamera', bmCamera, meta);
  }
}
