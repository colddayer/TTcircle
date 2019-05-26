// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const content=db.collection("pingpang_content")

// 云函数入口函数
exports.main = async (event, context) => {
  let {circleId,_id,id}=event;
  if(circleId){
    return await content.where({
      circleId: circleId
    }).get()
  }else{
    return await content.where({
      _id:_id || id
    }).get()
  }
}