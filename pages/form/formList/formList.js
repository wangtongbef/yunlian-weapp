Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList:[
      { icon:'../../../img/sale.svg',text:'销售报表'},
      { icon: '../../../img/sign.svg', text: '签约报表' },
    ]
  },
  onLoad: function (options) {
    
  },
  link(e){
    if (e.currentTarget.id == 0){
      wx.navigateTo({
        url: '../saleForm/saleForm',
      })
    }
    if (e.currentTarget.id == 1) {
      wx.navigateTo({
        url: '../signForm/signForm',
      })
    }
  }
})