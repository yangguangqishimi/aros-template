<template>
  <list>
    <cell>
      <text class="login" @click="login">登录</text>
      <text class="login">{{text}}</text>
    </cell>
  </list>
</template>

<script>

export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    async login () {
      let ret = await this.$userApi.login({username: 'admin', password: '111111'})
      if (ret.status === 1) {
        this.text = ret.result
        this.$storage.setSync('loginuser', ret.result)
      } else {
        this.text = '登录失败'
      }
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 200px;
  margin-left: 200px;
}
</style>
