// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const personinfo = db.collection("pingpang_personinfo")
const _ = db.command;
// 云函数入口函数
exports.main = async(event, context) => {
  let {
    openIdarr,
    openId,
    all,
    city
  } = event;
  if (all) {
    return await personinfo.get()
  } else if (city) {
    return await personinfo.where({
      city
    }).get()
  } else if (openIdarr) {
    return await personinfo.where({
      openId: _.in(openIdarr)
    }).get()
  } else {
    return await personinfo.where({
      openId: openId || event.userInfo.openId
    }).get()
  }
}