// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const venuedb = db.collection("pingpang_venue")

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    venue, //球馆对象
    areana, //球馆名
    table, // 球桌数量
    imgListt, //图片
    time, //活动时间
    address, //详细地址
    latitude, //经度
    longitude, //纬度
    city, //所在城市
  } = event;
  const res = await cloud.callFunction({
    name: 'getpingpang_venue',
    data: {
      address: venue.address
    }
  })
  console.log(res)
  if (res.result.data.length != 0) {
    let venue_res = res.result.data[0];
    console.log(venue_res)
    return await venuedb.doc(venue_res._id).update({
      data: {
        circles: venue_res.circles.concat([event.userInfo.openId])
      }
    })
  }
  else {
    venue.circles = [event.userInfo.openId]
    return await venuedb.add({
      data: venue || {
        areana: venue.areana || areana, //球馆名
        table: venue.table || table, // 球桌数量
        imgList: venue.imgList || imgList, //图片
        time: venue.time || time, //活动时间
        address: venue.address || address, //详细地址
        latitude: venue.latitude || latitude, //经度
        longitude: venue.longitude || longitude, //纬度
        city: venue.city || city, //所在城市
        circles: [event.userInfo.openId], //球馆中包含的球圈
        fileId: venue.fileId || fileId //图片Id
      }
    })
  }
}