// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const content = db.collection("pingpang_content")

// 云函数入口函数
exports.main = async(event, context) => {
  // rmcirclecontent 表示是否移除圈的动态id
  let {
    rmcirclecontent,
    _id,
    id
  } = event;
  let contentdata = await contennt.where({
    _id: _id || id
  })
  // 移除动态表的动态,可以异步
  contentdata.remove()
  if (rmcirclecontent) {
    // id为移除的动态所在球友圈的id
    let data = await contentdata.get();
    let id = data.data[0].circleId
    // 移除球友圈动态数组中的被删除的动态的id
    let contents = data.data[0].content;
    for(let i =0 ;i<contents.length;i++){
      if(contents[i]==id){
        contents.slice(i,i+1);
        i=1000;
      }
    }
    db.collection("pingpang_circle").update({
      data:{
        content:contents
      }
    })
  }
}