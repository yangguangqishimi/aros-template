var Tools = Object.create(null);

Tools.install = (Vue, options) => {
  Vue.prototype.$tools = {
    getStatusBarHeight () {
      return weex.config.env.statusBarHeight || 0;
    },
    getDevicesHeight () {
      if (this.getPlatform() === 'android') {
        return this.getEnv().realDeviceHeight;
      } else {
        const env = this.getEnv();
        return env.deviceHeight * 750 / env.deviceWidth;
      }
    },
    getPlatform () {
      return weex.config.env.platform;
    },
    getEnv () {
      return weex.config.env;
    }
  }
}

Vue.use(Tools);
