var chooseLocation = require('../../utils/getLocation.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgList:[],
      position: '',
      address:'所在位置',
      isShow: true,
      currentTab: 0,
      checkList:[
        { time: '2017年6月23日', image:'dev2.lystrong.cn/upload/signin/d82d302c-511e-513c-f534-d4cdc4ea9e78.png',address:'深圳市南山区西丽街道1981文化创意园'},
        { time: '2017年10月5日', image: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg', address: '深圳市南山区民治街道1982文化创意园' },
        { time: '2017年11月9日', image: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg', address: '深圳市南山区民治街道1983文化创意园' },
        { time: '2018年1月9日', image: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1520153152&di=9f7bac5e5f09ef15454137761f1e788b&src=http://img1.3lian.com/2015/a1/95/d/105.jpg', address: '深圳市南山区民治街道1984文化创意园' },
      ],
      photoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  swichNav: function (e) {
    var tokenRoles = wx.getStorageSync('tokenRoles');
    if (e.target.dataset.current == this.data.currentTab) {
      return false;
    }else if (e.target.dataset.current == 0){
      this.setData({
        currentTab: 0,
        isShow: true
      })
    } else if (e.target.dataset.current == 1) {
      wx.request({
        url: getApp().data.servsers + 'sign_in/list',
        data: {
          page: 0,
          token: tokenRoles.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
        }
      })
      this.setData({
        currentTab: 1,
        isShow: false
      })
    }
    // if (this.data.currentTab === e.target.dataset.current) {
    //   return false;
    // } else {
    //   var showMode = e.target.dataset.current == 0;
    //   this.setData({
    //     currentTab: e.target.dataset.current,
    //     isShow: showMode
    //   })
    // }
  },
  //拍照或者从相册选照片
  photo(){
    var tokenRoles = wx.getStorageSync('tokenRoles');
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // wx.uploadFile({
        //   url: getApp().data.servsers + 'sign_in/mark', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     token: tokenRoles.token
        //   },
        //   success: function (res) {
        //     console.log(res)
        //     var data = res.data
        //     //do something
        //   }
        // })
        console.log(res)
        that.setData({
          imgList: tempFilePaths
        })
        
      }
    })
  },
  //预览图片
  // photograph(e){
  //   //console.log(e.target.dataset.src);
  //   var current = e.target.dataset.src;
  //   var that = this;
  //     wx.previewImage({
  //       current: current, // 当前显示图片的http链接
  //       urls: that.data.imgList // 需要预览的图片http链接列表
  //     })
  // },
  
  // signedImg(e){
  //   var that = this;
  //   var current = e.target.dataset.img;
  //   var index = e.target.dataset.id;
  //   var imgArr = [that.data.checkList[index].photo]
  //   wx.previewImage({
  //     current: current, // 当前显示图片的http链接
  //     urls: imgArr,
  //   })
    
  // },

  getadress() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          address: res.name,
          position: res.latitude + ',' + res.longitude
        })
        // console.log(that.data.address)
        // console.log(that.data.position)
      },
      fail: function (res) {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation']) {
              return
            } else {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                confirmText: '授权',
                //content: '需要授权您的位置信息后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
                content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
                success: (res) => {
                  console.log(res);
                  //开启授权
                  wx.openSetting({
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  signIn(){
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles');
    wx.uploadFile({
      url: getApp().data.servsers + 'sign_in/mark', //仅为示例，非真实的接口地址
      filePath: that.data.imgList[0],
      name: 'image',
      formData: {
        token: tokenRoles.token, 
        position: that.data.position,
        address: that.data.address
      },
      success: function (res) {
        console.log(res)
        var data = res.data
        //do something
      }
    })
    // wx.request({
    //   url: getApp().data.servsers + 'sign_in/mark',
    //   data: {
    //     image: that.data.imgList,
    //     position: that.data.position,
    //     address: that.data.address,
    //     token: tokenRoles.token
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

})