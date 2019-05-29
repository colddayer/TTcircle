const app = getApp()
Page({
  data:{},
  onLoad(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          app.globalData.login = true
        }
      }
    })
    setTimeout(() => {
      wx.switchTab({
        url: '../home/home',
      })
    }, 2000)
  }
})