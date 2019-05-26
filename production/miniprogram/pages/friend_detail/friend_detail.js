// pages/friend_detail/friend_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_Time: "2019年5月16日",
    choose_Id:'',//设置被选择的项目的ID
    choose_Index:'',//设置被选中的项目的索引
    show_More: false,//设置更多评论中的悬浮框的展示
    overtimeList:[],//页面渲染的数据
    pageNum: 0,//第几页或者从第几条数据开始（这里是根据后台接口的条件，选择第二种）
    sayloading: '',//上拉的文字显示
    show_More_Content: 6,
    //屏幕滚动，上拉加载和下拉刷新
    // windowwHeight: 0,//屏幕高度
    // refreshHeight: 0,//获取高度
    // refreshing: false,//是否在刷新中
    // refreshAnimation:{},//加载更多旋转动画数据
    // clientY:0,//触摸时Y轴坐标

  },
  //下拉刷新
  show_more_content(){
      let _this = this.data.show_More_Content
      if (_this == 6){
        _this = 20
      }else {
        _this = 6
      }
      this.setData({
        show_More_Content: _this
      })
  },
  onPullDownRefresh: function() {
    this.setData({
        pageNum: 0,
        sayloading: ""
    })
    this.init();//初始化页面的接口请求
    wx.stopPullDownRefresh();//关闭下拉刷新
  },

  onReachBottom:function (){
    let pageNum = this.data.pageNum;
    pageNum = pageNum + 10
    this.setData({
      pageNum: pageNum,
      sayloading: "数据加载中..."
    })
    this.init();
    wx.hideLoading();//隐藏加载框
  },
  init: function () {
    wx.request({
      url: getApp().data.service_url + 'https://www.easy-mock.com/mock/5ce4f9e27a7d8b22a361525d/friend/pingpangquan',
      data: {
        id: getApp().data.id++,
        sign: "666666",
        sessionId: wx.getStorageSync('sessionId'),
        pageNum: this.data.pageNum,    //第几条数据，每次+10（上拉加载方法中）
        pageSize: '10',     //每页显示10条数据
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var overtimeListArr = this.data.overtimeList;
        for (var i = 0; i < res.data.data.overtimeList.length; i++) {
          overtimeListArr.push(res.data.data.overtimeList[i])
        }
        if (this.data.pageNum == 0) {    //下拉刷新
          this.setData({
            overtimeList: res.data.data.overtimeList,
          })
        } else {
          this.setData({
            overtimeList: overtimeListArr,
          })
        }
        if (res.data.data.overtimeList.length <= 0) {
          this.setData({
            sayloading: '没有更多数据了…^_^'
          })
        }
      }
    })
  },
  
  scroll(e){
    console.log("scroll");
  },
  select_like(e){
    // console.log(e);
    let that = this.data;
    var content_id = e.currentTarget.dataset.id;

    for(let i = 0; i < that.Content.length; i++){
      if (content_id == that.Content[i].content_id){
        //处理对于喜欢的数量的控制与更新
        let like_number = that.Content[i].like;
        if (that.Content[i].you_like) {
          like_number--;
        }else {
          like_number++;
        }
        //处理好喜欢被选择的逻辑
        let your_like = !that.Content[i].you_like;
        let like = "Content[" + i + "].you_like";
        let number = "Content[" + i + "].like";

        this.setData({
          [like] : your_like,
          [number]: like_number
        })
      }
    }
    
  },
  start_fn(){
    console.log("start");
  },
  end_fn(){
    console.log("end");
  },
  showMember(){
  
  },
  show_more(e){
    console.log(e);
    let that = e.currentTarget.dataset;
    let choose_id = that.id;
    let choose_index = that.index;
    console.log(choose_id);
    console.log(choose_index);
    this.setData({
      choose_Index : choose_index,
      show_More: true
    })
  },
  closs_more(e){
    this.setData({
      show_More: false
    })
  },
  scroll(){
    console.log("滑动了")
  },
  // lower(){
  //   let start = 0;
  //   start += 1;
  //   console.log("加载了...")
  //   let _this = this
  //   wx.request({
  //     url: 'https://www.easy-mock.com/mock/5ce4f9e27a7d8b22a361525d/friend/pingpangquan',
  //     success: function(res){
  //       let Content = _this.data.Content.concat(res.data.data.Content);
  //       _this.setData({
  //         Content: Content
  //       })
  //     }
  //   })
  // },
  // upper (){//下拉加载动态
  //   console.log("下拉了....")
  //   //获取用户Y轴下拉的位移
  //   if (this.data.refreshing)
  //     return;
  //   this.setData({
  //     refreshing: true
  //   });
  //   updataRefreshIcon.call(this)//调用动画
  //   let _this = this
  //   wx.request({
  //     url: 'https://www.easy-mock.com/mock/5ce4f9e27a7d8b22a361525d/friend/pingpangquan',
  //     success: function(res){
  //       setTimeout(function () {
  //         _this.setData({
  //           Content: res.data.data.Content
  //         })
  //       }, 2000)
  //       setTimeout(function () {
  //         _this.setData({
  //           refreshing: false
  //         })
  //       }, 2500)
  //     }
  //   })
  // },
  // //手指第一次触动屏幕
  // start(e){
  //   let startPoint = e.touches[0]
  //   let clientY = startPoint.clientY
  //   this.setData({
  //     clientY: clientY,
  //     refreshHeight: 0
  //   })
  // },
  // //手指结束触摸屏幕
  // end (e) {
  //   let endPoint = e.changedTouches[0]
  //   let y = (endPoint.clientY - this.data.clientY) * 0.6;
  //   if (y > 50){
  //     y = 50;
  //   }
  //   this.setData({
  //     refreshHeight: y
  //   })
  // },
  // //滑动
  // move (e) {
  //   console.log("下拉滑动了...")
  // },
  // // 旋转上拉加载图标
  // updataRefreshIcon(){
  //   let deg = 0;
  //   let _this = this;
  //   console.log('旋转开始')
  //   let animation = wx.createAnimation({
  //     duration: 1000
  //   })

  //   let timer = setInterval(function () {
  //     if (!_this.data.refreshing)
  //       clearInterval(timer)
  //       animation.rotateZ(deg).step()
  //       deg += 360
  //       _this.setData({
  //         refreshAnimation: animation.export()
  //       })
  //   }, 1000);
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var _this = this;
    //获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          windowHeight: res.windowHeight
        })
        console.log("屏幕高度：" + res.windowHeight)
      },
    })
    //获取Content
    wx.request({
      url: 'https://www.easy-mock.com/mock/5ce4f9e27a7d8b22a361525d/friend/pingpangquan',
      success:function (res) {
        console.log(res.data.data);     
          _this.setData({
            Content: res.data.data.Content
        })
        console.log(res.data.data.Content[0])
      }
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