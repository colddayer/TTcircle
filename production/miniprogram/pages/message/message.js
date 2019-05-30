// pages/messge/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Choose: true,
    // TotalMessageNum: 0,
    message: [],
    message_List_id: [],
    message_List_List: [],//留言框列表
    messageList: [],
    currentTab: 0,
    winHeight: 0
  },
  //创建会话
  creat_message(e) {
    let other_id = e.currentTarget.dataset.other_id
    let index = this.data.peopleList.findIndex(e => e.other_id == other_id);
    console.log(index)
    wx.navigateTo({
      url: "../message_detail/message_detail?message=" + this.data.peopleList
      [index].other_message + '&other_id=' + other_id + '&head_image_src=' + this.data.peopleList[index].head_image_src
    })
  },
  jump_date(e) {

    let other_id = e.currentTarget.dataset.index_friend
    wx.navigateTo({
      url: "../friend_date/friend_date?other_id=" + other_id
    })
  },
  switchTab(e) {
    let choose = e.currentTarget.dataset.choose;
    this.setData({
      Choose: choose
    })
    // this.TotalMessageNum();
  },
  onLoad: function (options) {
    console.log(options)
    if (options != true)
    wx.showLoading({
      title: '加载中...',
    })
    let peopleList = [];
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getPersonInfo',
      // 传递给云函数的参数
      data: {
        city: "南昌"
      },
      success: res => {
        let _res = res.result.data
        // console.log(_res, '_res')
        _res = res.result.data.filter((item) => {
          return item.openId != app.globalData.personInfo.openId
        })
        // console.log(_res, 'f_res')
        let messageList = _res.map(member => {
          return {
            ball_friend_id: member.openId,
            head_image_src: member.avatarUrl,
            name: member.name
          }
        })
        this.setData({
          messageList: messageList
        })
      },
      fail: err => {
        console.log("失败")
        // handle error
      },
      complete: () => {
        console.log("获取南昌区域球友已完成")
        // wx.hideLoading()
        // ...
      }
    })

    wx.cloud.callFunction({
      name: 'getpingpang_dialogue'
    }).then(res => {
      // console.log(peopleList, '+++++++++++++++++++++++')
      // console.log(res.result.data, "-----------peopleList1")
      peopleList = res.result.data.map(item => {
        // console.log(item, '-------item')
        return {
          other_id: item.other_id,
          other_message: item.message
        }
      })
      // console.log(peopleList, "peopleList2")
      let peopleIdlist = peopleList.map(item => {
        return item.other_id
      })
      console.log(peopleIdlist, "++++++")

      wx.cloud.callFunction({
        name: 'getPersonInfo',
        data: {
          openIdarr: peopleIdlist
        }
      }).then(res => {

        // let _res = res.result.data.filter((item) => {
        //   return item.openId != app.globalData.personInfo.openId
        // })
        let _res = res.result.data;
        console.log(_res)
        _res.forEach((item, index) => {
          for (let i = 0; i < peopleList.length; i++) {
            if (peopleList[i].other_id == item.openId) {
              peopleList[i].head_image_src = item.avatarUrl,
                peopleList[i].name = item.name
            }
          }
        })

        this.setData({
          peopleList
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      })
    })
  },
  onPullDownRefresh() {
    let noloading = true;
    this.onLoad(noloading);
  }
})