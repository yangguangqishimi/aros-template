import httpHelper from './httpHelper'
import md5 from 'blueimp-md5' // md5 函数

export default {
  //  用户登录
   login (data) {
    var param = data
    param.password = md5(param.password)
    var response = httpHelper.post('/user/login', {}, param)
    return response
  },
  //  获取当个用户
   getSingUser (userId) {
    var response = httpHelper.get('/user/getSingUser', userId)
    return response
  },

  //  用户退出
   logout (data) {
    var response = httpHelper.post('/user/logout', {}, data)
    return response
  },

  //  用户注册
   reg (data) {
    console.dir(data)
    var response = httpHelper.post('/user/reg', {}, data)
    return response
  },
  // 会员资料更新
   update (data) {
    var response = httpHelper.put('/user/update', {}, data)
    return response
  },
  // 修改密码
   changePassword (data) {
    var response = httpHelper.put('/user/changePassword', {}, data)
    return response
  },
  // 修改密码
   findPassword (data) {
    console.dir(data)
    var response = httpHelper.put('/user/findPassword', {}, data)
    return response
  },
  //  获取用户列表
   userList (data) {
    var response = httpHelper.get('/user/list', data)
    return response
  },
  //  会员明细
   view (data) {
    var response = httpHelper.get('/user/view', data)
    return response
  },
  //  加入购物车、足迹、加入收藏夹等相关操作
   addAction (data) {
    var response = httpHelper.post('/user/addAction', {}, data)
    return response
  },
  //  获取购物车、足迹、加入收藏夹等相关操作记录
   getAction (data) {
    var response = httpHelper.get('/user/getAction', data)
    return response
  },
  //  移除购物车、足迹、加入收藏夹等相关操作记录
   removeAction (data) {
    var response = httpHelper.del('/user/removeAction', data)
    return response
  },
  //  加入购物车
   AddCart (data) {
    var response = httpHelper.post('/Cart/AddCart', {}, data)
    return response
  },
  //  获取购物车
   GetCart (data) {
    var response = httpHelper.get('/Cart/GetCart', data)
    return response
  },
  // 删除购物车
   RemoveCart (data) {
    var response = httpHelper.del('/Cart/RemoveCart', data)
    return response
  },
  // 二维码
   QrCode (data) {
    var response = httpHelper.get('/UserDetail/QrCode', data)
    return response
  },
  // 组织架构图
   Tree (data) {
    var response = httpHelper.get('/UserDetail/Tree', data)
    return response
  },
  // 添加地址
   AddAddress (data) {
    var response = httpHelper.post('/UserAddress/add', {}, data)
    return response
  },
  // 获取地址
   GetAddress (data) {
    var response = httpHelper.get('/UserAddress/get', data)
    return response
  },
  // 删除地址
   DeleteAddress (data) {
    var response = httpHelper.del('/UserAddress/delete', data)
    return response
  },
  // 设置默认地址
   setDefault (data) {
    var response = httpHelper.post('/UserAddress/SetDefault', {}, data)
    return response
  },
  // 修改地址
   UpdateAddress (data) {
    var response = httpHelper.put('/UserAddress/update', {}, data)
    return response
  },
  // 获取单个地址
   SingleAddress (data) {
    var response = httpHelper.get('/UserAddress/single', data)
    return response
  },
  // 获取头条
   topline (data) {
    return httpHelper.get('/diy/GetList', data)
  }
}
