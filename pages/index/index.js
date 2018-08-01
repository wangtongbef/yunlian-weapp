// pages/index/index.js

// var getUser = require('../../utils/getUser.js');

// var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenRoles: {},
    role: {},
    phone_number:'',
    userInfo:{},
    list:[],
    List_storage:[]
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
        list: [{ text: '售后扫码', icon: '../../img/saoyisao-icon.png', url: '../scan/scan' },
          { text: '资金', icon: '../../img/zijin-icon.png', url: '../wallet/walletCenter/walletCenter' }],
        List_storage: [{ text: '送货单', icon: '../../img/songhuodan-icon.png', url: '../goodsSend/goodssendList/goodssendList' },
          { text: '退货单', icon: '../../img/tuihuodan-icon.png', url: '../goodsReturn/goodsreturnList/goodsreturnList' },
          { text: '扫码看货', icon: '../../img/saomakanhuo-icon.png', url: '../scanGoods/scanGoods/scanGoods' }]
      })
    } else if (that.data.role.role_name == '门店负责人') {
      that.setData({
        list: [{ text: '门店', icon: '../../img/mendian_icon.png', url: '../store/storeList/storeList' },
          { text: '售后扫码', icon: '../../img/saoyisao-icon.png', url: '../scanStorecheck/scanStorecheck' },
          { text: '报表', icon: '../../img/baobiao-icon.png', url: '../form/saleForm/saleForm' },
          { text: '资金', icon: '../../img/zijin-icon.png', url: '../wallet/walletCenter/walletCenter' }],
        List_storage: [{ text: '送货单', icon: '../../img/songhuodan-icon.png', url: '../goodsSend/goodssendList/goodssendList' },
          { text: '退货单', icon: '../../img/tuihuodan-icon.png', url: '../goodsReturn/goodsreturnList/goodsreturnList' },
          { text: '存货', icon: '../../img/cunhuo-icon.png', url: '../Inventory/inventoryList/inventoryList' },
          { text: '扫码看货', icon: '../../img/saomakanhuo-icon.png', url: '../scanGoods/scanGoods/scanGoods' }]
      })
    } else if (that.data.role.role_name == '商务专员') {
      that.setData({
        list: [{ text: '签到', icon: '../../img/qiandao-icon.png', url: '../checkIn/checkIn' },
          { text: '签约', icon: '../../img/qianyue-icon.png', url: '../sign/sign' },
          { text: '门店', icon: '../../img/mendian_icon.png', url: '../store/storeList/storeList' },
        { text: '报表', icon: '../../img/baobiao-icon.png', url: '../form/formList/formList' },
        { text: '资金', icon: '../../img/zijin-icon.png', url: '../wallet/walletCenter/walletCenter' }]
      })
    } else if (that.data.role.role_name == '仓管员'){
      that.setData({
        List_storage: [{ text: '入库单', icon: '../../img/rukudan-icon.png', url: '../godownEntry/godownEntryList/godownEntryList' },
          { text: '送货单', icon: '../../img/songhuodan-icon.png', url: '../goodsSend/goodssendList/goodssendList' },
          { text: '退货单', icon: '../../img/tuihuodan-icon.png', url: '../goodsReturn/goodsreturnList/goodsreturnList' },
          { text: '扫码看货', icon: '../../img/saomakanhuo-icon.png', url: '../scanGoods/scanGoods/scanGoods' }]
      })
    } else if (that.data.role.role_name == '配送员'){
      that.setData({
        List_storage: [{ text: '入库单', icon: '../../img/rukudan-icon.png', url: '../godownEntry/godownEntryList/godownEntryList' },
          { text: '送货单', icon: '../../img/songhuodan-icon.png', url: '../goodsSend/goodssendList/goodssendList' }, 
          { text: '退货单', icon: '../../img/tuihuodan-icon.png', url: '../goodsReturn/goodsreturnList/goodsreturnList' }]
      })
    } else if (that.data.role.role_name == '生产经理') {
      that.setData({
        List_storage: [{ text: '退货单', icon: '../../img/tuihuodan-icon.png', url: '../goodsReturn/goodsreturnList/goodsreturnList' }]
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