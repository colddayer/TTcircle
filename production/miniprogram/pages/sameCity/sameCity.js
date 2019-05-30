const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'HMGBZ-U5XCX-TUX4Y-ZPUH3-7RRX5-BZBCW'
});
const app = getApp()
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
    let mapCtx = wx.createMapContext('map');
    this.setData({mapCtx})
  },
  relocation(){
    console.log(1)
    this.data.mapCtx.moveToLocation()
  },
  onLoad() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          avatar: app.globalData.personInfo.avatarUrl,
          city: app.globalData.personInfo.city
        })
      }
    })
    wx.cloud.callFunction({
      name: 'getpingpang_venue',
      data: {
        city: app.globalData.personInfo.city
      }
    }).then(res => {
      let markers = res.result.data;
      markers = markers.map(e => {
        return {
          iconPath: '../../images/circle.png',
          id: e._id,
          latitude: e.latitude,
          longitude: e.longitude,
          width: 50,
          height: 50,
          detail: {
            // name: i.name,
            // members: i.members,
            areana: e.areana,
            img: e.img,
            time: e.time,
            address: e.address,
            // introduce: e.introduce,
            table: e.table
          },
          circles: e.circles
        }
      })
      this.setData({ markers })
    })
  },
  onShow() {
    wx.cloud.callFunction({
      name: 'getpingpang_venue',
      data: {
        city: app.globalData.personInfo.city
      }
    }).then(res => {
      let markers = res.result.data;
      markers = markers.map(e => {
        return {
          iconPath: '../../images/circle.png',
          id: e._id,
          latitude: e.latitude,
          longitude: e.longitude,
          width: 50,
          height: 50,
          detail: {
            // name: i.name,
            // members: i.members,
            areana: e.areana,
            img: e.img,
            time: e.time,
            address: e.address,
            // introduce: e.introduce,
            table: e.table
          },
          circles: e.circles
        }
      })
      this.setData({ markers })
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
      success: res => {
        this.setData(
          {
            centerButton: {
              ontab: false,
              content: '+',
              active: 'freeze'
            }
          }
        )
      }
    })
  },
  markerTap(e) {
    let markers = this.data.markers;
    for (let i of markers) {
      if (i.id == e.markerId) {
        this.setData({
          current: {
            time: i.detail.time,
            table: i.detail.table,
            address: i.detail.address,
            img: i.detail.img,
            circles:i.circles
          }
        })
      }
    }
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
      url: `../aboutCircle/aboutCircle?circles=${this.data.current.circles}`,
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
  },
  moveMap(e) {
    // console.log(e)
  },
  dateCircle(){
    wx.showModal({
      title: '((^_−)☆)',
      content: '即日上线！',
      showCancel: false
    })
  }
})