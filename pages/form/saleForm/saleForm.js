// var tokenRoles = wx.getStorageSync('tokenRoles')
// var role = wx.getStorageSync('role')
// pages/saleForm/saleForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    role: {},
    isCommissioner: false,
    storeArray: [{ shop_id: 0, shop_name: "全部门店" }],
    salesArray: [{ user_id: 0, user_name: "全部销售员" }],
    timeArray:['今天','本周','本月','本年'],
    productAlltimedata:{},
    productInfo: [],
    isShow: true,
    storeIndex:0,
    shop_id:0,
    saleIndex: 0,
    user_id: 0,
    timeIndex: 0,
  },
  bindStoreChange: function (e) {
    var that = this
    console.log(e)
    console.log('门店选的是', that.data.storeArray[e.detail.value])
    if (e.detail.value != 0) {
      that.setData({
        isShow:false //选择销售人员picker
      })
    } else if (e.detail.value == 0){
      that.setData({
        isShow: true
      })
      console.log(that.data.isShow)
    }
    that.setData({
      storeIndex: e.detail.value,
      shop_id: that.data.storeArray[e.detail.value].shop_id
    })
    console.log(that.data.shop_id)
    if (that.data.role.role_name === '门店负责人') {
      wx.request({
        url: getApp().data.servsers + 'statistics/salesPersonForShop',
        data: {
          shop_id: that.data.shop_id,
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          var salesArray = res.data.data
          salesArray.unshift({ user_id: 0, user_name: "全部销售员" })
          that.setData({
            salesArray:salesArray
          })
        }
      })
    }
  },
  bindSaleChange: function (e) {
    var that = this
    console.log('销售员选的是', that.data.salesArray[e.detail.value])
    console.log('销售员选的是', e.detail.value)
    that.setData({
      saleIndex: e.detail.value,
      user_id: that.data.salesArray[e.detail.value].user_id
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
    console.log('time选的是', this.data.timeIndex)
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
    if (that.data.role.role_name === '商务专员'){
      that.setData({
        isCommissioner: true
      })
      wx.request({
        url: getApp().data.servsers + 'statistics/signShopsForCommissioner', //获取签约门店
        data: {
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          var storeArray = res.data.data
          storeArray.unshift({ shop_id: 0, shop_name: "全部门店" })
          that.setData({
            storeArray: storeArray
          })
          console.log(that.data.storeArray)
        }
      })
      wx.request({
        url: getApp().data.servsers + 'statistics/salesForCommissioner',
        data: {
          shop_id: 0,
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            productAlltimedata: res.data.data,
            productInfo: res.data.data.today
          })
          console.log(that.data.productAlltimedata)
        }
      })
    } else if (that.data.role.role_name === '门店负责人'){
      wx.request({
        url: getApp().data.servsers + 'statistics/shopsForChargePerson', //获取签约门店
        data: {
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          var storeArray = res.data.data
          storeArray.unshift({ shop_id: 0, shop_name: "全部门店" })
          that.setData({
            storeArray: storeArray
          })
          console.log(that.data.storeArray)
        }
      })
      wx.request({
        url: getApp().data.servsers + 'statistics/salesForChargePerson',
        data: {
          shop_id: 0,
          sales_person_id: 0,
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            productAlltimedata: res.data.data,
            productInfo: res.data.data.today
          })
          console.log(that.data.productAlltimedata)
        }
      })
    }
  },
  search(){
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var setProductInfo = function (timeIndex) {
      if (timeIndex == 0) {
        that.setData({
          productInfo: that.data.productAlltimedata.today
        })
      } else if (timeIndex == 1) {
        that.setData({
          productInfo: that.data.productAlltimedata.week
        })
      } else if (timeIndex == 2) {
        that.setData({
          productInfo: that.data.productAlltimedata.month
        })
      } else if (timeIndex == 3) {
        that.setData({
          productInfo: that.data.productAlltimedata.year
        })
      }
    }
    if (that.data.role.role_name === '商务专员') {
      wx.request({
        url: getApp().data.servsers + 'statistics/salesForCommissioner',
        data: {
          shop_id: that.data.shop_id,
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            productAlltimedata: res.data.data
          })
          console.log(that.data.productAlltimedata)
          setProductInfo(that.data.timeIndex)
        }
      })
    } else if (that.data.role.role_name === '门店负责人') {
      wx.request({
        url: getApp().data.servsers + 'statistics/salesForChargePerson',
        data: {
          shop_id: that.data.shop_id,
          sales_person_id: that.data.user_id,
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            productAlltimedata: res.data.data,
            productInfo: res.data.data.today
          })
          console.log(that.data.productAlltimedata)
          setProductInfo(that.data.timeIndex)
        }
      })
    }
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