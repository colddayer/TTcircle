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
      personInfo:info,
      level:info.level,
      intergal:info.intergal
    })
    this.setlevel();
  },
  setlevel() {
    // let that=this;
    // wx.cloud.callFunction({
    //   name:"setlevel",
    //   data:{
    //     intergal: that.data.personInfo.intergal
    //   }
    // }).then(res => {
    //   that.setData({
    //     level: res.result
    //   })
    //   app.globalData.personInfo = that.data.personInfo;
    //   })
  
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