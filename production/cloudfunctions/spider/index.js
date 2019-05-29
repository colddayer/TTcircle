// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const http = require('http')
const cheerio = require('cheerio')
const url = 'http://www.ctta.cn';

function doSpider() {
  http.get(url, (res) => {
    console.log(res)
    // 源源不断收到数据
    let html = '';
    res.on('data', (chunk) => {
      html += chunk;
    })
    // 完毕
    res.on('end', () => {
      const $ = cheerio.load(html);
      const imgs = []
      $('#focus li').each(function () {
        // this 限制第一个参数的选择区域,默认是全局第一个
        const picUrl = $('img', this).attr('src');
        imgs.push(picUrl);
      })
      console.log(imgs)
      return imgs;
    })
  })
  console.log(1)
}
// 云函数入口函数
exports.main = async (event, context) => {
  return doSpider()
}