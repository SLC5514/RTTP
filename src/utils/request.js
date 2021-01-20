import axios from 'axios'
import get from 'lodash/get'
import { Dialog, Notify } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000
})

// 异常拦截处理器
const errorHandler = (error) => {
  const status = get(error, 'response.status');
  switch (status) {
    /* eslint-disable no-param-reassign */
    case 400: error.message = '请求错误'; break;
    case 401: error.message = '未授权，请登录'; break;
    case 403: error.message = '拒绝访问'; break;
    case 404: error.message = `请求地址出错: ${error.response.config.method.toUpperCase()} ${error.response.config.url}`; break;
    case 408: error.message = '请求超时'; break;
    case 500: error.message = '服务器内部错误'; break;
    case 501: error.message = '服务未实现'; break;
    case 502: error.message = '网关错误'; break;
    case 503: error.message = '服务不可用'; break;
    case 504: error.message = '网关超时'; break;
    case 505: error.message = 'HTTP版本不受支持'; break;
    default: break;
    /* eslint-disabled */
  }
  Notify({ type: 'danger', message: error.message, duration: 5 * 1000 });
  return Promise.reject(error);
}

request.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (config.method.toLocaleUpperCase() === 'GET') {
        config.params = { ...config.params, token: getToken() }
      } else if (config.method.toLocaleUpperCase() === 'POST') {
        config.data = { ...config.data, token: getToken() }
      }
    }
    return config
  },
  errorHandler
)

request.interceptors.response.use(
  response => {
    const res = response.data
    const { code, message } = res
    if (code !== 1) {
      Notify({ type: 'danger', message: message || 'Error', duration: 5 * 1000 });
      if (code === 2000) {
        // to re-login
        Dialog.alert({
          title: '确认登出',
          message: '您已超时，请重新登录',
          confirmButtonText: '重新登录'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        });
      }
      return Promise.reject(message || 'Error')
    } else {
      return res
    }
  },
  errorHandler
)

export default request
