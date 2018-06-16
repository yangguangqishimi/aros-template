
'use strict'

let supportLocalStorage = !!localStorage;

const bmStorage = {

  setDataSync: function (key, value) {
    if (!supportLocalStorage) {
      return resultMode(9, 'Not Support localStorage');
    }
    try {
      localStorage.setItem(key, value);
      return resultMode(0);
    } catch (e) {
      return resultMode(9, 'Storage Fail');
    }
  },
  getDataSync: function (key) {
    if (!supportLocalStorage) {
      return resultMode(9, 'Not Support localStorage');
    }
    try {
      const val = localStorage.getItem(key);
      return resultMode(0, '', val);
    } catch (e) {
      return resultMode(9, 'Get Fail');
    }
  },
  deleteDataSync: function (key) {
    if (!supportLocalStorage) {
      return resultMode(9, 'Not Support localStorage');
    }
    try {
      localStorage.removeItem(key);
      return resultMode(0, '');
    } catch (e) {
      return resultMode(9, 'Delete Fail');
    }
  },
  removeDataSync: function () {
    if (!supportLocalStorage) {
      return resultMode(9, 'Not Support localStorage');
    }
    try {
      localStorage.clear();
      return resultMode(0, '');
    } catch (e) {
      return resultMode(9, 'Remove Fail');
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
  bmStorage: [{
    name: 'setDataSync',
    args: ['string', 'string']
  },
  {
    name: 'getDataSync',
    args: ['string']
  },
  {
    name: 'deleteDataSync',
    args: ['string']
  },
  {
    name: 'removeDataSync',
    args: []
  }
  ]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('bmStorage', bmStorage, meta);
  }
}
