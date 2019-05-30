const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
// pages/message_detail/message_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    other_id: "",
    other_img: "",
    my_img: "",
    inputBottom: 0,
    send_message: "",
    scrollHeight: '91vh',
    value: "",//用来清除输入框里的内容
    message_id: [],
    message: []
  },
  updateView() {
    this.setData({
      toView: 'msg-' + (this.data.message.length)
    })
  },
  //聚焦输入框时scroll的高度设置
  focus(e) {
    let length = this.data.message.length
    this.setData({
      toView: 'msg-' + (length)
    })
    console.log(length, "focus")
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight - 48) + 'px'
    });
    this.setData({
      inputBottom: keyHeight + 'px'
    })
  },
  blur(e) {
    let length = this.data.message.length - 1
    console.log(this.data.message.length,"blur")
    this.setData({
      scrollHeight: '91vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (length)
    })
  },
  inputContent(e) {
    let length = this.data.message.length
    let _send_message = e.detail.value
    let message = this.data.message
    this.setData({
      send_message: _send_message,
      toView: 'msg-' + (length)
    })
    console.log(length, "inputContent")
  },
  send_message(e) {
    if (this.data.send_message == '')
      return
    let length = this.data.message.length - 1
    let _message = {}
    _message.msg = this.data.send_message
    _message.other_id = this.data.other_id
    let message = this.data.message
    message.push(_message)
    this.setData({
      message: message,
      value: "",
      toView: 'msg-' + (length)
    })
    if (_message == null) return
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'addpingpang_message',
      // 传递给云函数的参数
      data: {
        other_id: this.data.other_id,
        msg: _message.msg
      },
      success: res => {
        console.log(res, 'success')
        this.setData({
          send_message: ''
        })
        _message = null;
      },
      fail: err => {
        console.log("获取留言会话id失败")
        // handle error
      },
      complete: () => {
        console.log("获取留言会话id已完成")
        // ...
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  up_show(){
    let length = this.data.message.length
    this.setData({
      toView: 'msg-' + (length)
    })
  },
  onLoad: function (opts) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(opts)
    this.setData({
      other_id: opts.other_id,
      other_head_image_src: opts.head_image_src,
      my_head_image_src: app.globalData.personInfo.avatarUrl
    })
    let messageList;
    if (opts.message) {
      messageList = opts.message.split(',');
      wx.cloud.callFunction({
        name: 'getpingpang_message',
        data: {
          message: messageList
        }
      }).then(res => {
        let message = this.data.message
        this.setData({
          message: message.concat(res.result)
        })
        let length = this.data.message.length
        this.setData({
          toView: 'msg-' + (length-1)
        })
        wx.hideLoading()
      })
    }
    else {
      this.setData({
        message: []
      })
      wx.hideLoading()
    }
    
    // console.log(length, "onload")

   
    
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