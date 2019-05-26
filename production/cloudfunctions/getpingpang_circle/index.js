// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const circledb=db.collection("pingpang_circle")
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  let {circleIdarr,circleId}=event;
  if(circleIdarr){
    return await circledb.where({
      _id:_.in(circleIdarr)
    })
  }else{
    return await circledb.where({
      id:circleId
    })
  }
}