// pages/goodsReturn/goodsreturnDetail/goodsreturnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateArr:['待审核','审核不过','待取货','运送中','已完成','已返厂','已取消'],
    productsList: [],
    id: '',
    statecolor:'',

    base_info:{},
    des:'',
    give_info:{},
    receiving_info:{},
    return_info:{},
    quality:-1,
    imagelist:[],

    statet:'',
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
    console.log(options)
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var role = wx.getStorageSync('role')
    var that = this
    that.setData({
      id: options.id,
      role: role.role_name,
      token: tokenRoles.token
    })
    if (that.data.firstin) {
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
              statet: that.data.stateArr[res.data.data.base_info.status],
              productsList: res.data.data.product_list,
              base_info: res.data.data.base_info,
              des: res.data.data.des,
              give_info: res.data.data.give_info,
              receiving_info: res.data.data.receiving_info,
              return_info: res.data.data.return_info,
              quality: res.data.data.quality
            })

            if (that.data.give_info.delivery_type==0){
              that.setData({
                sendtype: '配送员'
              })
            } else if (that.data.give_info.delivery_type == 1) {
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
                if (that.data.sendtype == '物流配送') {
                  that.setData({
                    state: 3
                  })
                } else if (that.data.sendtype == '配送员配送') {
                  that.setData({
                    state: 2
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
              } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || (that.data.role == '仓管员' && that.data.receiveorsend == '退货')) {
                if (that.data.sendtype == '物流配送') {
                  that.setData({
                    state: 2
                  })
                }
              }
            } else {
              that.setData({
                state: 0
              })
            }
          }
        }
      })
    }
  },

  receive: function(){
    var that = this
    if (that.data.role == '仓管员'){
      wx.request({
        url: getApp().data.servsers + 'return_documents/confirm', //退货单确认收货
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
            if (res.data.code == 0) {
              that.setData({
                maskshow_2: true,
                markedWords: res.data.msg
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            } else if (res.data.code == 1) {
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
    } else if (that.data.role == '生产经理'){
      wx.request({
        url: getApp().data.servsers + 'return_documents/confirmProduceManager', //退货单确认收货
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
            if (res.data.code == 0) {
              that.setData({
                maskshow_2: true,
                markedWords: res.data.msg
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            } else if (res.data.code == 1) {
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
    }
  },

  getgoods:function(){
    var that = this
    wx.request({
      url: getApp().data.servsers + 'return_documents/confirmCourier', //退货单确认取货
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
          if (res.data.code == 0) {
            that.setData({
              maskshow_2: true,
              markedWords: res.data.msg
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          } else if (res.data.code == 1) {
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

  clear: function(){
    var that = this
    that.setData({
      maskshow:true
    })
  },
  
  send: function () {
    var that = this
    wx.navigateTo({
      url: '../logisticsChoose/logisticsChoose?id=' + that.data.base_info.id
    })
  },

  endtouchmove: function () {
    return false;
  },

  yes: function () {
    //确认取消
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
          if(res.data.code == 0){
            that.setData({
              maskshow_2: true,
              markedWords: res.data.msg
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (!that.data.firstin) {
      wx.request({
        url: getApp().data.servsers + 'return_documents/returnDetail', //获取退货单详情
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
              statet: that.data.stateArr[res.data.data.base_info.status],
              productsList: res.data.data.product_list,
              base_info: res.data.data.base_info,
              des: res.data.data.des,
              give_info: res.data.data.give_info,
              receiving_info: res.data.data.receiving_info,
              return_info: res.data.data.return_info,
              quality: res.data.data.quality
            })

            if (that.data.give_info.delivery_type == 0) {
              that.setData({
                sendtype: '配送员'
              })
            } else if (that.data.give_info.delivery_type == 1) {
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
                if (that.data.sendtype == '物流配送') {
                  that.setData({
                    state: 3
                  })
                } else if (that.data.sendtype == '配送员配送') {
                  that.setData({
                    state: 2
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
              } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || (that.data.role == '仓管员' && that.data.receiveorsend == '退货')) {
                if (that.data.sendtype == '物流配送') {
                  that.setData({
                    state: 2
                  })
                }
              }
            } else {
              that.setData({
                state: 0
              })
            }
          }
        }
      })
    }
    that.setData({
      firstin: false
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
