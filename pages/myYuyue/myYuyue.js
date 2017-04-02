var api=require('../../utils/api.js')
var config=require('../../utils/config.js')
var util=require('../../utils/util.js')


Page({
    data:{
        img220:config.img220,
        books:null
    },

    onLoad:function(){
        var that=this;

        this.init(); 

        this.getBookData(); 
        
    },


    init:function(){

    },

    getBookData(){
        var that=this;
        var uuid=wx.getStorageSync('uuid');
        if(uuid){ 
            api.getAllBook(uuid,function(res){
                console.log("===="+res.data.books)
                that.setData({
                    books:res.data.books
                })
                that.processData();
            });
        }
    },

    processData:function(){
        var products=wx.getStorageSync('products');
        var books=this.data.books;
        
        for(var i=0;i<books.length;i++){
            for(var j=0;j<products.length;j++){
                if(books[i].p_id==products[j].p_id){
                    books[i].p_title=products[j].p_title; 
                    books[i].p_icon=products[j].p_icon;
                }
            }
        }
        this.setData({
            books:books
        })
    },

    showCancelDialog:function(e){
        var that=this;
        var ds= e.currentTarget.dataset;
        var id=ds.id;
        wx.showModal({
            title: '提示',
            content: '真的取消？',
            success: function(res) {
                if (res.confirm) {
                    that.cancel(id);
                }
            }
        }) 
 
    },

    

    cancel:function(id){
        var that=this; 
        var bid=id;
        api.cancelOneBook(bid,function(res){
            var code=res.data.code;
            if(code==0){
                util.hideLoading();
                that.getBookData();
            }
        })
    }



})