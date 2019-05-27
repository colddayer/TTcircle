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
  },
  ToPage(event) {
    // console.log(`../${event.currentTarget.dataset.name}/${event.currentTarget.dataset.name}`)
    wx.navigateTo({
      url: `../${event.currentTarget.dataset.name}/${event.currentTarget.dataset.name}`,
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
        changename:false
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
        "personInfo.context": event.detail.value
      })
    }
  },
  onLoad: function(options) {
    let info = app.globalData.personInfo;
    info.context = info.context || "这个人很懒什么都没留下";

    this.setData({
      // "personInfo.name": info.name,
      // "personInfo.intergal": info.intergal,
      // "personInfo.level": info.level,
      // "personInfo.context": info.context || "这个人很懒什么都没留下",
      // "personInfo.avatarUrl": info.avatarUrl
      personInfo:info,
    })
    this.setlevel();
  },
  setlevel() {
    let that=this;
    wx.cloud.callFunction({
      name:"setlevel",
      data:{
        level: that.data.personInfo.level
      }
    }).then(res => {
      that.setData({
        level: res.result
      })
      app.globalData.personInfo = that.data.personInfo;
      })
    
    // console.log(app.globalData.personInfo)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
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
  onPullDownRefresh: function() {
    let personinfo = this.data.personInfo
    wx.cloud.callFunction({
      name: "setPersonInfo",
      data: personinfo
    })
  },
  typeInfo(){
    this.setData({
      changecontext:true
    })
  }
})