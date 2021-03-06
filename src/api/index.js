import request from '@/utils/request'

/**
 * @description: 微信认证授权
 * @param {String} url 回跳路由
 * @return:
 */
export function wechatLogin(url) {
  return request({
    url: '/wx/wechatLogin',
    method: 'get',
    data: { url }
  })
}

/**
 * @description: 获取用户信息
 * @param {String} openId 用户ID oIdnG5-wPO2csWtppJpy1xJPv6ig
 * @return:
 */
export function getStudentByOpenId(openId) {
  return request({
    url: '/wx/getStudentByOpenId',
    method: 'post',
    data: { openId }
  })
}

/**
 * @description: 保存手机号
 * @param {String} phone 手机号
 * @param {String} openId 用户ID oIdnG5-wPO2csWtppJpy1xJPv6ig
 * @return:
 */
export function savePhone({ phone, openId }) {
  return request({
    url: '/wx/savePhone',
    method: 'post',
    data: { phone, openId }
  })
}

/**
 * @description: 获取推荐进度
 * @param {String} openId 用户ID oIdnG5-wPO2csWtppJpy1xJPv6ig
 * @return:
 */
export function getProgressByOpenId({ openId }) {
  return request({
    url: '/wx/getProgressByOpenId',
    method: 'get',
    data: { openId }
  })
}
