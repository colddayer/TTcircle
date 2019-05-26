//app.js

App({
  onLaunch: function () {
    let that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: "coldday-67x7r"
      })
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction(
            { name: 'getPersonInfo' }
          ).then(res => {
            this.globalData.personInfo = res.result.data[0]
          })
        }
      }
    })
    this.globalData = {
      personInfo: {
      }
    }
  }
})