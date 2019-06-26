Page({
  data:{
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://xhimg.sports.cn/Image/190528/6-1Z52P91420139.jpg',
      news: '中国乒乓球协会与广东品胜宣布开启战略合作'
    }, {
      id: 1,
      type: 'image',
      url: 'http://xhimg.sports.cn/Image/190524/51-1Z524132Z51A.jpg',
      news: '中国乒乓球公开赛 双打变阵只为找到最佳组合'
    }, {
      id: 2,
      type: 'image',
      url: 'http://xhimg.sports.cn/Image/190524/51-1Z524132636364.jpg',
      news: '“乒乒乓乓”奏响中国声音'
    }, {
      id: 3,
      type: 'image',
      url: 'http://xhimg.sports.cn/Image/190517/51-1Z51FU024931.jpg',
      news: '为了国旗国歌的飘、升、奏'
    }, {
      id: 4,
      type: 'image',
      url: 'http://xhimg.sports.cn/Image/190514/6-1Z5140T9422D.jpg',
      news: '中国公开赛｜“5金国乒”再次吹响“集结号”'
    }]
  },
  onLoad(){
    wx.cloud.callFunction({
      name:'spider'
    })
    console.log('!')
  }
})