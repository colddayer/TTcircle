// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const circledb = db.collection("pingpang_circle")
const personInfo = db.collection("pingpang_personinfo");
const _=db.command;

// 云函数入口函数
exports.main = async(event, context) => {
  let {
    circle, //  球圈对象
    openId: createId, //创建者Id
    name, //球圈名
    members, //成员规模
    areana, //球馆名
    table, // 球桌数量
    imgList, //图片
    time, //活动时间
    address, //详细地址
    latitude, //经度
    longitude, //纬度
    introduce //详情
  } = event;
  if (!createId) {
    let createId = event.userInfo.openId
  }
  try{
    let newcircle_id = await circledb.add({
    data: circle || {
      createId, //创建者Id
      name, //球圈名
      members, //成员规模
      member:[],//成员数组
      areana, //球馆名
      table, // 球桌数量
      imgList, //图片
      time, //活动时间
      address, //详细地址
      latitude, //经度
      longitude, //纬度
      introduce, //详情
      applys:[] //申请者数组
    }
  });
  }catch(error){
    return error
  }
  const persondb = await db.collection("pingpang_personinfo").where({
    openId: createId
  })
  await persondb.update({
    data:{
      createcircle: _.push([newcircle_id._id])
    }
  })
  return newcircle_id
}