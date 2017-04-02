var api=require('utils/api.js')
var config=require('utils/config.js')
var util=require('utils/util.js')

App({
  onLaunch: function () {
     this.getUserInfo();
  },
  getUserInfo:function(){
    var that = this 
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo 
              console.log("globalData===="+JSON.stringify(that.globalData));

              //获取uuid
              var uuid=wx.getStorageSync('uuid');
              if(!uuid){
                uuid=util.uuid(13,10);
              } 
              console.log("uuid===="+uuid);
              wx.setStorageSync('userInfo',that.globalData.userInfo);
              wx.setStorageSync('uuid', uuid);
            }
          })
        }
      }) 
  },
  globalData:{
    userInfo:null
  }
})