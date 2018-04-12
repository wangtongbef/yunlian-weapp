Page({

  /**
   * 页面的初始数据
   */
  data: {
      codeText:'获取验证码',
      submitDis:true,
      codeDis:true,
      telephone:'',
      btnBackground:'',
      flag:false,
      promptColor:'',
      phonePrompt:'',
      codeDis:true
  },
  //验证手机号码
  phoneVal:function(e){
    console.log(e.detail.value);
    var that = this;
    var telephone = e.detail.value;
    if (/^1[34578]\d{9}$/.test(telephone)) {
      console.log('手机验证通过啦')
      that.setData({
        flag: true,
        phonePrompt: '输入正确',
        promptColor: 'green',
        codeDis: false,
        btnBackground: 'linear-gradient(#018fe8,#0072b1)',
        telephone: telephone
      })
    } else {
      that.setData({
        flag: true,
        phonePrompt: '请输入正确的手机号码格式',
        promptColor: 'red',
        codeDis: true,
        btnBackground: '#C7C7C7'
      })
    }
  },

  //获取验证码
  getCode: function(){
    console.log('hdkah')
    /*wx.request({
      url: 'http://10.10.10.15:8081/user/userList.json',
      success: function(e){
        console.log(e);
      }
    })*/
  }
})