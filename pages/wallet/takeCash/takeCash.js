// pages/wallet/takecash/takecash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    balance: 0,
    amount:0,
    postCashBalance:{},
    cashWarning: '',
    trueCash:false
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
        wx.hideLoading()
        if (res.code == -3) {
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
          var balance = res.data.data.amount
          that.setData({
            balance: parseFloat(balance)
          })
        }
      }
    })
  },
  inputCash(e){
    var that = this
    var amount = e.detail.value
    if (amount >= 5 && amount <= 20000 && amount <= that.data.balance){
      that.setData({
        trueCash: true,
        amount: amount
      })
    } else if (amount > that.data.balance){
      that.setData({
        trueCash: false,
        cashWarning:'提现金额超限'
      })
    }else{
      that.setData({
        trueCash: false,
        cashWarning: '请输入5 - 20000之间的金额'
      })
    }
  },
  takeAllcash(){
    var that = this
    that.setData({
      amount: that.data.balance
    })
    if (that.data.amount >= 5 && that.data.amount <= 20000) {
      that.setData({
        trueCash: true
      })
    } else {
      that.setData({
        trueCash: false
      })
    }
  },
  takecash(){
    wx.showLoading({
      title: '加载中',
    })
    var that=this
    wx.request({
      url: getApp().data.servsers + 'finance/withdraw',
      method: 'POST',
      data: {
        amount: that.data.amount,
        token: that.data.token
      },
      success: function (res) {
        wx.hideLoading()
        if (res.code == -3) {
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
            wx.showToast({
              title: '提现成功',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })},1000)
          } else if (res.data.code != 0){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      }
    })
  }
})