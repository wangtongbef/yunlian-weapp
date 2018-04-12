var getLocation = require('../../../utils/getLocation.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenRoles:{},
    inputVal:'',
    inputValWarning:'',
    address:'门店位置',
    position:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that =this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    console.log(tokenRoles)
    that.setData({
      tokenRoles: tokenRoles
    })
  },
  
  getadress() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name,
          'position.latitude': res.latitude,
          'position.longitude': res.longitude
        })
      },
      fail: function (res) {
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
  lengthCheck(e){
    var that = this
    console.log(e)
    that.setData({
      inputVal: e.detail.value
    })
    if (that.data.inputVal.length == 0){
      that.setData({
        inputValWarning: '门店名称不能为空'
      })
      wx.showToast({
        title: that.data.inputValWarning,
        icon: 'none',
        duration: 2000
      })
    } else if (that.data.inputVal.length == 1){
      that.setData({
        inputValWarning: '门店名称不能少于2位'
      })
      wx.showToast({
        title: that.data.inputValWarning,
        icon: 'none',
        duration: 1000
      })
    }
  },
  addstore(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: getApp().data.servsers + 'shop/addShop',
      method: 'POST',
      data: {
        token: that.data.tokenRoles.token,
        name: that.data.inputVal,
        address: that.data.address,
        longitude: that.data.position.longitude,
        latitude: that.data.position.latitude
      },
      success: function (res) {
        wx.hideLoading()
        if(res.data.code ==0){
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }
})