
'use strict'

import isFunction from 'lodash/isFunction'

const bmRouter = {
  open (option, callback) {
    if (!option || !option.url) return;
    const path = option.url.substring(0, option.url.indexOf('/index.js'))
    let url = location.protocol + '//' + location.host + '/dist/web/js' + path;
    location.href = url;
    if (option.params) {
      weex.requireModule('bmStorage').setDataSync('open_params', JSON.stringify(option.params));
    }
    if (isFunction(callback)) {
      callback()
    }
  },
  getParams (callback) {
    if (isFunction(callback)) {
      const params = weex.requireModule('bmStorage').getDataSync('open_params');
      callback(JSON.parse(params.data));
    }
  },
  back (options, callback) {
    window.history.back();
    if (isFunction(callback)) {
      callback();
    }
  },
  refresh () {
    location.reload();
  }
}

// function resultMode (status, errorMsg, data) {
//   return {
//     status,
//     errorMsg: errorMsg || '',
//     data: data || ''
//   }
// }

const meta = {
  bmRouter: [
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
    Weex.registerApiModule('bmRouter', bmRouter, meta);
  }
}
