const CONGIF = require("./config.js")

// 域名
const API_BASE_URL = "https://api.it120.cc"

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const request = (url, needSubDomain, method, data) => {
  console.log(CONGIF);
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONGIF.subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      data: data,
      header: {
        'content-Type' : 'application/x-www-form-urlencoded'
      },
      method: method,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete: function(res) {},
    })
  })
}

Promise.prototype.finally = function(callBack) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callBack()).then (
        function() {
          return value;
        }
      )
    },
    function(reason) {
      Promise.resolve(callBack()).then (
        function () {
          return reason;
        }
      );
    }
  );
}

module.exports = {
  formatTime: formatTime,
  request,
  /// 启动页展示图
  banners:(data) => {
    return request('/banner/list',true,'get',data)
  }
}
