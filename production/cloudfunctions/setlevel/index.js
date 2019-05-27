// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const continuitys = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 8
}

// 云函数入口函数
exports.main = async (event, context) => {
  let continuity = event.continuity;
  let add = continuitys[continuity] || 10;
  console.log(add)
  let intergal = event.intergal + add * 2;
  if (intergal < 400) {
    let level = parseInt(add / 30);
    level = level > 10 ? 10 : level;
    level = '新人' + level + '段'
    return {
      intergal,
      level
    }
  }
  if (intergal < 2500) {
    level = parseInt((intergal - 400) / 200) + 1;
    level = level > 10 ? 10 : level;
    level = '业余' + level + '段'
    return {
      intergal,
      level
    }
  }
  if (intergal >= 2500) {
    level = parseInt((intergal - 2500) / 300) + 1;
    level = level > 10 ? 10 : level;
    level = '达人' + level + '段'
    return {
      intergal,
      level
    }
  }
}