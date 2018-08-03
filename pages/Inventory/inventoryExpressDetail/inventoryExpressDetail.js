// pages/Inventory/inventoryExpressDetail/inventoryExpressDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waybill:'',
    billdata:{},
    token:'',
    productsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      waybill: options.numbers,
      token: wx.getStorageSync('tokenRoles').token
    })
    console.log(that.data.waybill)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'shop_inventory/detailInTransport', 
      data: {
        token: that.data.token,
        id: that.data.waybill
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == -3) {
          wx.showToast({
            title: 'token过期',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../login/login'
            })
          }, 1000)
        } else {
          that.setData({
            billdata: res.data.data,
            productsList: res.data.data.product_list
          })
        }
      }
    })
  }
})