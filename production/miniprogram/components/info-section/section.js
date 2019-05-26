// components/info-section/section.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "属性名"
    },
    info: {
      type: String,
      value: "属性值"
    },
    infoname: {
      type: String,
      value: ""
    },
    isbottom: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    changeinfo: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeinfo() {
      this.setData({
        changeinfo: true
      })
      this.triggerEvent("changeinfo");
    },
    changend(event) {
      this.setData({
        changeinfo: false
      })
      getApp().globalData.ping_personInfo[this.properties.infoname] = event.detail.value
      this.triggerEvent("changend")
    }
  }
})