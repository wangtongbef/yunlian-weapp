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
        content: '需要授权您的位置信息后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
        // content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮,退出小程序请点击右上角按钮',
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
          // 调起客户端小程序设置界面，返回用户设置的操作结果。
        }
      })
      // 显示模态弹窗
    }
  })
  // 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
}
module.exports = getLocation;