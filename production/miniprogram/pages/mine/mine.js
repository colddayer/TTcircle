// pages/mine/mine.js
const app = getApp();
Page({
  data: {
    waitfordone: 0,
    level: "查询中",
    infocard: {
      like: 0,
      attention: 0,
      fans: 0
    },
    changecontext: false,
    changename: false,
    hidview: false
  },
  ToPage(event) {
    wx.navigateTo({
      url: `../${event.currentTarget.dataset.name}/${event.currentTarget.dataset.name}`,
      fail: () => {
        wx.showModal({
          title: '(ಥ_ಥ)',
          content: '敬请期待！',
          showCancel: false
        })
      }
    })
  },
  changecontext() {
    this.setData({
      changecontext: true
    })
  },
  setname(event) {
    if (event.detail.value != "")
      this.setData({
        "personInfo.name": event.detail.value,
        changename: false,
        name: event.detail.value
      })
  },
  changename() {
    this.setData({
      changename: true
    })
  },
  setcontext(event) {
    this.setData({
      changecontext: false
    })
    if (event.detail.value != "") {
      this.setData({
        "personInfo.context": event.detail.value,
        context: event.detail.value
      })
    }
    else {
      this.setData({
        "personInfo.context": "这家伙打完球后不留任何足迹",
        context: "这家伙打完球后不留任何足迹"
      })
    }
  },
  onLoad: function (options) {
    let info = app.globalData.personInfo;
    info.context = info.context || "这个人很懒什么都没留下";
    this.setData({
      personInfo: info,
      level: info.level,
      intergal: info.intergal,
      context: app.globalData.personInfo.context,
      phone: app.globalData.ping_personInfo.phone,
      years: app.globalData.ping_personInfo.years,
      bat: app.globalData.ping_personInfo.bat,
      board: app.globalData.ping_personInfo.board,
      infront_rubber: app.globalData.ping_personInfo.infront_rubber,
      behind_rubber: app.globalData.ping_personInfo.behind_rubber,
      img: app.globalData.personInfo.avatarUrl,
      name: app.globalData.personInfo.name
    })
  },
  onShow() {
    this.setData({
      phone: app.globalData.ping_personInfo.phone,
      years: app.globalData.ping_personInfo.years,
      infront_rubber: app.globalData.ping_personInfo.infront_rubber,
      behind_rubber: app.globalData.ping_personInfo.behind_rubber,
      bat: app.globalData.ping_personInfo.bat,
      board: app.globalData.ping_personInfo.board
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let personinfo = this.data.personInfo
    wx.cloud.callFunction({
      name: "setPersonInfo",
      data: personinfo
    })
  },
  onUnload: function () {
    let personinfo = this.data.personInfo
    wx.cloud.callFunction({
      name: "setPersonInfo",
      data: personinfo
    })
  },
  onPullDownRefresh: function () {
    let personinfo = this.data.personInfo
    wx.cloud.callFunction({
      name: "setPersonInfo",
      data: personinfo
    })
  },
  typeInfo() {
    this.setData({
      changecontext: true
    })
  },
  hidviewClose() {
    this.setData({
      hidview: false
    })
  },
  viewInfo() {
    this.setData({
      hidview: true
    })
  }
})