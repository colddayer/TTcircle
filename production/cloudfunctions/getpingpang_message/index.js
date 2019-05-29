// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const messagedb = db.collection("pingpang_messageS")
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  let {
    my_id,
    other_id
  } = event;
  let data1 = await messagedb.where({
    my_id,
    other_id
  })
  let data2 = await messagedb.where({
    my_id: other_id,
    other_id: my_id
  })
  let data = data1.data.concat(data2.data);
  let deletearr=[]
  data = data.sort((a, b) => {
    return b.time - a.time;
  })
  while (data.length > 50) {
     deletearr.push(data.shift()._id)
  }
  await messagedb.where({
    _id:_.in(deletearr)
  }).remove()
  return data;
}