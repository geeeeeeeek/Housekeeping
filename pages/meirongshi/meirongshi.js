var api=require('../../utils/api.js')
var config=require('../../utils/config.js')
var util=require('../../utils/util.js')

Page({
    data:{
        
        version:null,
        img800:config.img800,

        staffs:null,
    },

    onLoad:function(){
        var that=this;

        this.init();

        api.getStaffList(config.mid,function(res){
            that.setData({
                staffs:res.data.staffs
            });
            console.log("请求返回：==========="+res.data.staffs);
        });
    },

    init:function(){
        var v=new Date().getTime();
        this.setData({
            version:v
        })
    },

    //去预约页面
    yyClick(e){
        var ds = e.currentTarget.dataset;
        var isFrom="staff";
        wx.navigateTo({
          url: '../order/orderAddress?id='+ds.id+'&isFrom='+isFrom
        })
    }
})