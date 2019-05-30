const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'HMGBZ-U5XCX-TUX4Y-ZPUH3-7RRX5-BZBCW' // 必填
});
const app = getApp();
Page({
  data: {
    imgList: [],
    hidList: true,
    title: '',
    begintime: '点击选择',
    endtime: '点击选择',
    placeholder: {
      one: 'xxx球圈(10字内)',
      two: 'xxxx 乒乓球馆 | 室 | 俱乐部',
      three: '14:00 -- 20:30',
      four: '搜索选择  ',
      five: '以球会友，互相交流，互娱互乐，共同乒搏，推广国球文化，让更多乒乓球兴趣爱好者走到一起互相认识，提高球技，培养球德。'
    },
    backfill: '',
    disabled: true
  },
  onLoad() {
    let picker = [];
    for (let i = 1; i < 31; i++) {
      picker.push(i)
    }
    this.setData({ picker })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
    let table = this.data.picker[this.data.index];
    this.setData({ table })
  },
  TimeChange(e) {
    this.setData({
      begintime: e.detail.value
    })
  },
  TimeChanger(e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  backfill(e) {
    let id = e.currentTarget.id;
    for (let i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title,
          hidList: true,
          addressValue: this.data.suggestion[i].title,
          placeholder: {
            one: 'xxx球圈(10字内)',
            two: 'xxxx 乒乓球馆 | 室 | 俱乐部',
            three: '14:00 -- 20:30',
            four: '搜索选择  ',
            five: '以球会友，互相交流，互娱互乐，共同乒搏，推广国球文化，让更多乒乓球兴趣爱好者走到一起互相认识，提高球技，培养球德。'
          },
          latitude: this.data.suggestion[i].latitude,
          longitude: this.data.suggestion[i].longitude,
          disabled: false
        });
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
          suggestion: sug
        });
      }
    })
  },
  searchAddress() {
    this.setData({
      focus: true,
      addressValue: '',
      hidList: false,
      placeholder: {}
    })
  },
  hidlist() {
    this.setData({
      hidList: true,
      placeholder: {
        one: 'xxx球圈(10字内)',
        two: 'xxxx 乒乓球馆 | 室 | 俱乐部',
        three: '14:00 -- 20:30',
        four: '搜索选择  ',
        five: '以球会友，互相交流，互娱互乐，共同乒搏，推广国球文化，让更多乒乓球兴趣爱好者走到一起互相认识，提高球技，培养球德。'
      },
      addressValue: this.data.backfill,
      disabled: false
    })
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputMembers(e) {
    this.setData({
      members: e.detail.value
    })
  },
  inputAreana(e) {
    this.setData({
      areana: e.detail.value
    })
  },
  inputTable(e) {
    this.setData({
      table: e.detail.value
    })
  },
  inputTime(e) {
    this.setData({
      time: e.detail.value
    })
  },
  inputIntroduce(e) {
    this.setData({
      introduce: e.detail.value
    })
  },
  formSubmit() {
    if (!this.data.areana || !this.data.table || this.data.imgList.length == 0 || this.data.begintime == '点击选择' || this.data.endtime == '点击选择' || !this.data.addressValue) {
      wx.showModal({
        title: '提交错误',
        content: '请完善所有信息!',
        showCancel: false
      })
      return
    }
    let beginHour = this.data.begintime[0] + this.data.begintime[1];
    let beginMin = this.data.begintime[3] + this.data.begintime[4];
    let endHour = this.data.endtime[0] + this.data.endtime[1];
    let endMin = this.data.endtime[3] + this.data.endtime[4];
    if (beginHour - endHour > 0 || (beginHour - endHour < 0 && beginMin - endMin > 0))
    {
      wx.showModal({
        title: '提交错误',
        content: '错误时间信息!',
        showCancel: false
      })
      return
    }
      let cloudPath = this.data.imgList[0].split('//')[1]
    let filePath = this.data.imgList[0];
    wx.cloud.uploadFile({
      cloudPath,
      filePath, // 文件路径
      success: res => {
        // get resource ID
        let fileId = res.fileID
        wx.cloud.getTempFileURL({
          fileList: [fileId],
          success: res => {
            this.setData({
              imgList: [res.fileList[0].tempFileURL]
            })
            const circleInfo = {}; // 球圈信息
            // circleInfo.name = this.data.name; // 球圈名
            // circleInfo.members = this.data.members; // 球圈规模
            circleInfo.areana = this.data.areana; //球馆名
            circleInfo.table = this.data.table; //球桌数量
            circleInfo.img = this.data.imgList[0]; //图片地址
            circleInfo.time = this.data.begintime + ' - ' + this.data.endtime; //活动时间
            circleInfo.address = this.data.backfill; //详细地址
            circleInfo.latitude = this.data.latitude; //经度
            circleInfo.longitude = this.data.longitude; //纬度
            circleInfo.city = app.globalData.personInfo.city
            // circleInfo.introduce = this.data.introduce;//简介
            circleInfo.fileId = fileId
            wx.showLoading({
              title: '上传中'
            })
            wx.cloud.callFunction({
              name: 'addpingpang_venue',
              data: {
                venue: circleInfo
              }
            }).then(res => {
              wx.hideLoading()
              wx.navigateBack({})
            })
          }
        })
      },
      fail: (err => {
        console.log(err)
      })
    })
  },
  testName(e) {
    if (!e.detail.value.match(/乒乓球馆|乒乓球室|乒乓球俱乐部$/)) {
      wx.showModal({
        title: '友情提示--名称格式',
        content: '请以 乒乓球馆 或乒乓球室 或乒乓球俱乐部 结尾命名哦！',
        showCancel: false
      })
      this.setData({
        areana: ''
      })
    }
  }
})