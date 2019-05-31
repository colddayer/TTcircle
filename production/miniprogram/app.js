//app.js
const QQMapWX = require('libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'HMGBZ-U5XCX-TUX4Y-ZPUH3-7RRX5-BZBCW'
});
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
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction(
            { name: 'getPersonInfo' }
          ).then(res => {
            this.globalData.personInfo = res.result.data[0];
            wx.getUserInfo({
              lang: "zh_CN",
              success: res => {
                this.globalData.personInfo.name = res.userInfo.nickName;
                this.globalData.personInfo.avatarUrl = res.userInfo.avatarUrl;
                qqmapsdk.reverseGeocoder({
                  success: res => {
                    this.globalData.personInfo.city = res.result.address_component.city;
                    wx.cloud.callFunction(
                      {
                        name: 'setPersonInfo',
                        data: this.globalData.personInfo
                      })
                  },
                })
              }
            })
            wx.cloud.callFunction({
              name: "getpingpang_info",
              success: res => {
                console.log('登录从app.js')
                this.globalData.ping_personInfo = res.result.data[0]
                wx.switchTab({
                  url: '../home/home',
                })
              }
            })
          })
        }
      }
    })
    this.globalData = {
      personInfo: {
      }
    };
    this.timeout = null;
    this.neterror = null;
  }
})