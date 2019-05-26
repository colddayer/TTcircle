// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  return await db.collection("pingpang_personinfo").add({
    data: event.personinfo || {
      openId: event.openId,
      name: event.name,
      avatarUrl: event.avatarUrl,
      // level是数值
      level: event.level,
      intergal: event.intergal,
      context: event.context,
      month:new Date().getMonth(),
      sign:[],
      createcircle:[],
      joincircle:[]
    }
  })
}