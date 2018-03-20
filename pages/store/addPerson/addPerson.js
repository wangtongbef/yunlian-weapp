// pages/addPerson/addPerson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonePrompt:'',
    promptColor:'',
    disabled:true,
    btnBackground:'',
    previewHidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
 
  phoneVal(e){
    //console.log(e.detail.value)
    var that = this; 
    var telephone = e.detail.value;
    if (/^1[34578]\d{9}$/.test(telephone)){
      that.setData({
        phonePrompt:'输入正确',
        promptColor:'green',
        disabled:false,
        btnBackground: 'linear-gradient(#018fe8,#0072b1)',
      })
    }else{
      that.setData({
        phonePrompt: '请输入正确的手机号码格式',
        promptColor: 'red',
        disabled: false,
        btnBackground: '#C7C7C7'
      })
    }
  },
  formSubmit(){
    console.log('点了下一步');
    var that = this;
    that.setData({
      previewHidden:true
    })
  },
  refill(){
    var that = this;
    that.setData({
      previewHidden: false
    })
  },
  confirm(){
    wx.showModal({
      title:'提示',
      content:'当前用户为其他角色,请联系管理员',
      showCancel:false,
      confirmText:'知道了',
      success:function(){
        console.log('hahah')
      }
    })
  }
})