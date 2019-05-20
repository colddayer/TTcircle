Page({
  data: {
    latitude: null,
    longitude: null,
    scale: 15,
    centerButton: {
      content: '+',
      ontap: true
    },
    markersTap: false,
    markers: []
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
  },
  onLoad() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [
            {
              iconPath: '../../images/circle.png',
              id: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 50,
              height: 50
            }
          ]
        });
      },
    })
  },
  centerButton() {
    if (!this.data.centerButton.ontab) {
      this.setData({
        centerButton: {
          ontab: true,
          content: '×',
          active: 'active'
        }
      })
    }
    else {
      this.setData({
        centerButton: {
          ontab: false,
          content: '+',
          active: 'freeze'
        }
      })
    }
  },
  openCircle() {
    wx.navigateTo({
      url: '../openCircle/openCircle',
    })
  },
  markerTap(e) {
    this.setData({
      markerTap: true
    })
  },
  hidCircle() {
    this.setData({
      markerTap: false
    })
  },
  goCircle(){
    wx.navigateTo({
      url: '../aboutCircle/aboutCircle',
    })
  }
})