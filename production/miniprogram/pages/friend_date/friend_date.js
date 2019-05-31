// miniprogram/pages/friend_date/friend_date.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: false,
    // ball_friend_id:"",
    my_id: "",
    other_id: "0",
    avatarUrl: "",
    level: "",
    context: "",
    name: "",
    phone: "",
    years: "",
    bat: "",
    board: "",
    infront_rubber: "",
    behind_rubber: "",
    creat_message:'creat_message'
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  creat_message() {
    // console.log(this.data.other_id, "++++++++++++++++")
    this.setData({
      creat_message:'',
    })
    setTimeout(()=>{
      this.setData({
        creat_message: 'creat_message',
      })
      console.log('ok')
    },3000)
    wx.cloud.callFunction({
      name: 'getpingpang_dialogue',
      data: {
        my_id: app.globalData.personInfo.openId,
        other_id: this.data.other_id
      }
    }).then(res => {
      // console.log(res, "---------------")
      if (res.result.data.length != 0) {
        // console.log(res.result.data.length)
        // console.log(this.data.other_id, "+1+1+1")
        wx.navigateTo({
          url: "../message_detail/message_detail?message=" + res.result.data[0].message + '&other_id=' + this.data.other_id + '&head_image_src=' + this.data.avatarUrl
        })
      }
      else {
        // console.log(this.data, "+2=2+2")
        wx.cloud.callFunction({
          name: 'addpingpang_dialogue',
          data: {
            my_id: app.globalData.personInfo.openId,
            other_id: this.data.other_id
          }
        })
        wx.cloud.callFunction({
          name: 'addpingpang_dialogue',
          data: {
            my_id: this.data.other_id,
            other_id: app.globalData.personInfo.openId
          }
        }).then(res => {
          wx.navigateTo({
            url: '../message_detail/message_detail?other_id=' + this.data.other_id,
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      other_id: options.other_id
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getPersonInfo',
      // 传递给云函数的参数
      data: {
        // openId: options.ball_friend_id
        openId: options.other_id
      },
      success: res => {
        let _res = res.result.data[0]
        this.setData({
          avatarUrl: _res.avatarUrl,
          level: _res.level,
          context: _res.context,
          name: _res.name,
        })
        // console.log(this.data.)
        console.log("获取球友详情页成功")
      },
      fail: err => {
        console.log("获取球友详情页失败")
        // handle error
      },
      complete: () => {
        console.log("获取球友详情页已完成")
        wx.hideLoading()
      }

    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getpingpang_info',
      // 传递给云函数的参数
      data: {
        // openId: options.ball_friend_id
        openId: options.other_id
      },
      success: res => {
        // console.log(res);
        let _res = res.result.data[0]
        // console.log(_res, "555555555555555")
        this.setData({
          phone: _res.phone,
          years: _res.years,
          bat: _res.bat,
          board: _res.board,
          infront_rubber: _res.infront_rubber || "初级胶皮",
          behind_rubber: _res.behind_rubber || "初级胶皮",
        })
      },
      fail: err => {
        console.log("失败")
        // handle error
      },
      complete: () => {
        console.log("已完成")
        // ...
      }

    })
    // console.log(options.ball_friend_id) 
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