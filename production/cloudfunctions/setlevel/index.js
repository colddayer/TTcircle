// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let ranks = {
  0: "新手",
  1: "业余",
  2: "达人"
}

// 云函数入口函数
exports.main = async (event, context) => {
    let number = event.level / 10;
    let rank = Math.floor(number);
    let score = event.level % 10;
    if (Math.round(number) === number) {
      rank--;
      score = 10;
    }
    return ranks[rank] + score + "段";
}