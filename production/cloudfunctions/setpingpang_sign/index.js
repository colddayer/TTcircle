// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const personInfo = db.collection("pingpang_personinfo")

// 云函数入口函数
exports.main = async(event, context) => {
  let data = personInfo.where({
    openId: event.openId || event.userInfo.openId
  })
  let info = await data.get({})
  let sign = info.data[0].sign || []
  if (info.data[0].month != new Date().getMonth()) {
    sign = [];
  }
  return await cloud.callFunction({
    name: "setPersonInfo",
    data: {
      personInfo: {
        sign: sign.concat(event.date || [new Date().getDate()])
      }
    }
  })
}