
var util=require('../../utils/util.js')

Page({
    data:{
        userInfo:null
    },

    onLoad:function(){
        var userInfo=wx.getStorageSync('userInfo');
        if(userInfo){
            this.setData({
                userInfo:userInfo
            })
        }
    },

    yuyueClick(){
        wx.navigateTo({
          url: '../myYuyue/myYuyue'
        })
    },

    addressClick(){
        wx.navigateTo({
          url: '../myAddress/myAddress'
        })
    },

    discountClick(){
        util.showModal("暂无优惠券");
    }
})