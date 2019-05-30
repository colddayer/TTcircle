const app = getApp();
Page({
  data: {
    header: false,
    signned: false,
    total: 0,
    continuity: 0,
    arr: []
  },
  onLoad() {
    const date = this.getDate();
    const arr = app.globalData.personInfo.sign;
    let continuity = this.searchContinuity(arr)
    this.setData({
      arr: arr,
      year: date.year,
      month: date.month,
      total: arr.length,
      continuity
    })
  },
  onReady() {
    const arr = this.data.arr;
    if (arr.length == 0 || arr[arr.length - 1].day != new Date().getDate()) {
      wx.showModal({
        content: '签个到呗(◕ᴗ◕✿)',
        showCancel: false,
        success: () => {
          let date = new Date();
          let arr = this.data.arr;
          let yue = date.getMonth();
          arr.push({
            month: "current",
            day: date.getDate(),
            color: '#fff',
            background: '#728EFF',
            yue
          })
          let continuity = this.searchContinuity(arr)
          this.setData({
            arr,
            total: arr.length,
            continuity
          })
          wx.cloud.callFunction({
            name: "setlevel",
            data: {
              continuity: continuity,
              intergal: app.globalData.personInfo.intergal
            }
          }).then(res => {
            app.globalData.personInfo.intergal = res.result.intergal;
            app.globalData.personInfo.level = res.result.level;
            app.globalData.personInfo.signned = new Date().getDate();
            wx.cloud.callFunction({
              name: 'setPersonInfo',
              data: app.globalData.personInfo
            }).then(res => {
              wx.showToast({
                title: `签到成功，积分增加!`,
                icon: 'none'
              })
            })
          })
        }
      })
    }
  },
  searchContinuity(arr) {
    let count = arr.length == 0 ? 0 : 1;
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i].day - arr[i - 1].day == 1)
        count++;
      else
        break;
    }
    return count;
  },
  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = {
      "1": "Jan",
      "2": "Feb",
      "3": "Mar",
      "4": "Apr",
      "5": "May",
      "6": "June",
      "7": "July",
      "8": "Aug",
      "9": "Sept",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec"
    }[month];
    return {
      month,
      year
    }
  }
})