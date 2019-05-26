// components/person-info/person-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openId: {
      type: String,
      observer(newdata) {
        wx.cloud.callFunction({
          name: "getPersonInfo",
          data: {
            openId
          }
        }).then((res)=>{
          this.setData({
            personinfo:res.result.data[0]
          })
          return new Promise((resolve,reject)=>{
            wx.cloud.callFunction({
              name: "getpingpang_info",
              data: {
                openId
              }
            }).then((res)=>{
              resolve(res)
            })
          }).then(res=>{
            this.setData({
              pingpang_info: res.result.data[0]
            })
          })
        })
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {}
})