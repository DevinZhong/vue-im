/**
* @ignore  =====================================================================================
* @fileoverview 模块间共享的工具函数
* @author  devinzhong@outlook.com
* @version 0.4.0
* @ignore  created in 2016-8-24
* @ignore  =====================================================================================
*/

import { sessionTypes, listTypes } from './constants'


/**
 * 根据会话ID，解析会话类型
 * @param sid {String} 会话ID
 * @return {String} 会话类型，若会话ID为空，返回空
 */
export function resolveSessionType(sid) {
  if (!sid) {
    return ''
  }
  switch (sid) {
    case sessionTypes.FRIEND_REQUESTS:
      return sessionTypes.FRIEND_REQUESTS
    case sessionTypes.GROUP_REQUESTS:
      return sessionTypes.GROUP_REQUESTS
    case sessionTypes.GROUP_INVITATIONS:
      return sessionTypes.GROUP_INVITATIONS
    default:
      if (/.*\([0-9]+\)$/g.test(sid)) {
        return sessionTypes.GROUP_SESSION
      }
      return sessionTypes.FRIEND_SESSION
  }
}


/**
 * 生成好友或群组字典索引数组
 * @param infoMap {Object} 好友字典或群组字典
 * @param listType {String} 列表类型，为字符串常量
 * @return {Array} 好友或群组的索引数组（根据名字的顺序做好排序）
 */
export function generateSimpleMapIndex(infoMap, listType) {
  // 解析出好友名字到ID的映射关系
  const mapByName = resolveMapByName(infoMap, listType)

  // 取出名字，并组成数组
  const nameArray = [...mapByName.keys()]
  // 对名字排序（按字母顺序）
  nameArray.sort()

  /**
   * 遍历名字数组，按照名字的顺序，依次将ID加入索引序列
   */
  const index = []
  for (const name of nameArray) {
    index.push(mapByName.get(name))
  }

  // 将结果返回
  return index
}


/**
 * 从字典中解析名字到ID的映射集，用于好友字典和群组字典
 * @param infoMap {Object} 好友字典或群组字典
 * @param listType {String} 列表类型，为字符串常量，用于区分好友和群组
 * @return {Map} 字典里解析出来的名字到ID的映射，键为名字，值为ID
 */
function resolveMapByName(infoMap, listType) {
  // 建立一个空映射集，填充内容后用于返回
  const mapByName = new Map()

  // 遍历信息字典以收集名字到id的映射关系
  for (const id of Object.keys(infoMap)) {
    // 解析出名字
    let name = resolveName(infoMap[id], listType)

    /**
     * 若Map集中已存在同名的键，在名字后面加上当前时间戳以示区别。
     * 注意这只是一个用于排序的临时Map，不用担心对原字典内容造成影响。
     */
    if (mapByName.has(name)) {
      name += Date.now()
    }

    // 添加名字到ID的映射
    mapByName.set(name, id)
  }

  // 将映射集返回
  return mapByName
}


/**
 * 根据列表类型（好友或群组），解析出名字
 * @param info {Object} 好友或群组信息
 * @param listType {String} 列表类型，为字符串常量，用于区分好友和群组
 * @return {String} 解析出来的名字
 */
function resolveName(info, listType) {
  if (listType === listTypes.FRIEND_LIST) {
    return info.note || info.nickname || info.email
  }
  return info.name
}


/**
 * 生成会话字典索引数组
 * 排序顺序：最新消息越新的会话越靠前，而会话内部，越新的消息越靠后
 * @param sessionMap {Object} 会话字典
 * @return {Array} 会话索引数组，数组各个元素为对象类型，
 *    其属性sid为会话ID，属性timestamps为会话消息的时间戳序列，
 *    返回数组形如：[{sid: sessionId, timestamps: [timestamp, timestamp, ...]}...]
 */
export function generateSessionMapIndex(sessionMap) {
  // 解析出会话最新消息时间戳到会话ID及会话内部消息时间戳序列之间的映射关系
  const mapByTime = resolveMapByTime(sessionMap)

  // 取出最新消息时间戳，并组成数组
  const latestTimestampArray = [...mapByTime.keys()]

  /**
   * 将最新消息时间戳数组按从大到小的顺序，即最新的会话排在最前面
   * 减0是将字符串转为数字，确保比较准确进行
   */
  latestTimestampArray.sort((a, b) => (b - 0) - (a - 0))

  /**
   * 遍历映射，根据会话最新消息时间戳的顺序，依次将会话id和会话内消息时间戳序列加入索引序列
   */
  const index = []
  for (const timestamp of latestTimestampArray) {
    index.push(mapByTime.get(timestamp))
  }

  return index
}


/**
 * 根据时间，从会话字典中解析出用于排序的映射集，
 * 在解析的过程中，会将单个会话内的消息时间戳数组先做好排序，按从小到大的顺序，新的在后面
 * @param sessionMap {Object} 会话字典
 * @return {Map} 一个映射集合，键为最新消息时间戳，值为对象类型，属性sid为会话id，属性timestamps为会话内消息时间戳序列（已排好序）
 */
function resolveMapByTime(sessionMap) {
  // 建立一个空的映射集，填充内容后用于返回
  const mapByTime = new Map()

  for (const sid of Object.keys(sessionMap)) {
    // 获取当前会话内的消息时间戳列表
    const timestamps = Object.keys(sessionMap[sid])

    /**
     * 将消息时间戳按从小到大的顺序排序
     * 由于这里的时间戳是字符串，需要减0转为数值来比较（一般情况其实也不必这么做，因为时间戳的位数将长时间保持不变，直接比较字符串能得到相同的结果）
     */
    timestamps.sort((a, b) => (a - 0) - (b - 0))

    /**
     * 收集会话最新消息时间戳到会话id及会话内消息时间戳数组的映射关系
     * 注意到这里忽略最新消息时间戳相同的情况，毕竟毫秒级别的误差说明用户的运气实在是太背了，而且这造成的影响只是临时性的，并不影响会话字典里的数据
     */
    mapByTime.set(timestamps[timestamps.length - 1], {
      sid,
      timestamps,
    })
  }

  // 将映射集返回
  return mapByTime
}


/**
 * 根据路径，从对象中解析出对应属性
 * @param obj {Object} 待解析的对象
 * @param path {String} 属性路径
 * @param [fallback] {Boolean} 若最终取得的属性不是对象类型，是否滚回上一个节点的属性
 * @return 若路径非法，返回`void 0`，
 *    若路径不存在，返回新建的空对象，
 *    若路径精确，普通模式下为路径下具体属性的类型，
 *    回退模式下，若路径下的具体属性不是对象类型，返回上一个节点
 */
export function resolveTarget(obj, path, fallback) {
  if (!path) {
    return void 0
  }
  const pathArray = path.split('.')
  let target = obj
  for (const property of pathArray) {
    if (typeof target !== 'object') {
      return void 0
    }
    if (!target[property]) {
      target[property] = {}
    } else if (fallback && typeof target[property] !== 'object') {
      return target
    }
    target = target[property]
  }
  return target
}
