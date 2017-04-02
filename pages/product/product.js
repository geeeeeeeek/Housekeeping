
var api=require('../../utils/api.js')
var config=require('../../utils/config.js')

Page({
    data:{
        img800:config.img800,
        product:null
    },

    onLoad:function(options){
        var that=this;

        if(options.id){
            var pid=options.id;
            api.getProductById(pid,
            function(res){
                console.log("请求成功：==========="+res.data.product);
                that.setData({
                    product:res.data.product
                })
            })

            this.sendPv(pid);
        }
    },

    sendPv:function(id){

        var that=this;

        api.sendPv(id,function(res){
            console.log("sendPv成功：==========="); 
        });

    },

    yuyueClick(e){
        var ds = e.currentTarget.dataset;
        var id=ds.id;
        var isFrom="product";
        wx.navigateTo({
          url: '../order/orderAddress?id='+id+'&isFrom='+isFrom
        })
    }
})