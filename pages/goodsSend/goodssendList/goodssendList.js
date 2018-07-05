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
    list: [{ numbers: 'ps1111111', time: "2018-06-07  16:16", state: 1, listtype:'紧急'},
      { numbers: 'ps2222222', time: "2018-06-07  16:16", state: 2, listtype: '紧急'},
      { numbers: 'ps33333333', time: "2018-06-07  16:16", state: 3, listtype: '普通'},
      { numbers: 'ps44444444', time: "2018-06-07  16:16", state: 4, listtype: '紧急'},
      { numbers: 'ps55555555', time: "2018-06-07  16:16", state: 5, listtype: '普通'}],
    
    stateChecked: 0, //下拉框目录选择
    stateBoxstate: false, //下拉框状态选择

    staterightShow: false,
    statesRight: [],
    staterightChecked: 0,//下拉框目录选择
    staterightBoxstate: false,//下拉框状态选择

    role: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      role: options.role,
    })
    if (that.data.role == '仓管员') {
      that.setData({
        staterightShow: true,
        statesRight: [{ stateId: 0, state: '发货' }, { stateId: 1, state: '收货' }]
      })
    } else if (that.data.role == '门店负责人') {
      that.setData({
        staterightShow: true,
        statesRight: [{ stateId: 0, state: '全部门店' }, { stateId: 1, state: '门店一' }, { stateId: 2, state: '门店儿' }, { stateId: 3, state: '门店删' }]
      })
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
    setTimeout(function () {
      that.setData({
        staterightBoxstate: !that.data.staterightBoxstate
      })
    }, 10)
    console.log(e.currentTarget.dataset.staterightid)
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