// pages/goodsReturn/goodsreturnDetail/goodsreturnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateArr:['待审核','审核不过','待取货','运送中','已完成','已返厂','已取消'],
    id: '',
    statecolor:'',

    resdata:{},
    imagelist:[],
    quality:-1,
    productsList: [],
    
    statet:'',
    state:0,
    role:'',
    token:'',
    sendtype:'',
    receiveorsend:'',
    maskshow: false,
    maskshow_2: false,
    markedWords:'',
    firstin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var role = wx.getStorageSync('role')
    var that = this
    that.setData({
      id: options.id,
      role: role.role_name,
      token: tokenRoles.token
    })
    if (that.data.firstin) {
      wx.showLoading({
        title: '加载中',
      })
      if (options.receiveorsend){
        that.setData({
          receiveorsend: options.receiveorsend
        })
      }
      wx.request({
        url: getApp().data.servsers + 'return_documents/returnDetail', //获取退货单详情
        data: {
          token: that.data.token,
          id: that.data.id
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
              resdata:res.data.data,
              statet: that.data.stateArr[res.data.data.base_info.status],
              productsList: res.data.data.product_list,
              quality: res.data.data.quality,
              imagelist: res.data.data.image
            })
            if (res.data.code == 0) {
              if (that.data.resdata.give_info.delivery_type == 0) {
                that.setData({
                  sendtype: '配送员配送'
                })
              } else if (that.data.resdata.give_info.delivery_type == 1) {
                that.setData({
                  sendtype: '物流配送'
                })
              }

              if (that.data.statet == '待审核' || that.data.statet == '待取货' || that.data.statet == '运送中') {
                that.setData({
                  statecolor: 'rgb(1,144,210)'
                })
              } else if (that.data.statet == '已完成' || that.data.statet == '已取消' || that.data.statet == '审核不过' || that.data.statet == '已返厂') {
                that.setData({
                  statecolor: 'rgb(88,88,88)'
                })
              }

              if (that.data.statet == '待取货') {
                if (that.data.role == '配送员') {
                  that.setData({
                    state: 4
                  })
                } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || (that.data.role == '仓管员' && that.data.receiveorsend == '退货')) {
                  if (that.data.quality == 0) {
                    if (that.data.sendtype == '物流配送') {
                      that.setData({
                        state: 3
                      })
                    } else if (that.data.sendtype == '配送员配送') {
                      that.setData({
                        state: 2
                      })
                    }
                  } else if (that.data.quality == 1) {
                    that.setData({
                      state: 5
                    })
                  }
                }
              } else if (that.data.statet == '运送中') {
                if ((that.data.role == '仓管员' && that.data.receiveorsend == '收货') || that.data.role == '生产经理') {
                  that.setData({
                    state: 1
                  })
                } else if (that.data.role == '配送员') {
                  that.setData({
                    state: 2
                  })
                } else if (that.data.role == '仓管员' && that.data.receiveorsend == '退货' && that.data.quality == 0) {
                  if (that.data.sendtype == '物流配送') {
                    that.setData({
                      state: 2
                    })
                  }
                }
              }
            }
          }
        }
      })
    }
  },

  receive: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.role == '仓管员'){
      wx.request({
        url: getApp().data.servsers + 'return_documents/confirm', //退货单确认收货
        data: {
          token: that.data.token,
          id: that.data.id
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
            if (res.data.code == 0) {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 10)
            } else if (res.data.code == 1) {
              that.setData({
                maskshow_2: true,
                markedWords: res.data.msg
              })
              setTimeout(function () {
                that.setData({
                  maskshow_2: false
                })
              }, 2000)
            }
          }
        }
      })
    } else if (that.data.role == '生产经理'){
      wx.request({
        url: getApp().data.servsers + 'return_documents/confirmProduceManager', //退货单确认收货
        data: {
          token: that.data.token,
          id: that.data.id
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
            if (res.data.code == 0) {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 10)
            } else if (res.data.code == 1) {
              that.setData({
                maskshow_2: true,
                markedWords: res.data.msg
              })
              setTimeout(function () {
                that.setData({
                  maskshow_2: false
                })
              }, 2000)
            }
          }
        }
      })
    }
  },

  getgoods:function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'return_documents/confirmCourier', //退货单确认取货
      data: {
        token: that.data.token,
        id: that.data.id
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
          if (res.data.code == 0) {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 10)
          } else if (res.data.code == 1) {
            that.setData({
              maskshow_2: true,
              markedWords: res.data.msg
            })
            setTimeout(function () {
              that.setData({
                maskshow_2: false
              })
            }, 2000)
          }
        }
      }
    })
  },

  getlocation: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'delivery/address',
      data: {
        token: that.data.token,
        id: e.currentTarget.dataset.id,
        type: e.currentTarget.dataset.type
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
          wx.hideLoading()
          wx.openLocation({
            latitude: parseFloat(res.data.data.latitude),
            longitude: parseFloat(res.data.data.longitude),
            name: e.currentTarget.dataset.name,
            address: res.data.data.address,
            scale: 28
          })
        }
      }
    })
  },

  clear: function(){
    var that = this
    that.setData({
      maskshow:true
    })
  },
  
  send: function () {
    var that = this
    wx.navigateTo({
      url: '../logisticsChoose/logisticsChoose?id=' + that.data.resdata.base_info.id
    })
  },

  endtouchmove: function () {
    return false;
  },

  yes: function () {
    //确认取消
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    that.setData({
      maskshow: false,
    })
    wx.request({
      url: getApp().data.servsers + 'return_documents/cancelReturn', //取消退货单
      data: {
        token: that.data.token,
        id: that.data.id
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
          if(res.data.code == 0){
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 10)
          } else if (res.data.code == 1){
            that.setData({
              maskshow_2: true,
              markedWords: res.data.msg
            })
            setTimeout(function () {
              that.setData({
                maskshow_2: false
              })
            }, 1000)
          }
        }
      }
    })
  },

  no: function () {
    var that = this
    that.setData({
      maskshow: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (!that.data.firstin) {
      that.setData({
        state: 0
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().data.servsers + 'return_documents/returnDetail', //获取退货单详情
        data: {
          token: that.data.token,
          id: that.data.id
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
              resdata: res.data.data,
              statet: that.data.stateArr[res.data.data.base_info.status],
              productsList: res.data.data.product_list,
              quality: res.data.data.quality,
              imagelist: res.data.data.image
            })
            if (res.data.code == 0){
              if (that.data.resdata.give_info.delivery_type == 0) {
                that.setData({
                  sendtype: '配送员配送'
                })
              } else if (that.data.resdata.give_info.delivery_type == 1) {
                that.setData({
                  sendtype: '物流配送'
                })
              }

              if (that.data.statet == '待审核' || that.data.statet == '待取货' || that.data.statet == '运送中') {
                that.setData({
                  statecolor: 'rgb(1,144,210)'
                })
              } else if (that.data.statet == '已完成' || that.data.statet == '已取消' || that.data.statet == '审核不过' || that.data.statet == '已返厂') {
                that.setData({
                  statecolor: 'rgb(88,88,88)'
                })
              }

              if (that.data.statet == '待取货') {
                if (that.data.role == '配送员') {
                  that.setData({
                    state: 4
                  })
                } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || (that.data.role == '仓管员' && that.data.receiveorsend == '退货')) {
                  if (that.data.quality == 0) {
                    if (that.data.sendtype == '物流配送') {
                      that.setData({
                        state: 3
                      })
                    } else if (that.data.sendtype == '配送员配送') {
                      that.setData({
                        state: 2
                      })
                    }
                  } else if (that.data.quality == 1) {
                    that.setData({
                      state: 5
                    })
                  }
                }
              } else if (that.data.statet == '运送中') {
                if ((that.data.role == '仓管员' && that.data.receiveorsend == '收货') || that.data.role == '生产经理') {
                  that.setData({
                    state: 1
                  })
                } else if (that.data.role == '配送员') {
                  that.setData({
                    state: 2
                  })
                } else if (that.data.role == '仓管员' && that.data.receiveorsend == '退货' && that.data.quality == 0) {
                  if (that.data.sendtype == '物流配送') {
                    that.setData({
                      state: 2
                    })
                  }
                }
              }
            }
          }
        }
      })
    }
    that.setData({
      firstin: false
    })
  }
})
