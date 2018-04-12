var chooseLocation = require('../../utils/getLocation.js');
Page({

  data: {
    imgList:"../../img/photograph.svg",
    position: '',
    address:'所在位置',
    isShow: true,
    isToSignin:false,
    currentTab: 0,
    isShowListNum: 5,
    checkList:[],
    photoList:[]
  },
  onLoad: function (options) {
  },
  swichNav: function (e) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles');
    if (e.target.dataset.current == that.data.currentTab) {
      return false;
    }else if (e.target.dataset.current == 0){
      that.setData({
        currentTab: 0,
        isShow: true
      })
    } else if (e.target.dataset.current == 1) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().data.servsers + 'sign_in/list',
        data: {
          page: 0,
          token: tokenRoles.token
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          var list = res.data.data.list
          var reverselist = []
          for (var i = list.length-1; i >=0;i--){
            list[i].image = 'https://' + list[i].image
            reverselist.push(list[i])
          }
          that.setData({
            checkList: reverselist
          })
        }
      })
      that.setData({
        currentTab: 1,
        isShow: false
      })
    }
  },
  //拍照或者从相册选照片
  previewImage(e){
    var current = e.target.dataset.id;
    var that = this;
      wx.previewImage({
        urls: [that.data.checkList[current].image] // 当前显示图片的http链接
      })
  },
  photo(){
    var tokenRoles = wx.getStorageSync('tokenRoles');
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], 
      sourceType: ['camera'], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgList: tempFilePaths,
          isToSignin:true
        })
        
      }
    })
  },

  getadress() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        wx.hideLoading()
        that.setData({
          address: res.name,
          position: res.latitude + ',' + res.longitude
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation']) {
              return
            } else {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                confirmText: '授权',
                content: '需要授权您的位置信息后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
                //content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
                success: (res) => {
                  //开启授权
                  wx.openSetting({
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  signIn(){
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles');
    if (that.data.isToSignin && that.data.address!=='所在位置'){
      wx.showLoading({
        title: '加载中',
      })
      wx.uploadFile({
        url: getApp().data.servsers + 'sign_in/mark', //接口地址
        filePath: that.data.imgList[0],
        name: 'image',
        formData: {
          token: tokenRoles.token,
          position: that.data.position,
          address: that.data.address
        },
        success: function (res) {
          wx.hideLoading()
          var data = JSON.parse(res.data)
          if (data.code == 0){
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: getApp().data.servsers + 'sign_in/list',
              data: {
                page: 0,
                token: tokenRoles.token
              },
              method: 'POST',
              success: function (res) {
                wx.hideLoading()
                var list = res.data.data.list
                var reverselist = []
                for (var i = list.length - 1; i >= 0; i--) {
                  list[i].image = 'https://' + list[i].image
                  reverselist.push(list[i])
                }
                that.setData({
                  checkList: reverselist
                })
              }
            })
            that.setData({
              imgList: "../../img/photograph.svg",
              isToSignin: false,
              address: '所在位置',
              currentTab: 1,
              isShow: false
            })
          } else if (data.code == 1){
            wx.showToast({
              title: '签到失败',
              icon: 'none',
              duration: 1000
            })
          }
          //do something
        }
      })
    } else{
      wx.showToast({
        title: '请正确填写资料',
        icon: 'none',
        duration: 1000
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.isShowListNum < that.data.checkList.length) {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    } else if (that.data.isShowListNum >= that.data.checkList.length){
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
    }, 1000)
  }
})