// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn: true,
    tokenRoles: {},
    imgList:[],
    flag:true,
    isShow: true,
    currentTab: 0,
    isShowListNum: 5,
    signCheckStore:{},
    storeList:[],
    signedList:[]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    that.setData({
      tokenRoles: wx.getStorageSync('tokenRoles')
    })
    wx.request({
      url: getApp().data.servsers + 'signing/unsignedList',
      data: {
        token: that.data.tokenRoles.token
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          storeList: res.data.data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    })
  },
  swichNav: function (e) {
    if (e.target.dataset.current == 1) {
      wx.showLoading({
        title: '加载中',
      })
      var that = this
      //获取后台接口，展示签到记录
      wx.request({
        url: getApp().data.servsers + 'signing/signingList',
        data: {
          token: that.data.tokenRoles.token
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          var list = res.data.data
          var reverselist = []
          for (var i = list.length - 1; i >= 0; i--) {
            list[i].contract_image = 'https://' + list[i].contract_image
            reverselist.push(list[i])
          }
          that.setData({
            signedList: reverselist
          })
        }
      })
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  changeStore(e){
    var that = this
    var storeList = that.data.storeList
    var index = parseInt(e.currentTarget.dataset.index)
    var storeDetail
    setTimeout(function () {
      that.setData({
        signCheckStore: storeList[index]
      })
      storeDetail = {
        id: storeList[index].shop_id,
        name: storeList[index].shop_name,
        status: "待签约"
      }
    }, 50)
    setTimeout(function () {
      wx.setStorage({
        key: 'storeDetail',
        data: storeDetail,
        success: function () {
        }
      })
      wx.setStorage({
        key: 'storeName',
        data: storeDetail.name,
        success: function () {
        }
      })
      if (storeList[index].need_update == 0) {
        that.setData({
          flag: false
        })
      } else if (storeList[index].need_update == 1) {
        wx.navigateTo({
          url: '../store/storeDetail/storeDetail',
        })
      }
    }, 100)
  },
  //拍照或者从相册选照片
  photo() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.hideLoading()
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgList: tempFilePaths
        })
      }
    })
  },
  //预览图片
  photograph(e) {
    var current = e.target.dataset.src;
    var that = this;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data.imgList // 需要预览的图片http链接列表
    })
  },
  signedImg(e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var imgArr = [that.data.signedList[index].contract_image]
    wx.previewImage({
      urls: imgArr,
    })

  },
  signContract(){
    var that = this;
    var storeDetail = wx.getStorageSync('storeDetail')
    if (that.data.imgList.length!=0) {
      wx.showLoading({
        title: '加载中',
      })
      wx.uploadFile({
        url: getApp().data.servsers + 'signing/uploadContract', //接口地址
        filePath: that.data.imgList[0],
        name: 'image',
        formData: {
          token: that.data.tokenRoles.token,
          shop_id: storeDetail.id
        },
        success: function (res) {
          wx.hideLoading()
          var data = JSON.parse(res.data)
          if (data.code == 0) {
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: getApp().data.servsers + 'signing/unsignedList',
              data: {
                token: that.data.tokenRoles.token
              },
              method: 'POST',
              success: function (res) {
                that.setData({
                  storeList: res.data.data
                })
              }
            })
            wx.request({
              url: getApp().data.servsers + 'signing/signingList',
              data: {
                token: that.data.tokenRoles.token
              },
              method: 'POST',
              success: function (res) {
                wx.hideLoading()
                var list = res.data.data
                var reverselist = []
                for (var i = list.length - 1; i >= 0; i--) {
                  list[i].contract_image = 'https://' + list[i].contract_image
                  reverselist.push(list[i])
                }
                that.setData({
                  signedList: reverselist
                })
              }
            })
            that.setData({
              currentTab: 1,
              isShow: false,
              flag:true
            })
          } else if (data.code == 1){
            wx.showToast({
              title: '图片不合规',
              icon: 'none',
              duration: 1000
            })
          } else if (data.code == 2) {
            wx.showToast({
              title: '签约失败',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    } else if (that.data.imgList.length== 0){
      wx.showToast({
        title: '请正确填写资料',
        icon: 'none',
        duration: 1000
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    if (!that.data.firstIn) {
      wx.request({
        url: getApp().data.servsers + 'signing/unsignedList',
        data: {
          token: that.data.tokenRoles.token
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            storeList: res.data.data
          })
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.setData({
      firstIn: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.isShowListNum < that.data.signedList.length) {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    } else if (that.data.isShowListNum >= that.data.signedList.length) {
      wx.showToast({
        title: '到底啦',
        icon: 'success',
        duration: 1000
      })
    }
    var t = setTimeout(function () {
      var isShowListNum = that.data.isShowListNum + 5
      that.setData({
        isShowListNum: isShowListNum
      })
    }, 500)
  }
})