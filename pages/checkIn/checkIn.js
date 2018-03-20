Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgList:[],
      address:'所在位置',
      isShow: true,
      currentTab: 0,
      checkList:[
        { time: '2017年6月23日', photo:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg',address:'深圳市南山区西丽街道1981文化创意园'},
        { time: '2017年10月5日', photo: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg', address: '深圳市南山区民治街道1982文化创意园' },
        { time: '2017年11月9日', photo: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg', address: '深圳市南山区民治街道1983文化创意园' },
        { time: '2018年1月9日', photo: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg', address: '深圳市南山区民治街道1984文化创意园' },
      ],
      photoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  swichNav: function (e) {
    if (e.target.dataset.current == 1){
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
  //拍照或者从相册选照片
  photo(){
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
  photograph(e){
    //console.log(e.target.dataset.src);
    var current = e.target.dataset.src;
    var that = this;
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: that.data.imgList // 需要预览的图片http链接列表
      })
  },
  
  signedImg(e){
    var that = this;
    var current = e.target.dataset.img;
    var index = e.target.dataset.id;
    var imgArr = [that.data.checkList[index].photo]
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgArr,
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

})