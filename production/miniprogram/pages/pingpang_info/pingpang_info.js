const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: {
    },
    picker: ['右手横拍', '右手直拍', '左手横拍', '左手直拍']
  },
  PickerChange(e) {
    let personInfo = this.data.personInfo;
    this.setData({
      index: e.detail.value
    })
    personInfo.bat = this.data.picker[this.data.index];
    this.setData({personInfo})
  },
  PickerAgeChange(e) {
    let personInfo = this.data.personInfo;
    this.setData({
      indexAge: e.detail.value
    })
    personInfo.years = this.data.pickerAge[this.data.indexAge];
    this.setData({personInfo})
  },
  getinfo() {
    this.setData({
      personInfo: app.globalData.ping_personInfo,
    })
  },
  submit() {
    let personInfo = this.data.personInfo;
    if(personInfo.phone.length != 11){
      wx.showModal({
        title: '提示',
        content: '无效电话号码',
        showCancel:false
      })
      personInfo.phone = '';
      this.setData({
        personInfo
      })
      return
    }
      const that = this;
    console.log("开始提交")
    wx.showLoading({
      title: '提交中',
    })
    let info = this.data.personInfo
    wx.cloud.callFunction({
      name: "setpingpang_info",
      data: info
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: "提交成功",
        duration: 1000,
      })
      console.log(res, "修改成功")
      wx.navigateBack({

      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      personInfo: app.globalData.ping_personInfo
    })
    let pickerAge = []
    for (let i = 0; i < 51; i++) {
      pickerAge.push(i + '年')
    }
    this.setData({ pickerAge })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})