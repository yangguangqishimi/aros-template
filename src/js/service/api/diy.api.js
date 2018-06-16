import httpHelper from './httpHelper'

export default {
  // zk-gird zk-cell zk-swiper 的数据都通过该方法获取
  getLink (key) {
    var params = {
      diyKey: key
    };
    return httpHelper.get('/diy/getlink', params);
  },
  // 高级搜索
  SearchKeyWord (key) {
    return httpHelper.get('/diy/SearchKeyWord');
  },
  // zk-list 的数据都通过该方法获取
  getList (params) {
    return httpHelper.get('/diy/GetList', params);
  }
}
