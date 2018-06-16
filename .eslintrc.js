// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  globals: {
    weex: true,
    Vue: true,
    axios: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'vue/no-parsing-error':  [2, {
      "x-invalid-end-tag": false
    }],
    // allow async-await
    'generator-star-spacing': 'off',
    'semi': 'off',
    "indent": 0,
    "quotes": [ "error", "single" ],
    "no-control-regex": 0,
    "no-extend-native": 0,
    "no-return-assign": [ 2, "except-parens" ],
    "no-return-await": 0,
    "camelcase": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-promise-reject-errors': 0
  }
}
