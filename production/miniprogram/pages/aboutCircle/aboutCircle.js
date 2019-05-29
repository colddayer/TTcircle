Page({
  data: {
    aboutCircle: [
      // {
      //   img: '../../images/394.jpg',
      //   text: "东华理工大学球友圈"
      // }
    ],
    hidview:false
  },
  onLoad(opts) {
    console.log(opts)
    let circles = opts.circles.split(',')
    wx.cloud.callFunction({
      name: "getPersonInfo",
      data: {
        openIdarr: circles
      }
    }).then(res => {
      let aboutCircle = res.result.data;
      aboutCircle = aboutCircle.map(e=>{
        return {
          img:e.avatarUrl,
          name:e.name,
          openId:e.openId,
          context:e.context,
          level:e.level
        }
      })
      this.setData({aboutCircle})
    })
  },
  hidviewClose() {
    this.setData({
      hidview: false
    })
  },
  viewInfo(evt) {
    let id = evt.currentTarget.dataset.id;
    let aboutCircle = this.data.aboutCircle;
    let index = aboutCircle.find(e => e.openId == id)
    wx.cloud.callFunction({
      name: 'getpingpang_info',
      data: {
        openId: id
      }
    }).then(res => {
      this.setData({
        hidview: true,
        bat: res.result.data[0].bat,
        behind_rubber: res.result.data[0].behind_rubber,
        infront_rubber: res.result.data[0].infront_rubber,
        phone: res.result.data[0].phone,
        years: res.result.data[0].years,
        name: index.name,
        img: index.img,
        context: index.context,
        level: index.level
      })
    })
  }
})