// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const circledb = db.collection("pingpang_circle")
const _ = db.command;
// 云函数入口函数
exports.main = async(event, context) => {
  let {
    circle, //  球圈对象
    _id,
    id,
    circle_id, //球圈的id
    name, //球圈名
    members, //成员规模
    member, //成员数组
    areana, //球馆名
    table, // 球桌数量
    imgList, //图片
    time, //活动时间
    address, //详细地址
    latitude, //经度
    longitude, //纬度
    introduce, //详情
    applys: applys //申请者数组
  } = event;
  await circledb.where({
    _id: circle_id || circle.circle_id || _id || id
  }).update({
    data: circle || {
      name, //球圈名
      members, //成员规模
      member: member, //成员数组
      areana, //球馆名
      table, // 球桌数量
      imgList, //图片
      time, //活动时间
      address, //详细地址
      latitude, //经度
      longitude, //纬度
      introduce, //详情
      applys: applys //申请者数组
    }
  })
}