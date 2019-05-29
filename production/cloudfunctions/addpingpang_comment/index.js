// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  // _id为动态的id
  let content = await db.collection("pingpang_content").where({
    _id: event._id || event.id || event.comment._id || event.comment.id
  });
  // 
  return await content.update({
    data: {
      Comment: _.push([event.comment || {
        openId: event.openId || event.userInfo.openId,
        text: event.text,
        name: event.name,
        avatarUrl: event.avatarUrl
      }])
    }
  })
}