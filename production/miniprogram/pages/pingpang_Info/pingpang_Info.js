const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: {},
    picker: ['右手横拍', '右手直拍', '左手横拍','左手直拍']
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
    })
    app.globalData.ping_personInfo.bat = this.data.picker[this.data.index]
  },
  getinfo() {
    this.setData({
      personInfo: app.globalData.ping_personInfo, 
    })
  },
  submit() {
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
        duration:1000,
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