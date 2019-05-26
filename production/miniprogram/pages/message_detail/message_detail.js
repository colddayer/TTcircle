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
    other_id: "id_1",
    my_id: "id_2",
    inputBottom: 0,
    send_message: "",
    scrollHeight: '91vh',
    value:"",//用来清除输入框里的内容
    message:[
      {
        other_id: "id_1",
        my_id:"id_2",
        msg: "圈主您好,我想加入您的乒乓圈,已经申请了,请同意下好吗？谢谢！"
      },
      {
        other_id: "id_2",
        my_id: "id_1",
        msg: "好的，这就同意你的申请."
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的"
      },
      {
        other_id: "id_2",
        my_id: "id_1",
        msg: "好的，这就同意你的申请."
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的7"
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的6"
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的5"
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的4"
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的3"
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的2"
      },
      {
        other_id: "id_1",
        my_id: "id_2",
        msg: "好的1"
      }
    ]
  },
  updateView(){
    this.setData({
      toView: 'msg-' + (this.data.message.length)
    })
  },
  focus(e){
    let length = this.data.message.length
    keyHeight = e.detail.height;
    console.log(windowHeight);
    // console.log(e.datail);
    console.log(keyHeight)
    this.setData({
      scrollHeight: (windowHeight - keyHeight - 48 ) + 'px'
    });
    console.log(this.data.scrollHeight)
    this.setData({
      toView: 'msg-'+ (length),
      inputBottom: keyHeight + 'px'
    })
  },
  blur(e) {
    let length = this.data.message.length - 1
    this.setData({
      scrollHeight: '91vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (length)
    })
  },
  inputContent(e){
    let length = this.data.message.length
    console.log(e.detail.value)
    let _send_message = e.detail.value
    let message = this.data.message
    this.setData({
      send_message : _send_message,
      toView: 'msg-' + (length)
      })
  },
  send_message(e){
    let length = this.data.message.length - 1
    let _message = {}
    _message.msg = this.data.send_message
    _message.other_id = this.data.other_id
    _message.my_id = this.data.my_id
    let message = this.data.message
    message.push(_message) 
    this.setData({
      message : message,
      value:"",
      toView: 'msg-' + (length)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      toView: 'msg-' + (this.data.message.length - 1)
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