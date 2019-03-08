
const app = getApp()
const WXAPI = require('../../utils/util.js')
const CONFIG = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0.00,
    freeze:0,
    score:0,
    score_sign_continuous:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo) {
      app.goLoginPageTimeOut();
    } else {
      that.setData({
        userInfo:userInfo,
        version:CONFIG.version
      })
    }
    this.getUserApiInfo();
    this.getUserAmount();
  },

  getPhoneNumber:function(e) {
    console.log(e);
    if (!e.detail.errMsg || e.detail.errMsg != 'getPhoneNumber:ok') {
      wx.showModal({
        title: '提示',
        content: '无法获取手机号码',
        showCancel:false
      })
      return;
    }
    var that = this;
    WXAPI.bindMobile({
      token:wx.getStorageSync('token'),
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv
    }).then(function(res) {
      console.log(res);
      if(res.code == 0) {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '绑定失败',
          showCancel: false
        })
      }
    });
  },
  
  getUserApiInfo:function() {
    var that = this;
    WXAPI.userDetail(wx.getStorageSync('token')).then(function(res) {
      if(res.code == 0) {
        let _that = {}
        _data.apiUserInfoMap = res.data
        if(res.data.base.mobile) {
          _data.userMobile = res.data.base.mobile
        }
        that.setData(_data);
      }
    })
  },

  getUserAmount:function() {
    var that = this;
    WXAPI.userAmount(wx.getStorageSync('token')).then(function(res) {
      if(res.code == 0) {
        that.setData({
          balance : res.data.balance.toFixed(2),
          freeze:res.data.freeze.toFixed(2),
          score:res.data.score
        });
      }
    })
  },

  relogin:function() {
    app.goLoginPageTimeOut();
  },

  goAsset:function() {
    wx.navigateTo({
      url: '/pages/asset/index'
    })
  },

  goScore:function() {
    wx.navigateTo({
      url: '/pages/score/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  goOrder:function(e) {
    wx.navigateTo({
      url: '/pages/order-list/index?type='+ e.currentTarget.dataSet.type
    })
  },

  aboutUs:function() {
    wx.showModal({
      title: '关于我们',
      content: '第一款微信小程序',
      showCancel: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})