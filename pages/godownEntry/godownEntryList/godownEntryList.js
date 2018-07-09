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
    token:''
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
    console.log(that.data.role)
    if (that.data.role=='仓管员'){
      wx.request({
        url: getApp().data.servsers + 'storage/storageList',
        data: {
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
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
          console.log(res)
          that.setData({
            list: res.data.data
          })
        }
      })
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
              console.log(res)
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
              console.log(res)
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
              console.log(res)
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
              console.log(res)
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
    console.log('扫一扫')
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