import request from '@/utils/request'

/**
 * @description: 微信认证授权
 * @param {String} url 回跳路由
 * @return:
 */
export function wechatLogin(url) {
  return request({
    url: '/wx/wechatLogin?url=' + url,
    method: 'get',
  })
}

/**
 * @description: 获取用户信息
 * @param {String} openId 用户ID oIdnG5-wPO2csWtppJpy1xJPv6ig
 * @return:
 */
export function getStudentByOpenId({ openId }) {
  return request({
    url: '/wx/getStudentByOpenId?openId=' + openId,
    method: 'get',
  })
}

/**
 * @description: 保存手机号
 * @param {String} phone 手机号
 * @param {String} openId 用户ID oIdnG5-wPO2csWtppJpy1xJPv6ig
 * @return:
 */
export function savePhone({ phone, openId, jtOpenId, materialId }) {
  return request({
    url: '/wx/savePhone?phone=' + phone + '&openId=' + openId + '&jtOpenId=' + jtOpenId + '&materialId=' + materialId,
    method: 'get',
  })
}

/**
 * @description: 获取推荐进度
 * @param {String} openId 用户ID oIdnG5-wPO2csWtppJpy1xJPv6ig
 * @return:
 */
export function getProgressByOpenId({ openId }) {
  return request({
    url: '/wx/getProgressByOpenId?openId=' + openId,
    method: 'get',
  })
}

/**
 * @description: 获取模板
 * @param {String} id  素材id
 * @return:
 */
export function getMaterialById({ id }) {
  return request({
    url: '/wx/getMaterialById',
    method: 'get',
    params: { id }
  })
}
