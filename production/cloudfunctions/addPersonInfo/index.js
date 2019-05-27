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
      level: event.level,
      intergal: event.intergal,
      context: event.context,
      city:event.city,//所在城市
      month:new Date().getMonth(),
      sign:[],//签到
      createcircle:[],//创建的球圈Id数组
      joincircle:[],//加入的球圈Id数组
      message:[]//申请加入球圈的回复
    }
  })
}