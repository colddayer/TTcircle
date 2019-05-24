const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'HMGBZ-U5XCX-TUX4Y-ZPUH3-7RRX5-BZBCW'
});
Page({
  data: {
    latitude: null,
    longitude: null,
    scale: 13,
    centerButton: {
      content: '+',
      ontap: true
    },
    markersTap: false,
    markers: [],
    listHid: true
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
          longitude: res.longitude
        })
      }
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
  goCircle() {
    wx.navigateTo({
      url: '../aboutCircle/aboutCircle',
    })
  },
  backfill(e) {
    let id = e.currentTarget.id;
    for (let i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title,
          listHid: true,
          latitude: this.data.suggestion[i].latitude,
          longitude: this.data.suggestion[i].longitude
        })
      }
    }
  },
  getsuggest(e) {
    qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      success: res => {
        let sug = [];
        for (let i = 0; i < res.data.length; i++) {
          sug.push({
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        this.setData({
          suggestion: sug,
          listHid: false
        });
      }
    })
  },
  hidList() {
    this.setData({
      listHid: true
    })
  }
})