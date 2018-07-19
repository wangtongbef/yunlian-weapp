// pages/goodsReturn/reeturnConfirm/reeturnConfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codedetail: true,
    maskshow: false,
    codenumber: '',
    markedWords: '',
    returnList:[],
    productList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token
    })
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        if (res.result.indexOf("code_type") >= 0 && res.result.indexOf("code_sn") >= 0) {
          var detail = res.result.split("?")[1].split("&")
          var obj = { 'code_sn': detail[0].split("=")[1], 'code_type': detail[1].split("=")[1] }
          var arr = []
          arr.push(obj)
          that.setData({
            returnList: arr,
            codenumber: detail[0].split("=")[1]
          })
        } else {
          that.setData({
            codedetail: false
          })
        }
      },
      fail: function () {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  Continue: function () {
    var that = this
    console.log(that.data.returnList)
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (res.result.indexOf("code_type") >= 0 && res.result.indexOf("code_sn") >= 0) {
          var detail = res.result.split("?")[1].split("&")
          var obj = { 'code_sn': detail[0].split("=")[1], 'code_type': detail[1].split("=")[1] }
          var arr = that.data.returnList
          arr.push(obj)
          that.setData({
            returnList: arr,
            codenumber: detail[0].split("=")[1]
          })
        } else {
          that.setData({
            codedetail: false
          })
        }
      }
    })
  },

  confirm: function () { //确认产品数量
    var that = this
    console.log(that.data.returnList)
    var role = wx.getStorageSync('role').role_name
    var storeId = wx.getStorageSync('storeDetail').id
    if(role == '仓管员'){
      wx.request({
        url: getApp().data.servsers + 'return_documents/returnInfo',
        data: {
          token: that.data.token,
          code_list: JSON.stringify(that.data.returnList)
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
            if (res.data.code == 0) {
              that.setData({
                productList: res.data.data,
                markedWords: '确认成功',
                maskshow: true
              })
            } else if (res.data.code != 0) {
              that.setData({
                markedWords: res.data.msg,
                maskshow: true
              })
            }
            setTimeout(function () {
              that.setData({
                maskshow: false
              })
              if (that.data.markedWords == '确认成功') {
                wx.navigateTo({
                  url: '../applicationforReturn/applicationforReturn?productlist=' + JSON.stringify(that.data.productList) + '&returnList=' + JSON.stringify(that.data.returnList)
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }, 1000)
          }
        },
        fail: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else if (role == '门店销售员'){
      wx.request({
        url: getApp().data.servsers + 'return_documents/returnInfoSales',
        data: {
          token: that.data.token,
          code_list: JSON.stringify(that.data.returnList)
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
            if (res.data.code == 0) {
              that.setData({
                productList: res.data.data,
                markedWords: '确认成功',
                maskshow: true
              })
            } else if (res.data.code != 0) {
              that.setData({
                markedWords: res.data.msg,
                maskshow: true
              })
            }
            setTimeout(function () {
              that.setData({
                maskshow: false
              })
              if (that.data.markedWords == '确认成功') {
                wx.navigateTo({
                  url: '../applicationforReturn/applicationforReturn?productlist=' + JSON.stringify(that.data.productList)
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }, 1000)
          }
        },
        fail: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else if (role == '门店负责人') {
      wx.request({
        url: getApp().data.servsers + 'return_documents/returnInfoChargePerson',
        data: {
          token: that.data.token,
          code_list: JSON.stringify(that.data.returnList),
          shop_id: storeId
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
            if (res.data.code == 0) {
              that.setData({
                productList: res.data.data,
                markedWords: '确认成功',
                maskshow: true
              })
            } else if (res.data.code != 0) {
              that.setData({
                markedWords: res.data.msg,
                maskshow: true
              })
            }
            setTimeout(function () {
              that.setData({
                maskshow: false
              })
              if (that.data.markedWords == '确认成功') {
                wx.navigateTo({
                  url: '../applicationforReturn/applicationforReturn?productlist=' + JSON.stringify(that.data.productList)
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }, 1000)
          }
        },
        fail: function () {
          wx.navigateBack({
            delta: 1
          })
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