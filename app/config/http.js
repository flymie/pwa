import axios from 'axios';
import qs from 'qs';

const $http = axios.create();

// 添加请求拦截器
$http.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
$http.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const $api = {
  // get 请求
  async get(url, data, type = 'get', config = {}) {
    try {
      const res = await $http[type](url, Object.assign({}, config, {
        params: data,
      }));
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch((e) => {
        // console.log(e);
      });
    } catch (err) {
      // alert('服务器出错');
      // console.log(err);
    }
  },
  // post/patch
  async post(url, data, type = 'post', config = {}) {
    try {
      const res = await $http[type](url, data, Object.assign({}, config, {
        transformResponse: [param => qs.stringify(param)],
      }));
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch((e) => {
        console.log(e);
      });
    } catch (err) {
      // alert('服务器出错')
      console.log(err);
    }
  },
};

export default $api;
