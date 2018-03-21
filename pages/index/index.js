// pages/index/index.js

var getUser = require('../../utils/getUser.js');

var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    list:[
      { text: '签到', icon: '../../img/icon-signIndex.svg', url: '../checkIn/checkIn'},
      { text: '签约', icon: '../../img/icon-signing.svg', url: '../sign/sign'},
      { text: '门店', icon: '../../img/icon-store.svg', url: '../store/storeList/storeList' },
      { text: '售后扫码', icon: '../../img/icon-scanCode.svg', url: '../scan/scan' },
      { text: '资金', icon: '../../img/icon-money.svg', url: '../wallet/walletCenter/walletCenter' },
      { text: '报表', icon: '../../img/icon-reportForm.svg', url: '../form/formList/formList' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getUser();
    var that = this
    API.getlist('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        List: res.data
      })
    });
  },
  userInfo(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var user = wx.getStorageSync('user');
    console.log(user)
    that.setData({
      userInfo: user
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})