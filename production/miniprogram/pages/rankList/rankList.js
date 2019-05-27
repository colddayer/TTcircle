// pages/rankList/rankList.js
Page({
  data: {
    active: false,
    rankList: [
    ],
    hidview: false,
    need:false
  },
  onLoad() {
    wx.showLoading({
      title: '正在加载中',
    })
    wx.cloud.callFunction({
      name: 'getPersonInfo',
      data: {
        all: true
      }
    }).then(res => {
      wx.hideLoading();
      let rankList = res.result.data;
      rankList.sort((a, b) => b.intergal - a.intergal);
      rankList = rankList.map((e, i) => {
        return {
          img: e.avatarUrl,
          number: i + 1,
          nickName: e.name,
          level: e.level,
          score: e.intergal,
          openId: e.openId,
          context:e.context,
          level:e.level
        }
      })
      this.setData({ rankList })
    })
  },
  tapDown(evt) {
    this.setData({ active: evt.currentTarget.id })
  },
  tapEnd(e) {
    setTimeout(() => {
      this.setData({ active: false })
    }, 100)
    this.viewPerson(e)
  },
  viewPerson(evt) {
    let id = evt.currentTarget.dataset.id;
    let rankList = this.data.rankList;
    let index = rankList.find(e=>e.openId == id)
    wx.cloud.callFunction({
      name: 'getpingpang_info',
      data:{
        openId:id
      }
    }).then(res => {
      this.setData({
        hidview: true,
        bat: res.result.data[0].bat,
        behind_rubber: res.result.data[0].behind_rubber,
        infront_rubber: res.result.data[0].infront_rubber,
        phone: res.result.data[0].phone,
        years: res.result.data[0].years,
        name:index.nickName,
        img:index.img,
        context:index.context,
        level:index.level
      })
    })
  },
  hidviewClose() {
    this.setData({
      hidview: false
    })
  }
})