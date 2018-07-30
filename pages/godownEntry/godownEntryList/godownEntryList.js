// pages/godownEntry/godownEntryList/godownEntryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    states: [{ stateId: -1, state: '全部状态' }, { stateId: 0, state: '待确认' }, { stateId: 1, state: '已入库' }, { stateId: 2, state:'已取消'}],
    list: [],
    stateChecked: -1,
    stateBoxstate: false,
    role:'',
    token:'',
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
      token: tokenRoles.token,
      role: role.role_name
    })
    if(that.data.firstin){
      wx.showLoading({
        title: '加载中',
      })
      if (that.data.role=='仓管员'){
        wx.request({
          url: getApp().data.servsers + 'storage/storageList',
          data: {
            token: that.data.token
          },
          method: 'POST',
          success: function (res) {
            wx.hideLoading()
            that.setData({
              list: res.data.data
            })
          }
        })
      } else if (that.data.role == '配送员') {
        wx.request({
          url: getApp().data.servsers + 'storage/storageListForCourier',
          data: {
            token: that.data.token
          },
          method: 'POST',
          success: function (res) {
            wx.hideLoading()
            that.setData({
              list: res.data.data
            })
          }
        })
      }
    }
  },

  stateBoxhide: function (e) {
    console.log('stateBoxhide');
    var that = this;
    that.setData({
      stateBoxstate: !that.data.stateBoxstate
    })
  },

  stateCheck: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      stateChecked: e.currentTarget.dataset.stateid
    })
    setTimeout(function(){that.setData({
        stateBoxstate: !that.data.stateBoxstate
      })
      if (that.data.stateChecked == -1) {
        console.log(that.data.stateChecked)
        if (that.data.role == '仓管员') {
          wx.request({
            url: getApp().data.servsers + 'storage/storageList',
            data: {
              token: that.data.token
            },
            method: 'POST',
            success: function (res) {
              wx.hideLoading()
              that.setData({
                list: res.data.data
              })
            }
          })
        } else if (that.data.role == '配送员') {
          wx.request({
            url: getApp().data.servsers + 'storage/storageListForCourier',
            data: {
              token: that.data.token
            },
            method: 'POST',
            success: function (res) {
              wx.hideLoading()
              that.setData({
                list: res.data.data
              })
            }
          })
        }
      }else{
        console.log(that.data.stateChecked)
        if (that.data.role == '仓管员') {
          wx.request({
            url: getApp().data.servsers + 'storage/storageList',
            data: {
              token: that.data.token,
              status: that.data.stateChecked
            },
            method: 'POST',
            success: function (res) {
              wx.hideLoading()
              that.setData({
                list: res.data.data
              })
            }
          })
        } else if (that.data.role == '配送员') {
          wx.request({
            url: getApp().data.servsers + 'storage/storageListForCourier',
            data: {
              token: that.data.token,
              status: that.data.stateChecked
            },
            method: 'POST',
            success: function (res) {
              wx.hideLoading()
              that.setData({
                list: res.data.data
              })
            }
          })
        }
      }
    },10)
  },

  toDetail: function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../godownEntry/godownentryDetail/godownentryDetail?id=' + e.currentTarget.dataset.id
    })
  },

  inStorage: function(){
    wx.navigateTo({
      url: '../../godownEntry/inStorage/inStorage'   //扫码页面
    })
  },

  endtouchmove: function () {
    return false;
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
      wx.showLoading({
        title: '加载中',
      })
      var tokenRoles = wx.getStorageSync('tokenRoles')
      var role = wx.getStorageSync('role')
      that.setData({
        token: tokenRoles.token,
        role: role.role_name
      })
      if (that.data.role == '仓管员') {
        wx.request({
          url: getApp().data.servsers + 'storage/storageList',
          data: {
            token: that.data.token
          },
          method: 'POST',
          success: function (res) {
            wx.hideLoading()
            that.setData({
              list: res.data.data
            })
          }
        })
      } else if (that.data.role == '配送员') {
        wx.request({
          url: getApp().data.servsers + 'storage/storageListForCourier',
          data: {
            token: that.data.token
          },
          method: 'POST',
          success: function (res) {
            wx.hideLoading()
            that.setData({
              list: res.data.data
            })
          }
        })
      }
    }
    that.setData({
      firstin: false
    })
  }
})