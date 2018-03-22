let API_HOST = '';
let DEBUG = true;//切换数据入口
var Mock = require('mock.js')

module.exports = {
  // getlist,
  getTosign,
  getSigned,
  getStoredetail
}

// function getlist(data = '', fn, method = "post", header = {}) {
//   if (!DEBUG) {
//     wx.request({
//       url: config.API_HOST + data,
//       method: method,
//       data: {},
//       header: header ? header : { "Content-Type": "application/json" },
//       success: function (res) {
//         fn(res);
//       }
//     });
//   } else {
//     // 模拟数据
//     var res = Mock.mock({
//       'error_code': '',
//       'error_msg': '',
//       'data': []
//     })
//     // 输出结果
//     // console.log(JSON.stringify(res, null, 2))
//     fn(res);
//   }
// }
function getTosign(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      "data": [
        {
          "id": 1,
          "name": "待签约1",
          "address": "梅龙大道1008号",
          "province": "广东省",
          "city": "深圳市",
          "area": "龙华新区",
          "status": "待签约",
          "charge_person_id": 1,
          "sales_person_id": 0,
          "commissioner_id": 1,
          "longtitude": "12.5161000",
          "latitude": "54.1561500",
          "create_time": "2018-02-26 16:48:09",
          "update_time": "2018-03-14 14:23:10"
        },
        {
          "id": 11,
          "name": "待签约2",
          "address": "而",
          "province": "而",
          "city": "234",
          "area": "234",
          "status": "待签约",
          "charge_person_id": 3,
          "sales_person_id": 0,
          "commissioner_id": 1,
          "longtitude": "0.0000000",
          "latitude": "0.0000000",
          "create_time": "2018-02-28 16:40:44",
          "update_time": "2018-03-06 16:00:03"
        }
      ],
      "code": 0,
      "msg": "操作成功",
      "mack": "mock"
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
function getSigned(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      "data": [
        {
          "id": 1,
          "name": "已签约1",
          "address": "梅龙大道1008号",
          "province": "广东省",
          "city": "深圳市",
          "area": "龙华新区",
          "status": "已签约",
          "charge_person_id": 1,
          "sales_person_id": 0,
          "commissioner_id": 1,
          "longtitude": "12.5161000",
          "latitude": "54.1561500",
          "create_time": "2018-02-26 16:48:09",
          "update_time": "2018-03-14 14:23:10"
        },
        {
          "id": 11,
          "name": "已签约2",
          "address": "而",
          "province": "而",
          "city": "234",
          "area": "234",
          "status": "已签约",
          "charge_person_id": 3,
          "sales_person_id": 0,
          "commissioner_id": 1,
          "longtitude": "0.0000000",
          "latitude": "0.0000000",
          "create_time": "2018-02-28 16:40:44",
          "update_time": "2018-03-06 16:00:03"
        }
      ],
      "code": 0,
      "msg": "操作成功",
      "mack": "mock"
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
function getStoredetail(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      "data": {
        "id": 1,
        "name": "民治店",
        "address": "梅龙大道1008号",
        "province": "广东省",
        "city": "深圳市",
        "area": "龙华新区",
        "status": "待签约",
        "charge_person_id": 1,
        "sales_person_id": 0,
        "commissioner_id": 3,
        "longtitude": "12.5161000",
        "latitude": "54.1561500",
        "create_time": "2018-02-26 16:48:09",
        "update_time": "2018-03-14 11:32:17",
        "commissioner": "yyf",
        "charge_person": "234234",
        "sales": [
          "yyf",
          "234234"
        ]
      },
      "code": 0,
      "msg": "操作成功",
      "mack": "mock"
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
