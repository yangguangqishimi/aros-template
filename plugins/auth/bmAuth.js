
'use strict'

import isFunction from 'lodash/isFunction'

const bmAuth = {
  login (platform, callback) {
    console.log(platform)
    if (isFunction(callback)) {
      callback(resultMode(9, '暂不支持'));
    }
  },
  auth (platform, callback) {
    console.log(platform)
    if (isFunction(callback)) {
      callback(resultMode(9, '暂不支持'));
    }
  },
  share (params, callback) {
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
  bmAuth: [
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
    Weex.registerApiModule('bmAuth', bmAuth, meta);
  }
}
