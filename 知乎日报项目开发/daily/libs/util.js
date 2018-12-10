/******
*   封装 axios, 写入请求地址的前缀, 在业务中只用写相对路径, 这样可以灵活控制
*******/

import axios from 'axios';
//  基本配置
const Util = {
    imgPath: 'http://127.0.0.1:8011/img',
    apiPath: 'http://127.0.0.1:8010'
};
//  Ajax 通用配置
Util.ajax = axios.create({
    baseURL: Util.apiPath
});
//  添加响应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
});

export default Util;