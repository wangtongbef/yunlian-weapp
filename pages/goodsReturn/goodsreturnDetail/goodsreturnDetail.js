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
    maskshow: false
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
                state: 1
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
  },

  receive: function(){
    var that = this
    if (that.data.statet == '待取货' && that.data.role == '配送员'){
      console.log('配送员 待取货 确认收货')
    } else if (that.data.statet == '运送中' && that.data.role == '仓管员' && that.data.receiveorsend == '收货'){
      console.log('仓管员 收货 运送中 确认收货')
    } else if (that.data.statet == '运送中' && that.data.role == '生产经理'){
      console.log('生产经理 运送中 确认收货')
    }
  },

  clear: function(){
    var that = this
    that.setData({
      maskshow:true
    })
    // if (that.data.statet == '待取货' && that.data.role == '门店负责人') {
    //   console.log('门店负责人 待取货 取消')
    // } else if (that.data.statet == '待取货' && that.data.role == '门店销售员') {
    //   console.log('门店销售员 待取货 取消')
    // } else if (that.data.statet == '待取货' && that.data.role == '仓管员' && that.data.receiveorsend == '退货') {
    //   console.log('仓管员 待取货 退货 取消')
    // } else if (that.data.statet == '运送中' && that.data.role == '配送员'){
    //   console.log('配送员 运送中 取消')
    // } if (that.data.statet == '运送中' && that.data.role == '门店负责人') {
    //   console.log('门店负责人 运送中 取消')
    // } else if (that.data.statet == '运送中' && that.data.role == '门店销售员') {
    //   console.log('门店销售员 运送中 取消')
    // } else if (that.data.statet == '运送中' && that.data.role == '仓管员' && that.data.receiveorsend == '退货') {
    //   console.log('仓管员 运送中 退货 取消')
    // }
  },
  
  send: function(){
    var that = this
    if (that.data.statet == '待取货' && that.data.role == '门店负责人') {
      console.log('门店负责人 待取货 发货')
    } else if (that.data.statet == '待取货' && that.data.role == '门店销售员') {
      console.log('门店销售员 待取货 发货')
    } else if (that.data.statet == '待取货' && that.data.role == '仓管员' && that.data.receiveorsend == '退货') {
      console.log('仓管员 待取货 退货 发货')
    }
  },

  endtouchmove: function () {
    return false;
  },

  yes: function () {
    //确认取消
    var that = this
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

          } else if (res.data.code == 1){
            
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
