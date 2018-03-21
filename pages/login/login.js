var getUser = require('../../utils/getUser.js');

Page({
  data:{
      nickName:'',
      avatarUrl:'',
      telephone:'',
      flag:false,
      phonePrompt:'',
      codePrompt:'',
      promptColor:'',
      btnBackground:'',
      codeText:'获取验证码',
      time:60,
      codeShow:false,
      codeDis:true,
      submitDis:true,
      codeT:'',
      submitBg:''
  },
  onLoad:function(){
    getUser()
  },
  //手机号码验证
  phoneVal:function(e){
      var that = this; 
      //console.log(e.detail.value);
      var telephone = e.detail.value;
      if (/^1[34578]\d{9}$/.test(telephone)){
        console.log('手机验证通过啦')
        that.setData({
          flag: true,
          phonePrompt: '输入正确',
          promptColor:'green',
          codeDis:false,
          btnBackground: 'linear-gradient(#018fe8,#0072b1)',
          telephone: telephone
        })
      }else{
        that.setData({
          flag:true,
          phonePrompt:'请输入正确的手机号码格式',
          promptColor: 'red',
          codeDis: true,
          btnBackground:'#C7C7C7',
          submitBg: '',
          submitDis: true
        })
      }
  },
  //发送验证码
  sendCode:function(){
    var code = (wx.getStorageSync('code'));
    var that = this;
    console.log(code)
    wx.request({
      url: 'http://dev2.lystrong.cn/api/weapp/v1/login/sendMsg/',
      method: 'POST',
      data:{
        phone:this.data.telephone, 
        token: 'abc'
      },
      success:function(e){
        console.log(e)
        that.setData({
          btnBackground: '#C7C7C7',
          codeShow: true,
          codeDis: true
        })
        var time = that.data.time;
        var timer = setInterval(function () {
          time--;
          that.setData({
            time: time
          })
          if(time === 0){
            clearInterval(timer)
            that.setData({
              time: 60,
              codeShow:false,
              codeDis:false,
              btnBackground: 'linear-gradient(#018fe8,#0072b1)'
            })
            return;
          }
        }, 1000)
        
      },
      fail:function(e){
        console.log(e)
      }
    })
  },

  codeVal(e){
    var that = this;
    var value = e.detail.value;
    if(value.length > 5){
      that.setData({
        submitBg: 'linear-gradient(#018fe8,#0072b1)',
        submitDis:false
      })
    }else{
      that.setData({
        submitBg: '',
        submitDis: true
      })
    }
  },
  //登录
  navigatorBtn(e){
    console.log(e.detail.value)
    /*wx.navigateTo({
      url: '../index/index',
    })*/
  }
})