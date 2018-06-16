
'use strict'

import isFunction from 'lodash/isFunction'

const bmAxios = {
  fetch (options, callback) {
    if (!isFunction(callback)) return;
    if (options.header) {
      options.headers = Object.assign({}, options.header);
      delete options.header;
    }
    axios(options).then(res => {
      callback(res)
    }).catch(err => {
      err.response && (err.response.errorMsg = err.response.statusText);
      callback(err.response)
    })
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
  bmAxios: [
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
    Weex.registerApiModule('bmAxios', bmAxios, meta);
  }
}
