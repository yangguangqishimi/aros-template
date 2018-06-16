import http from 'src/service/common/http'

export default {
  //  获取自动配置
  GetConfigValue (data) {
    let params = {
      ConfigKey: data
    }
    var response = http.get('/Common/GetAutoConfig', params)
    return response
  },
  //  文件上传
  upload (file, path) {
    var response = http.post('/common/upload', file)
    return response
  },
  //  发送手机验证码 ，发送六位数手机验证码
  sendmobileVerifiyCode (mobile) {
    var response = http.post('/common/sendmobileVerifiyCode', mobile)
    return response
  }
}
