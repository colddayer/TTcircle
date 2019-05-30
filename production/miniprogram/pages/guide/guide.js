const app = getApp()
Page({
  data: {
    login: false
  },
  getUserInfo(e) {
    if (e.detail.userInfo) {
      let the_first = false;
      // 掉用获取用户信息函数，用openId作为唯一标识符
      wx.cloud.callFunction({
        name: "getPersonInfo",
      }).then(res => {
        // 判断是否为空，空则代表第一次进入
        if (res.result.data.length == 0) {
          the_first = true
        } else {

          app.globalData.personInfo = res.result.data[0];
          console.log(app.globalData.personInfo);
          wx.cloud.callFunction({
            name: "getpingpang_info",
            success: res => {
              console.log('登录成功')
              if (res.result.data.length != 0) {
                console.log(res.result.data)
                app.globalData.ping_personInfo = res.result.data[0]
                wx.setStorage({
                  key: 'login',
                  data: true
                })
                wx.switchTab({
                  url: '../home/home',
                })
              }
              else {
                console.log(123)
                app.globalData.ping_personInfo = {
                  phone: '***********',
                  years: '0年',
                  bat: '右手横拍',
                  board: '新手用具',
                  infront_rubber: '新手用具',
                  behind_rubber: '新手用具',
                }
                wx.cloud.callFunction({
                  name: "addpingpang_info",
                  data: {
                    pingpang_info: app.globalData.ping_personInfo
                  }
                }).then(res => {
                  wx.setStorage({
                    key: 'login',
                    data: true
                  })
                  wx.switchTab({
                    url: '../home/home',
                  })
                })
              }
            }
          })
        }
      }).then(() => {
        // 进入注册流程，
        return new Promise((resolve, reject) => {
          if (the_first) {
            // 获取用户的信息
            wx.getUserInfo({
              lang: "zh_CN",
              success: res => {
                app.globalData.userInfo = res.userInfo;
                resolve();
              },
            })
          }
        })
      }).then(() => {
        if (the_first) {
          // 用户注册所需昵称和头像
          const data = {
            name: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl,
            city: app.globalData.userInfo.city,
          };
          // 显示加载
          wx.showLoading({
            title: '授权登录中',
          })
          // 用户注册函数，除了昵称和头像，全置为最低或空
          wx.cloud.callFunction({
            name: "pingpang_init",
            data: data
          }).then(res => {
            // 数据库已经注册完成
            console.log("注册完成")
          })
            .then(() => {
              // 注册完成后获取一遍用户信息
              wx.cloud.callFunction({
                name: "getPersonInfo"
              }).then(res => {
                app.globalData.personInfo = res.result.data[0];
                console.log(res.result.data[0])
                // 隐藏加载
              
                app.globalData.ping_personInfo = {
                  phone: '***********',
                  years: '0年',
                  bat: '右手横拍',
                  board: '新手用具',
                  infront_rubber: '新手用具',
                  behind_rubber: '新手用具',
                }
                wx.cloud.callFunction({
                  name: "addpingpang_info",
                  data: {
                    pingpang_info: app.globalData.ping_personInfo
                  }
                })

                wx.hideLoading();
                // 提示注册完成
                // wx.showModal({
                //   title: '注册',
                //   content: '注册完成',
                // })
                wx.setStorage({
                  key: 'login',
                  data: true
                })
                wx.switchTab({
                  url: '../home/home',
                })
              })
            })
        }
      })
    }
  },
  onLoad() {
    wx.getStorage({
      key: 'login',
      success: res => {
        this.setData({
          login: res.data
        })
      },
    })
    setTimeout(()=>{
    }, 10000)
  },
  // settingInfo() {
  //   this.setData({
  //     login: true
  //   })
  //   wx.setStorage({
  //     key: 'login',
  //     data: this.data.login
  //   })
  //   let the_first = false;
  //   // 掉用获取用户信息函数，用openId作为唯一标识符
  //   wx.cloud.callFunction({
  //     name: "getPersonInfo",
  //   }).then(res => {
  //     // 判断是否为空，空则代表第一次进入
  //     if (res.result.data.length == 0) {
  //       the_first = true
  //     } else {

  //             app.globalData.personInfo = res.result.data[0];
  //             console.log(app.globalData.personInfo);
  //             wx.cloud.callFunction({
  //               name: "getpingpang_info",
  //               success: res => {
  //                 console.log('登录成功')
  //                 if (app.globalData.ping_personInfo)
  //                   app.globalData.ping_personInfo = res.result.data[0]
  //                 wx.switchTab({
  //                   url: '../home/home',
  //                 })
  //               }
  //             })
  //           }
  //   }).then(() => {
  //     // 进入注册流程，
  //     return new Promise((resolve, reject) => {
  //       if (the_first) {
  //         // 获取用户的信息
  //         wx.getUserInfo({
  //           lang: "zh_CN",
  //           success: res => {
  //             app.globalData.userInfo = res.userInfo;
  //             resolve();
  //           },
  //         })
  //       }
  //     })
  //   }).then(() => {
  //     if (the_first) {
  //       // 用户注册所需昵称和头像
  //       const data = {
  //         name: app.globalData.userInfo.nickName,
  //         avatarUrl: app.globalData.userInfo.avatarUrl,
  //         city: app.globalData.userInfo.city,
  //       };
  //       // 显示加载
  //       wx.showLoading({
  //         title: '注册中',
  //       })
  //       // 用户注册函数，除了昵称和头像，全置为最低或空
  //       wx.cloud.callFunction({
  //         name: "pingpang_init",
  //         data: data
  //       }).then(res => {
  //         // 数据库已经注册完成
  //         console.log("注册完成")
  //       })
  //         .then(() => {
  //           // 注册完成后获取一遍用户信息
  //           wx.cloud.callFunction({
  //             name: "getPersonInfo"
  //           }).then(res => {
  //             app.globalData.personInfo = res.result.data[0];
  //             console.log(res.result.data[0])
  //             // 隐藏加载
  //             wx.hideLoading();
  //             // 提示注册完成
  //             wx.showModal({
  //               title: '注册',
  //               content: '注册完成',
  //             })
  //             wx.switchTab({
  //               url: '../home/home',
  //             })
  //           })
  //         })
  //     }
  //   })


  // }
})