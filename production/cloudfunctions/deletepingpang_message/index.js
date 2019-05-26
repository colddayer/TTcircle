// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const messagedb=db.collection("pingpang_message")

// 云函数入口函数
exports.main = async (event, context) => {
  let {_id,id}=event;
  return await messagedb.where({
    _id:_id||id
  }).remove();
}