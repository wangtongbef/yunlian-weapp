// pages/goodsSend/goodssendList/goodssendList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statetext: ['待备货', '待取货', '运送中', '已完成', '已取消'],
    statecolor: ['rgb(1,144,210)', 'rgb(1,144,210)', 'rgb(1,144,210)', 'rgb(88,88,88)', 'rgb(88,88,88)'],

    states: [{ stateId: 0, state: '全部状态' }, { stateId: 1, state: '待备货' }, { stateId: 2, state: '待取货' }, { stateId: 3, state: '运送中' },
    { stateId: 4, state: '已完成' }, { stateId: 5, state: '已取消' }],
    list: [],
    
    stateChecked: 0, //下拉框目录选择
    stateBoxstate: false, //下拉框状态选择

    staterightShow: false,
    statesRight: [],
    staterightChecked: -1,//下拉框目录选择
    staterightBoxstate: false,//下拉框状态选择

    role: '',
    token:'',
    WHkeperType:'发货',
    firstin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      role: wx.getStorageSync('role').role_name,
      token: wx.getStorageSync('tokenRoles').token
    })
    if (that.data.firstin) {
      if (that.data.role == '仓管员') {
        that.setData({
          staterightShow: true,
          statesRight: [{ id: -1, name: '发货' }, { id: 0, name: '收货' }]
        })
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryList', //获取送货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked * -1
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
                list:res.data.data
              })
            }
          }
        }) 
      } else if (that.data.role == '门店负责人') {
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
              console.log(storeList)
              that.setData({
                staterightShow: true,
                statesRight: storeList
              })
            }
          }
        })
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取送货单列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '配送员') {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForCourier', //获取送货列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店销售员') {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForSalesPerson', //获取送货列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } 
    }
  },

  stateBoxhide: function () {
    console.log('stateBoxhide');
    var that = this;
    that.setData({
      stateBoxstate: !that.data.stateBoxstate,
      staterightBoxstate: false
    })
  },

  staterightBoxhide: function () {
    var that = this;
    that.setData({
      stateBoxstate: false,
      staterightBoxstate: !that.data.staterightBoxstate
    })
  },

  stateCheck: function (e) { //状态选择接口请求
    var that = this
    that.setData({
      stateChecked: e.currentTarget.dataset.stateid
    })
    if (that.data.role == '仓管员') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked * -1
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
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryList', //获取收货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked * -1,
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
              console.log(res)
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
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取退货单列表
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
                console.log(res)
                that.setData({
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取退货单列表
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
                console.log(res)
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
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取退货单列表
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
                console.log(res)
                that.setData({
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取退货单列表
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
                console.log(res)
                that.setData({
                  list: res.data.data
                })
              }
            }
          })
        }
      }
    } else if (that.data.role == '配送员') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForCourier', //获取收货订单列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForCourier', //获取收货订单列表
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
              console.log(res)
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
          url: getApp().data.servsers + 'delivery/deliveryListForSalesPerson', //获取收货订单列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForSalesPerson', //获取收货订单列表
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
              console.log(res)
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

  staterightCheck: function (e) { //送货状态接口与门店状态接口
    var that = this
    that.setData({
      staterightChecked: e.currentTarget.dataset.staterightid
    })
    if (that.data.role == '仓管员') {
      if (that.data.stateChecked == 0) {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryList', //获取送货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked * -1
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
                list: res.data.data,
                WHkeperType: that.data.statesRight[e.currentTarget.dataset.staterightid+1].name
              })
            }
          }
        })
      } else {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryList', //获取送货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked * -1,
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
              console.log(res)
              that.setData({
                list: res.data.data,
                WHkeperType: that.data.statesRight[e.currentTarget.dataset.staterightid + 1].name
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
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取送货单列表
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
                console.log(res)
                that.setData({
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取送货单列表
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
                console.log(res)
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
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取送货单列表
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
                console.log(res)
                that.setData({
                  list: res.data.data
                })
              }
            }
          })
        } else if (that.data.staterightChecked != -1) {
          wx.request({
            url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取送货单列表
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
                console.log(res)
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
    console.log(e.currentTarget.dataset.staterightid)
    return false;
  },

  toDetail: function (e) {
    console.log(this.data.list[e.currentTarget.dataset.index])
    if (this.data.role == '仓管员'){
      wx.navigateTo({
        url: '../../goodsSend/goodssendDetail/goodssendDetail?role=' + this.data.role + '&id=' + e.currentTarget.dataset.id + '&WHkeperType=' + this.data.WHkeperType
        // 送货单详情 未处理
      })
    }else{
      wx.navigateTo({
        url: '../../goodsSend/goodssendDetail/goodssendDetail?role=' + this.data.role + '&id=' + e.currentTarget.dataset.id
        // 送货单详情 未处理
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
    that.setData({
      role: wx.getStorageSync('role').role_name,
      token: wx.getStorageSync('tokenRoles').token
    })
    if (!that.data.firstin) {
      if (that.data.role == '仓管员') {
        that.setData({
          staterightShow: true,
          statesRight: [{ id: -1, name: '发货' }, { id: 0, name: '收货' }]
        })
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryList', //获取送货订单列表
          data: {
            token: that.data.token,
            type: that.data.staterightChecked * -1
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
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店负责人') {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForChargePerson', //获取送货单列表
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
          url: getApp().data.servsers + 'delivery/deliveryListForCourier', //获取送货列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } else if (that.data.role == '门店销售员') {
        wx.request({
          url: getApp().data.servsers + 'delivery/deliveryListForSalesPerson', //获取送货列表
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
              console.log(res)
              that.setData({
                list: res.data.data
              })
            }
          }
        })
      } 
    }
    that.setData({
      firstin: false
    })
  }
})