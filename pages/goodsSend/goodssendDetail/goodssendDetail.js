// pages/goodsSend/goodssendDetail/goodssendDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn:true,
    id:'',
    WHkeperType:'',
    token:'',
    state:0,
    role:'',
    sendStep:'',
    sendType:'',
    steptext: ['待备货', '待取货', '运送中', '已完成', '已取消'],
    sendTypetext: ['配送员','物流'],
    maskshow: false,

    base_info:{},
    from_info:{},
    give_info:{},
    receive_info:{},
    product_list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      token: wx.getStorageSync('tokenRoles').token,
      role: wx.getStorageSync('role').role_name,
      id: options.id,
      WHkeperType: options.WHkeperType
    })
    wx.request({
      url: getApp().data.servsers + 'delivery/deliveryDetail', //获取送货单列表
      data: {
        token: that.data.token,
        id:that.data.id
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
          console.log(res)
          that.setData({
            sendStep: that.data.steptext[res.data.data.base_info.status],
            sendType: that.data.sendTypetext[res.data.data.give_info.delivery_type],
            base_info: res.data.data.base_info,
            from_info: res.data.data.from_info,
            give_info: res.data.data.give_info,
            receive_info: res.data.data.receive_info,
            product_list: res.data.data.product_list
          })
        }
      }, 
      complete: function(){
        that.setData({
          firstIn: false
        })
        if (that.data.role == '仓管员') {
          if (that.data.WHkeperType == '发货') {
            if (that.data.sendStep == '待备货') {
              that.setData({
                state: 1,
              })
            } else if (that.data.sendStep == '待取货') {
              if (that.data.sendType == '配送员') {
                that.setData({
                  state: 2,
                })
              } else if (that.data.sendType == '物流') {
                that.setData({
                  state: 3,
                })
              }
            } else if (that.data.sendStep == '运送中') {
              if (that.data.sendType == '物流') {
                that.setData({
                  state: 2,
                })
              }
            }
          } else if (that.data.WHkeperType == '收货') {
            if (that.data.sendStep == '运送中') {
              that.setData({
                state: 4,
              })
            }
          }
        } else if (that.data.role == '配送员') {
          if (that.data.sendStep == '运送中') {
            that.setData({
              state: 2,
            })
          } else if (that.data.sendStep == '待取货') {
            that.setData({
              state: 4,
            })
          }
        } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员') {
          if (that.data.sendStep == '运送中') {
            that.setData({
              state: 4,
            })
          }
        }
      }
    })
  },

  stockUp:function(){
    var that = this
    wx.navigateTo({
      url: '../stockUp/stockUp?id=' + that.data.base_info.id
    })
  },

  clear: function(){
    var that = this
    that.setData({
      maskshow: true
    })
  },

  endtouchmove: function () {
    return false;
  },

  yes: function () {
    var that = this
    wx.request({
      url: getApp().data.servsers + 'delivery/cancelDelivery', //取消送货单
      data: {
        token: that.data.token,
        id: that.data.base_info.id
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
          console.log(res)
          if (res.data.code == 0) {
            that.setData({
              maskshow: false
            })
            wx.showToast({
              title: '取消送货单成功',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          } else if (res.data.code == 1) {
            that.setData({
              maskshow: false
            })
            wx.showToast({
              title: '取消送货单失败',
              icon: 'none',
              duration: 1000
            })
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

  send:function(){
    var that = this
    wx.navigateTo({
      url: '../logisticsChoose/logisticsChoose?id=' + that.data.base_info.id
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
    if (!that.data.firstIn){
      that.setData({
        token: wx.getStorageSync('tokenRoles').token,
        role: wx.getStorageSync('role').role_name
      })
      wx.request({
        url: getApp().data.servsers + 'delivery/deliveryDetail', //获取送货单详情
        data: {
          token: that.data.token,
          id: that.data.id
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
            console.log(res)
            that.setData({
              sendStep: that.data.steptext[res.data.data.base_info.status],
              sendType: that.data.sendTypetext[res.data.data.give_info.delivery_type],
              base_info: res.data.data.base_info,
              from_info: res.data.data.from_info,
              give_info: res.data.data.give_info,
              receive_info: res.data.data.receive_info,
              product_list: res.data.data.product_list
            })
          }
        },
        complete: function () {
          if (that.data.role == '仓管员') {
            if (that.data.WHkeperType == '发货') {
              if (that.data.sendStep == '待备货') {
                that.setData({
                  state: 1,
                })
              } else if (that.data.sendStep == '待取货') {
                if (that.data.sendType == '配送员') {
                  that.setData({
                    state: 2,
                  })
                } else if (that.data.sendType == '物流') {
                  that.setData({
                    state: 3,
                  })
                }
              } else if (that.data.sendStep == '运送中') {
                if (that.data.sendType == '物流') {
                  that.setData({
                    state: 2,
                  })
                }
              }
            } else if (that.data.WHkeperType == '收货') {
              if (that.data.sendStep == '运送中') {
                that.setData({
                  state: 4,
                })
              }
            }
          } else if (that.data.role == '配送员') {
            if (that.data.sendStep == '运送中') {
              that.setData({
                state: 2,
              })
            } else if (that.data.sendStep == '待取货') {
              that.setData({
                state: 4,
              })
            }
          } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员') {
            if (that.data.sendStep == '运送中') {
              that.setData({
                state: 4,
              })
            }
          }
        }
      })
    }
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