// components/info-user/info-user.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidview: {
      type: Boolean,
      value: false
    },
    img: {
      type: String
    },
    level: {
      type: String
    },
    need: {
      type: Boolean
    },
    context: {
      type: String
    },
    name: {
      type: String
    },
    phone: {
      type: String
    },
    years: {
      type: String
    },
    bat: {
      type: String
    },
    board: {
      type: String
    },
    infront_rubber: {
      type: String
    },
    behind_rubber: {
      type: String
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
  methods: {
    hidviewClose() {
      this.triggerEvent("hidView");
    },
    leaveMessage() {
      this.triggerEvent("message");
    }
  }
})
