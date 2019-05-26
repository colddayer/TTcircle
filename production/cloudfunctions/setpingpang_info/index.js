// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  return await db.collection("pingpang_info").where({
    openId: event.openId || event.userInfo.openId
  }).update({
    data: event.info || {
      openId: event.openId || event.userInfo.openId,
      activities:event.activities,
      phone: event.phone,
      years: event.years,
      bat: event.bat,
      board: event.board,
      infront_rubber: event.infront_rubber,
      behind_rubber: event.behind_rubber
    }
  })
}