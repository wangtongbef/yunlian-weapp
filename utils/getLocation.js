var getLocation = function(){
  wx.getLocation({
    type: 'gcj02',
    success: function(res) {
      console.log(res);
    },
    fail:function(res){
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        confirmText: '授权',
        //content: '需要授权您的公开信息(昵称、头像等)后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
        content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮,退出小程序请点击右上角按钮',
        success: (res) => {
          console.log(res);
          //开启授权
          wx.openSetting({
            success: (res) => {
              //console.log(res);                
              if (res.authSetting['scope.userLocation']) {
                console.log('授权啦')
              } else {  //用户仍然拒绝的情况
                console.log('未授权');
                getLocation();
              }
            },
          })

        }
      })
    }
  })
}
module.exports = getLocation;