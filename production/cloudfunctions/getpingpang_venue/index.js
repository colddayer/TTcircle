// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db=cloud.database();
const venuedb=db.collection("pingpang_venue");
const _=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  let { latitude, longitude, latitudearr, longitudearr,city,address}=event;
  if(city)
  return await venuedb.where({city}).get()
  if(address)
    return await venuedb.where({ address }).get()
  // if(latitudearr&&longitudearr)
  // {
  //   return await venuedb.where({
  //     latitude:_.in(latitudearr),
  //     longitude:_.in(longitudearr)
  // }).get()
  // } else if(city){
  //   return await venuedb.where({
  //     city
  // }).get()
  // }else{
  //   return await venuedb.where({
  //     latitude,
  //     longitude
  //   }).get()
  // }
}