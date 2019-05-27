// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const fun1=await cloud.callFunction({
    name: "addPersonInfo",
    data: {
      openId:event.userInfo.openId,
      name: event.name ||"未获取到名字",
      avatarUrl: event.avatarUrl,
      city:event.city,//所在城市
      level: "新手0段",
      intergal: 0,
      context: "",
      activitiew:[],
      circle:[]
    }
  })
  const fun2 = await cloud.callFunction({
    name: "addpingpang_info",
    data: {
      openId: event.userInfo.openId,
      phone: "",
      years: "",
      bat: "",
      board: "",
      infront_rubber: "",
      behind_rubber: ""
    }
  })
  return {fun1,fun2}
}