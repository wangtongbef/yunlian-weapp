// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    flag:true,
    isShow: true,
    currentTab: 0,
    storeList:[
      {name:'西丽天虹店'},
      { name: '民治天虹店' },
      { name: '保安天虹店' },
      { name: '福田天虹店' },
      { name: '南山天虹店' }
    ],
    signedList:[
      { time: '2018年01月18日', name: '民治新区门店', img:'https://car2.autoimg.cn/cardfs/product/g24/M0A/9F/F7/t_autohomecar__wKgHH1qdNBOAMWbFAA3mrvNZy6w507.jpg'},
      { time: '2018年10月09日', name: '丽人门店', img: 'https://car2.autoimg.cn/cardfs/product/g24/M0A/9F/F7/t_autohomecar__wKgHH1qdNBOAMWbFAA3mrvNZy6w507.jpg' }
    ]
  },
  swichNav: function (e) {
    if (e.target.dataset.current == 1) {
      //获取后台接口，展示签到记录
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  changeStore(e){
    console.log(e.target.dataset.id)
    this.setData({
      flag:false
    })
  },
  //拍照或者从相册选照片
  photo() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          imgList: tempFilePaths
        })
      }
    })
  },
  //预览图片
  photograph(e) {
    //console.log(e.target.dataset.src);
    var current = e.target.dataset.src;
    var that = this;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data.imgList // 需要预览的图片http链接列表
    })
  },
  signedImg(e) {
    var that = this;
    var current = e.target.dataset.img;
    var index = e.target.dataset.id;
    var imgArr = [that.data.signedList[index].img]
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgArr,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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