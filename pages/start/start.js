
const WXAPI = require('../../utils/util.js')
const CONFIG = require('../../config.js')

var app = getApp();

// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /// 接收数据
    banners:[],
    maxCount:3,
    /// 默认第一个
    swiperCurrent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /// 获取本地保存的版本号
    const app_show_pic_version = wx.getStorageSync("app_show_pic_version");
    console.log(app_show_pic_version);
    console.log(CONFIG.version);
    /// 如果存储版本号存在，并且等于当前的版本
    if(app_show_pic_version && app_show_pic_version == CONFIG.version) {
      wx.switchTab({
        /// 跳转首页
        url: '/pages/index/index'
      })
    } else {
      /// 发送请求获取数据
      WXAPI.banners({
        type : 'app'  /// 传入参数
      }).then(function (res) {
        console.log(res);
        /// 700:代表暂无数据，跳转首页
        if(res.code == 700) {
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          that.setData({
            banners : res.data,
            maxCount : res.data.length
          });
        }
      }).catch(function(e) { /// 请求失败，跳转首页
        wx.switchTab({
          url: '/pages/index/index'
        });
      })
    }
  },

  swiperChange:function(e) {
    this.setData({
      swiperCurrent : e.detail.current
    })
  },

 
  gotoIndex: function(e) {
     /// 跳转首页
   wx.switchTab({
     url: '/pages/index/index',
     complete: function(res) {
       /// 跳转成功 保存必要数据
       wx.setStorage({
         key: 'app_show_pic_version',
         data: CONFIG.version
       });
     },
   });
  }
})