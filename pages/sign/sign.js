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
      }
    })
    wx.request({
      url: getApp().data.servsers + 'signing/signingList',
      data: {
        token: that.data.tokenRoles.token
      },
      method: 'POST',
      success: function (res) {
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
  },
  swichNav: function (e) {
    if (e.target.dataset.current == 1) {
      //获取后台接口，展示签到记录
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
    var index = e.target.dataset.index
    that.setData({
      signCheckStore: storeList[index]
    })
    var storeDetail={
      id: storeList[index].shop_id,
      name: storeList[index].shop_name,
      status:"待签约"
    }
    wx.setStorage({
      key: 'storeDetail',
      data: storeDetail,
      success: function () {
      }
    })
    if (storeList[index].need_update==0){
      that.setData({
        flag: false
      })
    } else if (storeList[index].need_update == 1){
      wx.navigateTo({
        url: '../store/storeDetail/storeDetail',
      })
    }
  },
  //拍照或者从相册选照片
  photo() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
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
    //console.log(e.target.dataset.src);
    var current = e.target.dataset.src;
    var that = this;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data.imgList // 需要预览的图片http链接列表
    })
  },
  signedImg(e) {
    var that = this;
    var current = e.target.dataset.img;
    var index = e.target.dataset.id;
    var imgArr = [that.data.signedList[index].img]
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgArr,
    })

  },
  signContract(){
    var that = this;
    var storeDetail = wx.getStorageSync('storeDetail')
    if (that.data.imgList.length!=0) {
      wx.uploadFile({
        url: getApp().data.servsers + 'signing/uploadContract', //接口地址
        filePath: that.data.imgList[0],
        name: 'image',
        formData: {
          token: that.data.tokenRoles.token,
          shop_id: storeDetail.id
        },
        success: function (res) {
          var data = JSON.parse(res.data)
          if (data.code == 0) {
            wx.showToast({
              title: '签约成功',
              icon: 'none',
              duration: 1000
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
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
        }
      })
      wx.request({
        url: getApp().data.servsers + 'signing/signingList',
        data: {
          token: that.data.tokenRoles.token
        },
        method: 'POST',
        success: function (res) {
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
    var that = this
    if (that.data.isShowListNum < that.data.signedList.length) {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else if (that.data.isShowListNum >= that.data.signedList.length) {
      wx.showToast({
        title: '到底啦',
        icon: 'success',
        duration: 2000
      })
    }
    var t = setTimeout(function () {
      var isShowListNum = that.data.isShowListNum + 5
      that.setData({
        isShowListNum: isShowListNum
      })
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})