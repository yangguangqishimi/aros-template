// /**
//  * 配置编译环境和线上环境之间的切换
//  *
//  * baseUrl: 域名地址
//  * routerMode: 路由模式
//  * imgurl: 图片所在域名地址
//  *
//  *
//  */
// 项目ID，秘钥，与项目当中的秘钥相同，千万不能泄露，否则会可能会导致数据泄露

const key = '5C017EC7FF0045D1B8B00076067D3B3B'
const projectId = 'b93900e2-26ad-4ae0-bc3f-e639c2d482a0'
const clientType = 'moblie'

let baseUrl

let routerMode = 'history'

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://zkdebt.5ug.com'
  // baseUrl = 'http://zkgs.5ug.com'
  // baseUrl = 'http://zkqd.5ug.com'
  // baseUrl = 'http://localhost:9011'
} else {
  baseUrl = 'http://zkdebt.5ug.com'
  // baseUrl = 'http://zkgs.5ug.com'
  // baseUrl = 'http://zkqd.5ug.com/'
  // baseUrl = 'http://localhost:9011'
}
export {
  baseUrl,
  routerMode,
  key,
  projectId,
  clientType
}
