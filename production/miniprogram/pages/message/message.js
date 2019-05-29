// pages/messge/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Choose: true,
      TotalMessageNum: 0,
      messageList:[
        { 
          ball_friend_circle_id:"001",
          head_image_src:"../../images/Stone.png",  
          name: "东华理工大学球友圈",
        },
        { 
          ball_friend_circle_id: "002",
          head_image_src:"../../images/Stone.png",  
          name: "江西财经大学球友圈"  
        },
        { 
          ball_friend_circle_id: "003",
          head_image_src:"../../images/Stone.png",  
          name: "华东理工大学球友圈"  
        },
        { 
          ball_friend_circle_id: "004",
          head_image_src:"../../images/Stone.png",  
          name: "南昌大学球友圈"  
        },
        { 
          ball_friend_circle_id: "005",
          head_image_src:"../../images/Stone.png",  
          name: "南昌工学院球友圈",
        },],
      messageList_one:[
      {
        head_image_src:"../../images/Stone.png",
        name: "个人留言",
        num: 3
      },
      {
        head_image_src:"../../images/Stone.png",
        name: "个人留言",
        num: 5
      }],
      currentTab: 0,
      winHeight:0
  },
  switchTab(e) {
    console.log(e);
    let choose = e.currentTarget.dataset.choose;
    this.setData({
      Choose: choose
    })
    this.TotalMessageNum();
  },
  TotalMessageNum() {
    let messageList_one = this.data.messageList_one;
    let totalMessageNum = 0;
    for( let i = 0; i < messageList_one.length; i++){
      totalMessageNum += messageList_one[i].num;
    }
    this.setData({
      TotalMessageNum: totalMessageNum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.TotalMessageNum();
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.TotalMessageNum();
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