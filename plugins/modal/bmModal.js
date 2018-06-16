
'use strict'

import isFunction from 'lodash/isFunction';
import _css from './style'
import Loading from './loading';

const modal = weex.requireModule('modal');

let loading;
const bmModal = {
  toast (options) {
    modal.toast(options);
  },
  // no title
  alert (options, callback) {
    if (isFunction(callback)) {
      modal.alert(options, callback)
    } else {
      modal.alert(options);
    }
  },
  confirm (options, cancelCallback, okCallback) {
    if (!options.isPrompt) {
      modal.confirm(options, (val) => {
        if (val === (options.okTitle || 'OK')) {
          okCallback(val);
        } else {
          cancelCallback(val);
        }
      })
    } else {
      // 没有input type 和placeholder
      modal.prompt(options, (res) => {
        if (res.result === (options.okTitle || 'OK')) {
          okCallback(res.data);
        } else {
          cancelCallback();
        }
      })
    }
  },
  showLoading (options) {
    console.log('show loading...' + (options.message || ''));
    loading = new Loading(options);
    loading.show();
  },
  hideLoading () {
    loading.destroy();
  }
}

export default {
  init: function (Weex) {
    Weex.utils.appendCss(_css, 'weex-mud-bmModal');
    Weex.registerModule('bmModal', bmModal);
  }
}
