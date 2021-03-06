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
    if (e.detail.value != 0) {
      that.setData({
        isShow:false //选择销售人员picker
      })
    } else if (e.detail.value == 0){
      that.setData({
        isShow: true
      })
    }
    that.setData({
      storeIndex: e.detail.value,
      saleIndex: 0,
      timeIndex: 0,
      shop_id: that.data.storeArray[e.detail.value].shop_id
    })
    if (that.data.role.role_name === '门店负责人') {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().data.servsers + 'statistics/salesPersonForShop',
        data: {
          shop_id: that.data.shop_id,
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
          }else{
            var salesArray = res.data.data
            salesArray.unshift({ user_id: 0, user_name: "全部销售员" })
            that.setData({
              salesArray: salesArray
            })
          }
        }
      })
    }
  },
  bindSaleChange: function (e) {
    var that = this
    that.setData({
      saleIndex: e.detail.value,
      timeIndex:0,
      user_id: that.data.salesArray[e.detail.value].user_id
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
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
            var storeArray = res.data.data
            storeArray.unshift({ shop_id: 0, shop_name: "全部门店" })
            that.setData({
              storeArray: storeArray
            })
          }
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
            if (res.data.code==0){
              that.setData({
                productAlltimedata: res.data.data,
                productInfo: res.data.data.today
              })
            } else if (res.data.code == 1){
              wx.showToast({
                title: '商铺ID错误',
                icon: 'none',
                duration: 1000
              })
            }
          }
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
            var storeArray = res.data.data
            storeArray.unshift({ shop_id: 0, shop_name: "全部门店" })
            that.setData({
              storeArray: storeArray
            })
          }
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
              productAlltimedata: res.data.data,
              productInfo: res.data.data.today
            })
          }
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
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.role.role_name === '商务专员') {
      wx.request({
        url: getApp().data.servsers + 'statistics/salesForCommissioner',
        data: {
          shop_id: that.data.shop_id,
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
              productAlltimedata: res.data.data
            })
            setProductInfo(that.data.timeIndex)
          }
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
              productAlltimedata: res.data.data,
              productInfo: res.data.data.today
            })
            setProductInfo(that.data.timeIndex)
          }
        }
      })
    }
  }
})