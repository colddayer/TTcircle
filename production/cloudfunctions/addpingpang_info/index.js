// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  return  await db.collection("pingpang_info").add({
    data: event.pingpang_info || {
      openId: event.openId,
      phone: event.phone,
      years: event.years,
      bat: event.bat,
      board: event.board,
      infront_rubber: event.infront_rubber,
      behind_rubber: event.behind_rubber
    }
  })
  
}