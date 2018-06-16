
'use strict'

import isFunction from 'lodash/isFunction'

const bmImage = {
  uploadImage (params, callback) {
    console.log(params)
    if (isFunction(callback)) {
      callback(resultMode(9, '暂不支持'));
    }
  },
  camera (params, callback) {
    console.log(params)
    if (isFunction(callback)) {
      callback(resultMode(9, '暂不支持'));
    }
  },
  pick (params, callback) {
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
  bmImage: [
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
    Weex.registerApiModule('bmImage', bmImage, meta);
  }
}
