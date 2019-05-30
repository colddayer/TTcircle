const app = getApp()
Page({
  data: {
    aboutCircle: [
      // {
      //   img: '../../images/394.jpg',
      //   text: "东华理工大学球友圈"
      // }
    ],
    hidview: false,
    need: true
  },
  message(){
    wx.cloud.callFunction({
      name: 'getpingpang_dialogue',
      data: {
        my_id: app.globalData.personInfo.openId,
        other_id: this.data.other_id
      }
    }).then(res => {
      if (res.result.data.length != 0) {
        wx.navigateTo({
          url: "../message_detail/message_detail?message=" + res.result.data[0].message + '&other_id=' + this.data.other_id + '&head_image_src=' + this.data.img
        })
      }
      else {
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
  onLoad(opts) {
    console.log(opts)
    let circles = opts.circles.split(',')
    wx.cloud.callFunction({
      name: "getPersonInfo",
      data: {
        openIdarr: circles
      }
    }).then(res => {
      let aboutCircle = res.result.data;
      aboutCircle = aboutCircle.map(e => {
        return {
          img: e.avatarUrl,
          name: e.name,
          openId: e.openId,
          context: e.context,
          level: e.level
        }
      })
      this.setData({ aboutCircle })
    })
  },
  hidviewClose() {
    this.setData({
      hidview: false
    })
  },
  viewInfo(evt) {
    let id = evt.currentTarget.dataset.id;
    if (id != app.globalData.personInfo.openId) {
      let aboutCircle = this.data.aboutCircle;
      let index = aboutCircle.find(e => e.openId == id)
      wx.cloud.callFunction({
        name: 'getpingpang_info',
        data: {
          openId: id
        }
      }).then(res => {
        this.setData({
          hidview: true,
          bat: res.result.data[0].bat,
          behind_rubber: res.result.data[0].behind_rubber,
          infront_rubber: res.result.data[0].infront_rubber,
          phone: res.result.data[0].phone,
          years: res.result.data[0].years,
          name: index.name,
          img: index.img,
          context: index.context,
          level: index.level,
          need:true,
          other_id:index.openId
        })
      })
    }
    else{
      this.setData({
        hidview: true,
        bat: app.globalData.ping_personInfo.bat,
        behind_rubber: app.globalData.ping_personInfo.behind_rubber,
        infront_rubber: app.globalData.ping_personInfo.infront_rubber,
        phone: app.globalData.ping_personInfo.phone,
        years: app.globalData.ping_personInfo.years,
        name: app.globalData.personInfo.name,
        img: app.globalData.personInfo.avatarUrl,
        context: app.globalData.personInfo.context,
        level: app.globalData.personInfo.level,
        need:false
      })
    }
  }
})