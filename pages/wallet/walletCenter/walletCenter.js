// pages/wallet/takeCash/takeCash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn:true,
    token: '',
    balance: '',
    listshow:false,
    nearby: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      token: tokenRoles.token
    })
    wx.request({
      url: getApp().data.servsers + 'finance/index',
      method: 'POST',
      data: {
        token: that.data.token
      },
      success: function (res) {
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
          that.setData({
            balance: res.data.data.amount
          })
        }
      }
    })
    wx.request({
      url: getApp().data.servsers + 'finance/trade',
      method: 'POST',
      data: {
        page: 0,
        token: that.data.token
      },
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
          var nearby = res.data.data.list
          that.setData({
            nearby: nearby
          })
          if (nearby.length!==0){
            that.setData({
              listshow: true
            })
          }
        }
      }
    })
  },
  linkList(){
    wx.navigateTo({
      url: '../walletList/walletList',
    })
  },
  linkBtn(){
    wx.navigateTo({
      url: '../takeCash/takeCash',
    })
  },
  linkDetail(e){
    var trade_id = e.currentTarget.dataset.trade_id
    wx.navigateTo({
      url: '../walletDetail/walletDetail?trade_id=' + trade_id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.setData({
      firstIn:false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that=this
    if (!that.data.firstIn){
      var tokenRoles = wx.getStorageSync('tokenRoles')
      that.setData({
        token: tokenRoles.token
      })
      wx.request({
        url: getApp().data.servsers + 'finance/index',
        method: 'POST',
        data: {
          token: that.data.token
        },
        success: function (res) {
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
            that.setData({
              balance: res.data.data.amount
            })
          }
        }
      })
      wx.request({
        url: getApp().data.servsers + 'finance/trade',
        method: 'POST',
        data: {
          page: 0,
          token: that.data.token
        },
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
            var nearby = res.data.data.list
            that.setData({
              nearby: nearby
            })
            if (nearby.length !== 0) {
              that.setData({
                listshow: true
              })
            }
          }
        }
      })
    }
  }
})