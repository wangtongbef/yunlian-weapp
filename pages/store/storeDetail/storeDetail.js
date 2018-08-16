var getLocation = require('../../../utils/getLocation.js');
// pages/storeDetail/storeDetail.js
// var API = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn:true,
    changeAddress:false,
    newAddress:'',
    isCommissioner: true,
    role:{},
    token:'',
    businessList:[],
    chargePerson:{},
    commissioner:{},
    storeDetailstorge:{},
    storeDetailres:{},
    storeName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      role: wx.getStorageSync('role'),
      token: tokenRoles.token,
      storeDetailstorge: wx.getStorageSync('storeDetail'),
      storeName: wx.getStorageSync('storeName')
    })
    if (that.data.role.role_name == '商务专员') {
      that.setData({
        isCommissioner: true
      })
      wx.request({
        url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
        data: {
          token: that.data.token,
          id: that.data.storeDetailstorge.id
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
              that.setData({
                storeDetailres: res.data.data,
                chargePerson: res.data.data.charge_person,
                businessList: res.data.data.sales
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          }
        }
      })
    } else if (that.data.role.role_name == '门店负责人') {
      that.setData({
        isCommissioner: false
      })
      wx.request({
        url: getApp().data.servsers + 'shop/shopInfoForChargePerson', //获取门店详情
        data: {
          token: that.data.token,
          id: that.data.storeDetailstorge.id
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
            if (res.data.code==0){
              that.setData({
                storeDetailres: res.data.data,
                commissioner: res.data.data.commissioner,
                businessList: res.data.data.sales
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          }
        }
      })
    }
  },
  storeNameChange(){
    wx.navigateTo({
      url: '../changeStoreName/changeStoreName'
    })
  },
  linkMap(){
    var that = this
    if (that.data.role.role_name == '商务专员') {
      getLocation();
      wx.showLoading({
        title: '加载中',
      })
      wx.chooseLocation({
        success: function (res) {
          that.setData({
            newAddress: res.address
          })
          wx.request({
            url: getApp().data.servsers + 'shop/updateShopLocation', //更新门店地址
            data: {
              id: that.data.storeDetailstorge.id,
              token: that.data.token,
              address: res.address,
              longitude: res.longitude,
              latitude: res.latitude
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
                  that.setData({
                    changeAddress: true
                  })
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1000
                  })
                }else{
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
            }
          })
        }
      })
    } else if (that.data.role.role_name == '门店负责人') {
      wx.openLocation({
        latitude: parseFloat(that.data.storeDetailres.shop.latitude),
        longitude: parseFloat(that.data.storeDetailres.shop.longitude),
        name: that.data.storeDetailres.shop.address,
        scale: 28
      })
    }
  },
  
  call(e){
    var phonenumber = e.currentTarget.dataset.phonenumber
    wx.makePhoneCall({
      phoneNumber: phonenumber,
      fail:function(){
        wx.showToast({
          title: '电话拨打失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  addChargeperson(){
    wx.navigateTo({
      url: '../addPerson/addPerson?title=添加门店负责人',
      success:function(){
      }
    })
  },
  addSales() {
    wx.navigateTo({
      url: '../addPerson/addPerson?title=添加门店销售员',
      success: function () {
      }
    })
  },
  //更改用户，跳转到添加用户手机页面
  changePerson(){
    var that=this
    var chargePersonData = {
      token: that.data.token,
      id: that.data.storeDetailres.shop.id,
      charge_person_id: that.data.chargePerson.id
    }
    wx.setStorageSync('chargePersonData', chargePersonData)
    wx.navigateTo({
      url: '../addPerson/addPerson?title=更换门店负责人',
    })
  },

  delPerson(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'shop/deleteShopChargePerson',
      data: {
        token: that.data.token,
        id: that.data.storeDetailres.shop.id,
        charge_person_id: that.data.chargePerson.id
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
            wx.request({
              url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
              data: {
                token: that.data.token,
                id: that.data.storeDetailres.shop.id
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
                    chargePerson: res.data.data.charge_person
                  })
                }
              }
            })
          } else if (res.data.code == 1) {
            wx.hideLoading()
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      }
    })
  },
  deleteBusiness(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(that.data.storeDetailres.shop.id, that.data.businessList[index].id)
    wx.request({
      url: getApp().data.servsers + 'shop/deleteShopSalesPerson',
      data: {
        token: that.data.token,
        id: that.data.storeDetailres.shop.id,
        sales_person_id: that.data.businessList[index].id
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
            wx.request({
              url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
              data: {
                token: that.data.token,
                id: that.data.storeDetailres.shop.id
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
                    businessList: res.data.data.sales
                  })
                }
              }
            })
            wx.showToast({
              title: '删除成功',
              icon: 'none',
              duration: 1000
            })
          } else if(res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      }
    })
  },
  giveUpstore(){
    var that = this
    var storeDetail = that.data.storeDetailstorge
    if (storeDetail.status == '待签约') {
      wx.showModal({
        title: '提示',
        content: '确定不跟踪此店了吗',
        cancelText:'取消',
        confirmText:'确定',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: getApp().data.servsers + 'shop/forgoShop',
              data: {
                token: that.data.token,
                id: storeDetail.id,
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
                    wx.showToast({
                      title: '放弃签约成功',
                      icon: 'none',
                      duration: 1000
                    })
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1000)
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              }
            })
          } else if (res.cancel) {
          }
        }
      })
    } else if (storeDetail.status == '已签约') {
      wx.showModal({
        title: '提示',
        content: '确定要解约此店吗',
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: getApp().data.servsers + 'shop/escapeShop',
              data: {
                token: that.data.token,
                id: storeDetail.id,
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
                    wx.showToast({
                      title: '解约成功',
                      icon: 'none',
                      duration: 1000
                    })
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1000)
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              }
            })
          } else if (res.cancel) {
          }
        }
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var token = that.data.token
    if (!that.data.firstIn && that.data.role.role_name == '商务专员'){
      setTimeout(
        function () {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
            data: {
              token: token,
              id: that.data.storeDetailstorge.id
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
                  storeDetailres: res.data.data,
                  chargePerson: res.data.data.charge_person,
                  businessList: res.data.data.sales,
                  storeName: wx.getStorageSync('storeName')
                })
              }
            }
          })
        }, 100)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that =this
    that.setData({
      firstIn: false
    })
  }
})