Page({
  data: {
    header: false,
    signned: false,
    arr: [
      {
        month: "current",
        day: '1',
        color: '#fff',
        background: '#123456',
        yue:4
      },
      {
        month: "current",
        day: '2',
        color: '#fff',
        background: '#123456',
        yue:4
      },
      {
        month: "current",
        day: '3',
        color: '#fff',
        background: '#123456',
        yue:4
      }
    ]
  },
  dayClick(evt) {
    let day = new Date().getDate();
    if (day != evt.detail.day) {
      wx.showToast({
        title: '请选择正确日期',
        icon: 'none',
        duration: 500
      })
      return
    }
    if(this.data.signned){
      wx.showToast({
        title: '今天已经签过到了',
        icon: 'none',
        duration: 500
      })
      return
    }
    const date = [
      ...this.data.arr,
      {
        month: 'current',
        day: evt.detail.day,
        color: '#fff',
        background: '#123456',
        yue:4
      }
    ]
    this.setData({
      arr: date,
      signned:true
    })
    wx.showToast({
      title: '签到成功,获得20积分',
      icon: 'none',
      duration: 500
    })
  }
})