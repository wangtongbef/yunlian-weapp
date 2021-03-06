var API = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn: true,
    role:{},
    isCommissioner:true,
    token:'',
    isShow: true,
    currentTab: 0,
    chargePstore:[],
    waiting:[],
    waited:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      role: wx.getStorageSync('role'),
      token: tokenRoles.token
    })
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.role.role_name == '商务专员'){
      wx.setNavigationBarTitle({ title: '门店' })
      that.setData({
        isCommissioner: true
      })
      wx.request({
        url: getApp().data.servsers + 'shop/unsignedShopsForCommissioner', //获取待签约门店
        data: {
          token: that.data.token
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
              waiting: res.data.data
            })
            var storeArr = that.data.waiting
            for (var i = 0; i<storeArr.length;i++){
              storeArr[i].status = '待签约'
            }
          }
        }
      })
      wx.request({
        url: getApp().data.servsers + 'shop/signingShopsForCommissioner', //获取已签约门店
        data: {
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
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
              waited: res.data.data
            })
            var storeArr = that.data.waited
            for (var i = 0; i < storeArr.length; i++) {
              storeArr[i].status = '已签约'
            }
          }
        }
      })
    } else if (that.data.role.role_name == '门店负责人'){
      wx.setNavigationBarTitle({ title: '门店列表' })
      that.setData({
        isCommissioner: false
      })
      wx.request({
        url: getApp().data.servsers + 'shop/signingShopsForChargePerson', //获取门店列表
        data: {
          token: that.data.token
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
              chargePstore: res.data.data
            })
          }
        }
      })
    }
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  storeDetail(e){
    var that = this;
    var storeId = e.currentTarget.dataset.storeid;
    function searchId(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == storeId){
          return arr[i]
        }
      }
    }
    var storeDetail = searchId(that.data.chargePstore) || searchId(that.data.waiting) || searchId(that.data.waited)
    wx.setStorage({
      key: 'storeDetail',
      data: storeDetail,
      success:function(){
      }
    })
    wx.setStorage({
      key: 'storeName',
      data: storeDetail.name,
      success: function () {
      }
    })
    wx.navigateTo({
      url: '../storeDetail/storeDetail',
    })
  }, 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      role: wx.getStorageSync('role'),
      token: tokenRoles.token
    })
    if (!that.data.firstIn){
      if (that.data.role.role_name == '商务专员') {
        wx.showLoading({
          title: '加载中',
        })
        that.setData({
          isCommissioner: true
        })
        wx.request({
          url: getApp().data.servsers + 'shop/unsignedShopsForCommissioner', //获取待签约门店
          data: {
            token: that.data.token
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
                waiting: res.data.data
              })
              var storeArr = that.data.waiting
              for (var i = 0; i < storeArr.length; i++) {
                storeArr[i].status = '待签约'
              }
            }
          }
        })
        wx.request({
          url: getApp().data.servsers + 'shop/signingShopsForCommissioner', //获取已签约门店
          data: {
            token: that.data.token
          },
          method: 'POST',
          success: function (res) {
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
                waited: res.data.data
              })
              var storeArr = that.data.waited
              for (var i = 0; i < storeArr.length; i++) {
                storeArr[i].status = '已签约'
              }
            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.setData({
      firstIn: false
    })
  }
})