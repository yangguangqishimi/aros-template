
import userApi from 'Service/api/user.api.js';
import productApi from 'Service/api/product.api.js';
import diyApi from 'Service/api/diy.api.js';
import orderApi from 'Service/api/order.api.js';

Vue.prototype.$userApi = userApi;

Vue.prototype.$productApi = productApi;

Vue.prototype.$diyApi = diyApi;

Vue.prototype.$orderApi = orderApi;
