// pages/goodsSend/goodssendDetail/goodssendDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    role:'仓管员',
    WHkeperType:'发货',
    sendStep:'待取货',
    sendType:'配送员'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (that.data.role == '仓管员'){
      if (that.data.WHkeperType == '发货'){
        if (that.data.sendStep == '待备货') {
          that.setData({
            state: 1,
          })
        } else if (that.data.sendStep == '待取货') {
          if (that.data.sendType=='配送员'){
            that.setData({
              state: 2,
            })
          } else if (that.data.sendType == '物流'){
            that.setData({
              state: 3,
            })
          }
        } else if (that.data.sendStep == '运送中'){
          if (that.data.sendType == '物流'){
            that.setData({
              state: 2,
            })
          }
        }
      } else if (that.data.WHkeperType == '收货'){
        if (that.data.sendStep == '运送中'){
          that.setData({
            state: 4,
          })
        }
      }
    } else if (that.data.role == '配送员'){
      if (that.data.sendStep == '运送中'){
        that.setData({
          state: 2,
        })
      } else if (that.data.sendStep == '待取货'){
        that.setData({
          state: 4,
        })
      }
    } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员'){
      if (that.data.sendStep == '运送中'){
        that.setData({
          state: 4,
        })
      }
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