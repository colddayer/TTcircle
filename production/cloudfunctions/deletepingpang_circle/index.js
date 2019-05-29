// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const circledb = db.collection("pingpang_circle")

// 云函数入口函数
exports.main = async(event, context) => {
  let {
    circle,
    _id,
    id
  } = event
  return await circledb.where({
    _id: circle._id || circle.id || _id,
    id
  }).remove()
}