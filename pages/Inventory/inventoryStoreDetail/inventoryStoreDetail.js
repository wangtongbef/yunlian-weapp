// pages/Inventory/inventoryStoreDetail/inventoryStoreDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storetitle: '',
    currentTab:0,
    products: [],
    token:'',
    shop_id:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token,
      shop_id: options.id
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'shop_inventory/detailInShop', //获取正常品
      data: {
        token: that.data.token,
        shop_id: that.data.shop_id,
        quality:0
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
          var Products = []
          if (res.data.data.product_list.length!==0) {
            for (var i = 0; i < res.data.data.product_list.length; i++) {
              if (res.data.data.product_list[i].count != 0) {
                Products.push(res.data.data.product_list[i])
              }
            }
          }else{
            Products = res.data.data.product_list
          }
          that.setData({
            products: Products,
            storetitle: res.data.data.shop_name
          })
        }
      }
    })
  },

  swichNav: function (e) {
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      wx.showLoading({
        title: '加载中',
      })
      that.setData({
        currentTab: e.target.dataset.current
      })
      wx.request({
        url: getApp().data.servsers + 'shop_inventory/detailInShop', //获取
        data: {
          token: that.data.token,
          shop_id: that.data.shop_id,
          quality: e.target.dataset.current
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
            var Products = []
            if (res.data.data.product_list.length !== 0) {
              for (var i = 0; i < res.data.data.product_list.length; i++) {
                if (res.data.data.product_list[i].count != 0) {
                  Products.push(res.data.data.product_list[i])
                }
              }
            } else {
              Products = res.data.data.product_list
            }
            that.setData({
              products: Products
            })
          }
        }
      })
    }
  }
})