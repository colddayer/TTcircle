// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  return await db.collection("pingpang_personinfo").where({
    openId: event.openId || event.userInfo.openId
  }).update({
    data: event.personInfo||{
      openId: event.openId || event.userInfo.openId,
      name: event.name,
      activities:event.activities,
      avatarUrl: event.avatarUrl,
      level: event.level,
      intergal: event.intergal,
      circle:event.circle,
      context: event.context,
      month:event.month,
      sign:event.sign,
      createcircle:event.createcircle,
      joincircle:event.joincircle,
      city:event.city
    }
  })
}