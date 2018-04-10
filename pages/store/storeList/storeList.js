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
    if (that.data.role.role_name == '商务专员'){
      console.log(that.data.role)
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
          console.log(res)
          that.setData({
            waiting: res.data.data
          })
          var storeArr = that.data.waiting
          for (var i = 0; i<storeArr.length;i++){
            storeArr[i].status = '待签约'
          }
          console.log(that.data.waiting)
        }
      })
      wx.request({
        url: getApp().data.servsers + 'shop/signingShopsForCommissioner', //获取已签约门店
        data: {
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            waited: res.data.data
          })
          var storeArr = that.data.waited
          for (var i = 0; i < storeArr.length; i++) {
            storeArr[i].status = '已签约'
          }
          console.log(that.data.waited)
        }
      })
    } else if (that.data.role.role_name == '门店负责人'){
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
          console.log(res)
          that.setData({
            chargePstore: res.data.data
          })
          console.log(that.data.chargePstore)
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
    console.log(e);
    var that = this;
    var storeId = e.currentTarget.dataset.storeid;
    console.log(storeId);
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
        console.log('缓存成功')
      }
    })
    wx.navigateTo({
      url: '../storeDetail/storeDetail',
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
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      role: wx.getStorageSync('role'),
      token: tokenRoles.token
    })
    if (!that.data.firstIn){
      if (that.data.role.role_name == '商务专员') {
        console.log(that.data.role)
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
            console.log(res)
            that.setData({
              waiting: res.data.data
            })
            var storeArr = that.data.waiting
            for (var i = 0; i < storeArr.length; i++) {
              storeArr[i].status = '待签约'
            }
            console.log(that.data.waiting)
          }
        })
        wx.request({
          url: getApp().data.servsers + 'shop/signingShopsForCommissioner', //获取已签约门店
          data: {
            token: that.data.token
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            that.setData({
              waited: res.data.data
            })
            var storeArr = that.data.waited
            for (var i = 0; i < storeArr.length; i++) {
              storeArr[i].status = '已签约'
            }
            console.log(that.data.waited)
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