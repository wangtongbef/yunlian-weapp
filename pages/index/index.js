// pages/index/index.js

// var getUser = require('../../utils/getUser.js');

var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenRoles: {},
    role: {},
    phone_number:'',
    userInfo:{},
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      tokenRoles: wx.getStorageSync('tokenRoles'),
      role: wx.getStorageSync('role'),
      userInfo: wx.getStorageSync('user')
    })
    // getUser();
    
    if (that.data.role.role_name == '门店销售员') {
      that.setData({
        list: [{ text: '售后扫码', icon: '../../img/icon-scanCode.svg', url: '../scan/scan' },
        { text: '资金', icon: '../../img/icon-money.svg', url: '../wallet/walletCenter/walletCenter' }]
      })
    } else if (that.data.role.role_name == '门店负责人') {
      that.setData({
        list: [{ text: '门店', icon: '../../img/icon-store.svg', url: '../store/storeList/storeList' },
        { text: '售后扫码', icon: '../../img/icon-scanCode.svg', url: '../scan/scan' },
        { text: '报表', icon: '../../img/icon-reportForm.svg', url: '../form/saleForm/saleForm' },
        { text: '资金', icon: '../../img/icon-money.svg', url: '../wallet/walletCenter/walletCenter' }]
      })
    } else if (that.data.role.role_name == '商务专员') {
      that.setData({
        list: [{ text: '签到', icon: '../../img/icon-signIndex.svg', url: '../checkIn/checkIn' },
          { text: '签约', icon: '../../img/icon-signing.svg', url: '../sign/sign' },
        { text: '门店', icon: '../../img/icon-store.svg', url: '../store/storeList/storeList' },
        { text: '报表', icon: '../../img/icon-reportForm.svg', url: '../form/formList/formList' },
        { text: '资金', icon: '../../img/icon-money.svg', url: '../wallet/walletCenter/walletCenter' }]
      })
    }
  },
  
  onReady: function () {
    var that = this
    var timer = setInterval(function () {
      var userInfo = wx.getStorageSync('user')
      if (userInfo) {
        that.setData({
          userInfo: userInfo
        })
        clearInterval(timer)
      }
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: getApp().data.servsers + 'user/profile',
      data: {
        token: that.data.tokenRoles.token
      },
      method: 'POST',
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
        }else{
          that.setData({
            phone_number: res.data.data.phone_number
          })
        }
      }
    })
    //getUser();
  }
})