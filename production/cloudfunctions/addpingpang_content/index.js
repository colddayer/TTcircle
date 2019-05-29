// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const content = db.collection("pingpang_content")
const circle = db.collection("pingpang_circle")
const _ = db.command;
let max_number = 30;

// 云函数入口函数
exports.main = async(event, context) => {
  let contentdata = event.content;
  return await content.add({
    data: {
      // ownerId为动态发送者的openId
      ownerId: contentdata.openId || event.openId || event.userInfo.openId,
      // circleId为动态在哪个球圈发送的球圈Id
      circleId: contentdata.circleId || event.circleId,
      // time为时间戳即发送时间
      time: contentdata.time || event.time || new Date(),
      // content为发送的内容
      content: contentdata.content || event.content,
      // imgUrl为发送的图片地址
      imgUrl: contentdata.imgUrl || event.imgUrl || [],
      // like为点赞者的openId
      like: [],
      // Comment为评论的Id
      Comment: []
    },
    success: res => {
      // 成功后回调将动态的Id加入球圈的contents数组中
      // 先获取球圈
      let circledata = await circle.where({
        circleId: contentdata.circleId || event.circleId
      })
      // 获取球圈的信息
      circledata.get({
        success: resdata => {
          // 获取球圈的动态数组
          let contents = resdata.data[0].contents;
          // 做30条限制
          while (contents.length > max_number) {
            let deletenum = contents.shift();
            cloud.callFunction({
              name: "deletepingpang_content",
              data: {
                _id: deletenum
              }
            })
          }
          // 修改球圈的动态数组信息
          circledata.updata({
            data: {
              contents: contents.concat([res])
            }
          })
        }
      })
    }
  })
}