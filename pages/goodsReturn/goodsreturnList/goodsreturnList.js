// pages/goodsReturn/goodsreturnList/goodsreturnList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statetext: ['待审核', '审核不过', '待取货', '运送中', '已完成', '已返厂', '已取消'],
    statecolor: ['rgb(1,144,210)', 'rgb(88,88,88)', 'rgb(1,144,210)', 'rgb(1,144,210)', 'rgb(88,88,88)', 'rgb(88,88,88)', 'rgb(88,88,88)'],

    states: [{ stateId: 0, state: '全部状态' }, { stateId: 1, state: '待审核' }, { stateId: 2, state: '审核不过' }, { stateId: 3, state: '待取货' }, { stateId: 4, state: '运送中' },
      { stateId: 5, state: '已完成' }, { stateId: 6, state: '已返厂' }, { stateId: 7, state: '已取消' }], //stateId-1==status
    list: [],
    stateChecked: 0, //下拉框目录选择
    stateBoxstate: false, //下拉框状态选择

    staterightShow: false,
    statesRight: [],
    staterightChecked: -1,
    staterightBoxstate: false,

    role: '',
    token:'',
    applicationButton: false,
    firstin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var role = wx.getStorageSync('role')
    that.setData({
      role: role.role_name,
      token: tokenRoles.token
    })
    if (that.data.firstin){
      if (that.data.role == '仓管员'){
        that.setData({
          staterightShow: true,
          statesRight: [{ id: -1, name: '收货' }, { id: 0, name: '退货' }]
        })
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked + 1
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店负责人'){
        var storeList
        wx.request({
          url: getApp().data.servsers + 'shop/signingShopsForChargePerson', //获取门店列表
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
              storeList = [{ id: -1, name: '全部门店' }].concat(res.data.data)
              that.setData({
                staterightShow: true,
                statesRight: storeList
              })
            }
          }
        })
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '生产经理') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForProduceManager', //获取退货列表
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '配送员') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForCourier', //获取退货列表
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店销售员') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForSales', //获取退货列表
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
                list: res.data.data
              })
            }
          }
        })
      } 
    }

    if (that.data.role == '配送员' || that.data.role == '生产经理') {
      that.setData({
        applicationButton: false
      })
    } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || that.data.role == '仓管员') {
      that.setData({
        applicationButton: true
      })
    }
  },

  stateBoxhide: function () {
    var that = this;
    that.setData({
      stateBoxstate: !that.data.stateBoxstate,
      staterightBoxstate: false
    })
  },

  staterightBoxhide: function(){
    var that = this;
    that.setData({
      stateBoxstate: false,
      staterightBoxstate: !that.data.staterightBoxstate
    })
  },

  stateCheck: function (e) { //状态选择接口请求
    var that = this
    that.setData({
      stateChecked: e.currentTarget.dataset.stateid //选中的stateid==status+1
    })
    if (that.data.role == '仓管员') {
      if (that.data.stateChecked == 0){
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked + 1
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
                list: res.data.data
              })
            }
          }
        })
      }else{
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked + 1,
            status: that.data.stateChecked - 1
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
                list: res.data.data
              })
            }
          }
        })
      }
    } else if (that.data.role == '门店负责人') {
      var storeList
      if (that.data.stateChecked == 0){
        if (that.data.staterightChecked == -1){
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
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
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1){
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
            data: {
              token: that.data.token,
              shop_id: that.data.staterightChecked
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
                  list: res.data.data
                })
              }
            }
          })
        }
      } else if(that.data.stateChecked != 0){
        if (that.data.staterightChecked == -1) {
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
            data: {
              token: that.data.token,
              status: that.data.stateChecked - 1
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
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
            data: {
              token: that.data.token,
              shop_id: that.data.staterightChecked,
              status: that.data.stateChecked - 1
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
                  list: res.data.data
                })
              }
            }
          })
        }
      }
    } else if (that.data.role == '生产经理') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForProduceManager', //获取收货订单列表
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
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForProduceManager', //获取收货订单列表
          data: {
            token: that.data.token,
            status: that.data.stateChecked - 1
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
                list: res.data.data
              })
            }
          }
        })
      }
    } else if (that.data.role == '配送员') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForCourier', //获取收货订单列表
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
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForCourier', //获取收货订单列表
          data: {
            token: that.data.token,
            status: that.data.stateChecked - 1
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
                list: res.data.data
              })
            }
          }
        })
      }
    } else if (that.data.role == '门店销售员') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForSales', //获取收货订单列表
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
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForSales', //获取收货订单列表
          data: {
            token: that.data.token,
            status: that.data.stateChecked - 1
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
                list: res.data.data
              })
            }
          }
        })
      }
    } 
    setTimeout(function () {
      that.setData({
        stateBoxstate: !that.data.stateBoxstate
      })
    }, 10)
    return false;
  },

  staterightCheck: function (e) { //退货状态接口与门店状态接口
    var that = this
    that.setData({
      staterightChecked: e.currentTarget.dataset.staterightid
    })
    if (that.data.role == '仓管员') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked + 1
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
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked + 1,
            status: that.data.stateChecked - 1
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
                list: res.data.data
              })
            }
          }
        })
      }
    } else if (that.data.role == '门店负责人') {
      var storeList
      if (that.data.stateChecked == 0) {
        if (that.data.staterightChecked == -1) {
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
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
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
            data: {
              token: that.data.token,
              shop_id: that.data.staterightChecked
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
                  list: res.data.data
                })
              }
            }
          })
        }
      } else if (that.data.stateChecked != 0) {
        if (that.data.staterightChecked == -1) {
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
            data: {
              token: that.data.token,
              status: that.data.stateChecked - 1
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
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
            data: {
              token: that.data.token,
              shop_id: that.data.staterightChecked,
              status: that.data.stateChecked - 1
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
                  list: res.data.data
                })
              }
            }
          })
        }
      }
    }
    setTimeout(function () {
      that.setData({
        staterightBoxstate: !that.data.staterightBoxstate
      })
    }, 10)
    return false;
  },

  toDetail: function (e) {
    var that = this
    if(that.data.role == '仓管员'){
      if (that.data.staterightChecked==-1){
        wx.navigateTo({
          url: '../../goodsReturn/goodsreturnDetail/goodsreturnDetail?receiveorsend=收货&id=' + e.currentTarget.dataset.id
          // 退货单详情
        })
      } else if (that.data.staterightChecked == 0){
        wx.navigateTo({
          url: '../../goodsReturn/goodsreturnDetail/goodsreturnDetail?receiveorsend=退货&id=' + e.currentTarget.dataset.id
          // 退货单详情
        })
      }
    }else{
      wx.navigateTo({
        url: '../../goodsReturn/goodsreturnDetail/goodsreturnDetail?id=' + e.currentTarget.dataset.id
        // 退货单详情
      })
    }
  },

  toApplication: function () {
    var role = wx.getStorageSync('role').role_name
    if (role=='门店负责人'){
      wx.navigateTo({
        url: '../../goodsReturn/returnStorecheck/returnStorecheck'
        // 申请退货
      })
    }else{
      wx.navigateTo({
        url: '../../goodsReturn/reeturnConfirm/reeturnConfirm'
        // 申请退货
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
    var that = this;
    if (!that.data.firstin) {
      that.setData({
        role: wx.getStorageSync('role').role_name,
        token: wx.getStorageSync('tokenRoles').token
      })
      if (that.data.role == '仓管员') {
        that.setData({
          staterightShow: true,
          statesRight: [{ id: -1, name: '收货' }, { id: 0, name: '退货' }]
        })
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked + 1
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店负责人') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForChargePerson', //获取退货单列表
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '生产经理') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForProduceManager', //获取退货列表
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '配送员') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForCourier', //获取退货列表
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店销售员') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnListForSales', //获取退货列表
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
                list: res.data.data
              })
            }
          }
        })
      }

      if (that.data.role == '配送员' || that.data.role == '生产经理') {
        that.setData({
          applicationButton: false
        })
      } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || that.data.role == '仓管员') {
        that.setData({
          applicationButton: true
        })
      }
    }
    that.setData({
      firstin: false
    })
  }
})