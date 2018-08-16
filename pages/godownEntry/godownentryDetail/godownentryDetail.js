// pages/godownEntry/godownentryDetail/godownentryDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList: [{ name: '酷启动电源', amount: 2000 }, { name: '卡儿酷车充', amount: 1000 }, { name: '卡儿酷军工电源', amount: 5000 }],
    status:-1,
    maskshow:false,
    role:'',
    token:'',
    base_info:{},
    give_info:{},
    product_list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var role = wx.getStorageSync('role')
    var id = options.id
    that.setData({
      role: role.role_name,
      token: tokenRoles.token
    })
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.role == '仓管员') {
      wx.request({
        url: getApp().data.servsers + 'storage/storageDetail',
        data: {
          token: that.data.token,
          id:id
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
                url: '../login/login'
              })
            }, 1000)
          } else {
            that.setData({
              base_info:res.data.data.base_info,
              give_info: res.data.data.give_info,
              product_list: res.data.data.product_list
            })
          }
        }
      })
    } else if (that.data.role == '配送员') {
      wx.request({
        url: getApp().data.servsers + 'storage/storageDetailForCourier',
        data: {
          token: that.data.token,
          id: id
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
                url: '../login/login'
              })
            }, 1000)
          } else {
            that.setData({
              base_info: res.data.data.base_info,
              product_list: res.data.data.product_list
            })
          }
        }
      })
    }
  },

  godownentryButton: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.role == '仓管员'){
      wx.hideLoading()
      that.setData({
        maskshow: true
      })
    } else if (that.data.role == '配送员'){
      wx.request({
        url: getApp().data.servsers + 'storage/confirmStorage', //确认入库
        data: {
          token: that.data.token,
          id: that.data.base_info.id
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
                url: '../login/login'
              })
            }, 1000)
          } else {
            console.log(res)
            if (res.data.code == 0){
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 10)
            } else if (res.data.code == 1) {
              wx.showToast({
                title: '确认入库单失败,入库单可能已取消',
                icon: 'none',
                duration: 1000
              })
            }
          }
        }
      })
    }
  },

  endtouchmove: function (){
    return false;
  },

  yes:function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //确认取消入库
    wx.request({
      url: getApp().data.servsers + 'storage/cancelStorage',
      data: {
        token: that.data.token,
        id: that.data.base_info.id
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
              url: '../login/login'
            })
          }, 1000)
        } else {
          if (res.data.code == 0) {
            that.setData({
              maskshow: false
            })
            wx.showToast({
              title: '取消入库成功',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          } else if (res.data.code == 1) {
            that.setData({
              maskshow: false
            })
            wx.showToast({
              title: '取消入库单失败,入库单可能已入库',
              icon: 'none',
              duration: 1000
            })
          }
        }
      }
    })
  },

  no:function(){
    var that = this
    that.setData({
      maskshow: false
    })
  }
})
