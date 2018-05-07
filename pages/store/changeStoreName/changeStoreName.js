// pages/store/changeStoreName/storeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeName:'',
    token: '',
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var storeDetail = wx.getStorageSync('storeDetail')
    that.setData({
      token: tokenRoles.token,
      id: storeDetail.id,
      storeName: wx.getStorageSync('storeName')
    })
  },
  nameVal(e){
    this.setData({
      storeName: e.detail.value,
    })
  },
  changeNameSubmit(){
    var storeName = this.data.storeName
    if (this.data.storeName.length == 0){
      wx.showToast({
        title: '门店名称不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.storeName.length == 1) {
      wx.showToast({
        title: '门店名称不能少于2位',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.storeName.length > 1){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().data.servsers + 'shop/updateShopName', 
        data: {
          id: this.data.id,
          name: this.data.storeName,
          token: this.data.token
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          if (res.data.code == -3) {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../login/login'
              })
            }, 1000)
          } else {
            if (res.data.code == 0){
              wx.setStorage({
                key:'storeName',
                data: storeName,
                success: function (res) {
                },
                fail:function(res){
                }
              })
              wx.navigateBack({
                delta: 1
              })
            } else if (res.data.code == 1){
              wx.showToast({
                title: '门店名称修改失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        }
      })
    }
  }
})