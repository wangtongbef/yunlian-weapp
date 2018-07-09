// pages/godownEntry/inStorage/inStorage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    productList:[],
    sendType:1,
    comfirmState:1,
    markedWords:'',
    maskshow:false
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
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        that.setData({
          comfirmState: 1
        })
      }
    })
  },

  Continue:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  },

  confirm: function(){ //确认产品数量
    var that = this
    function maskconfirm() {
      that.setData({
        maskshow: false
      })
      if (that.data.markedWords == '确认成功') {
        that.setData({
          comfirmState: 2,
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
    wx.request({
      url: getApp().data.servsers + 'storage/storageInfo',
      data: {
        token: that.data.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        console.log(res.data.data.product_list)
        if (res.data.code == -3) {
          wx.showToast({
            title: 'token过期',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../login/login'
            })
          }, 1000)
        } else {
          if (res.data.code == 0) {
            that.setData({
              productList: res.data.data.product_list,
              sendType: res.data.data.from_type,
              markedWords: '确认成功',
              maskshow: true
            })
          } else if (res.data.code == 1){
            that.setData({
              markedWords: '产品来源不一致,请重新扫描',
              maskshow: true
            })
          } else if (res.data.code == 2) {
            that.setData({
              markedWords: '部分产品来源不正确,请重新扫描',
              maskshow: true
            })
          } else if (res.data.code == 3) {
            that.setData({
              markedWords: '部分产品质量有问题,请重新扫描',
              maskshow: true
            })
          } else if (res.data.code == 4) {
            that.setData({
              markedWords: '部分产品被锁定,请重新扫描',
              maskshow: true
            })
          }
          setTimeout(function(){that.setData({
              maskshow: false
            })
            if (that.data.markedWords == '确认成功') {
              that.setData({
                comfirmState: 2,
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
          }}, 1000)
        }
      }
    })
  },

  submit:function(){
    var that = this
    wx.request({
      url: getApp().data.servsers + 'storage/storage',
      data: {
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
              url: '../login/login'
            })
          }, 1000)
        } else {
          if (res.data.code == 0) {
            that.setData({
              markedWords: '操作成功',
              maskshow: true
            })
            setTimeout(function () {
              that.setData({
                maskshow: false
              })
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          } else if (res.data.code == 1) {
            that.setData({
              markedWords: '入库失败',
              maskshow: true
            })
          }
        }
      }
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