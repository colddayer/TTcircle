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
    wx.getStorage({
      key: 'signArr',
      success: (res) => {
        let continuity = this.searchContinuity(res.data)
        this.setData({
          arr: res.data,
          year: date.year,
          month: date.month,
          total: res.data.length,
          continuity
        })
      },
      fail: () => {
        const date = this.getDate();
        let arr = this.data.arr;
        this.setData({
          arr,
          year: date.year,
          month: date.month,
          total: arr.length,
          continuity: this.searchContinuity(arr)
        })
      }
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
          wx.showToast({
            title: '签到成功，积分增加20！',
            icon: 'none'
          })
        }
      })
    }
  },
  onUnload() {
    wx.setStorageSync('signArr', this.data.arr)
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
    return { month, year }
  }
})