// pages/Inventory/inventoryList/inventoryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloaded:false,
    token:'',
    storeList:[],
    expressList: [],
    //expressList: [],
    currentTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token
    })
    wx.showLoading({
      title: '加载中',
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
            storeList: res.data.data,
            downloaded:true
          })
        }
      }
    })
  },

  swichNav: function (e){
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current == 1){
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: getApp().data.servsers + 'shop_inventory/inTransport', //获取快递单列表
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
                expressList: res.data.data,
                //expressList: [{ logistics_company_name: "顺丰", waybill_number: "123456789" }, { logistics_company_name: "韵达", waybill_number: "145263987" }], //测试数据
                downloaded: true
              })
            }
          }
        })
      }
    }
  },

  navigat: function(e){
    var that = this;
    var storeId = that.data.storeList[e.target.dataset.index].id
    var storeName = that.data.storeList[e.target.dataset.index].name
    wx.navigateTo({
      url: '../inventoryStoreDetail/inventoryStoreDetail?id=' + storeId
    })
  },

  navigatExp: function (e) {
    var that = this;
    var expressNumbers = that.data.expressList[e.currentTarget.dataset.index].waybill_number
    wx.navigateTo({
      url: '../inventoryExpressDetail/inventoryExpressDetail?numbers=' + expressNumbers
    })
  }
})