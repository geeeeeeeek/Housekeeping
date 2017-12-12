
var api=require('../../utils/api.js');
var config=require('../../utils/config.js');
var util=require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
  data: { 
    swiper:null,
    img220:config.img220,
    img800:config.img800,
    version:null,
    currentTab:1,
    userInfo: {},
    products:[]
  }, 

  onLoad: function (options) {
    var that = this

    this.init();

    this.chooseAll();
 
    //swiper广告
    this.getSwiper();

    // 处理跳转
    this.handleNav(options);
  }, 

  onShareAppMessage:function(){
    return {
      title: '生活服务预约',
      desc: '预约小程序',
      path: '/pages/index/index'
    }
  },

  init:function(){
    var v=new Date().getTime();
    this.setData({
      version:v
    })
  },

  // 处理跳转
  handleNav:function(options){
    if (options.action) {
      console.log("--->" + options.action); 
      var action = options.action;
      var id = options.id;
      if(action == 'product'){
        wx.navigateTo({
          url: '../product/product?id=' + id
        }) 
      }
    }
  },
 

 //筛选
  chooseItemClick:function(e){
    var ds=e.currentTarget.dataset;
    var clickedTab=ds.tab;
    var currentTab=this.data.currentTab;
    if(currentTab==clickedTab){
      return;
    }
    this.setData({
      currentTab:ds.tab
    })
    var ct=this.data.currentTab;
    if(ct==1){
      this.chooseAll();
    }else if(ct==2){
      this.chooseHot();
    }else if(ct==3){
      this.chooseRecent();
    }else if(ct==4){
      this.chooseMode(1);
    }
  },

  //点击单个
  itemClick:function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url:'../product/product?id='+ds.id
    }) 
  },

  
  getSwiper:function(){
    var that=this;
    
    api.getSwiperData(config.mid,function(res){ 
      var products=res.data.products;
      var swiper=new Array();
      for(var i=0;i<3;i++){
        swiper.push(products[i].p_icon);
      }
      console.log("广告返回：==========="+swiper); 
      wx.setStorageSync('swiper', swiper);
      that.setData({
        swiper:swiper
      })
    });
  },

  chooseAll:function(){
      var that=this;
      
      api.getProductData(config.mid,function a(res){
        that.setData({
          products:res.data.products
        });
        console.log("请求返回：==========="+res.data.products);
        //存本地
        wx.setStorageSync('products', that.data.products);
      });
      
  },

  chooseHot:function(){
    var that=this;
     api.getHotProductData(config.mid,function(res){
        that.setData({
          products:res.data.products
        });
        console.log("请求返回：==========="+res.data.products);
     })
  },

  chooseRecent:function(){
    var that = this;
    api.getRecentProductData(config.mid, function(res){
      that.setData({
        products: res.data.products
      });
      console.log("请求返回：===========" + res.data.products);
    });
  },

  chooseMode:function(mode){
     var that=this;
     api.getModeProductData(config.mid,mode,function(res){
        that.setData({
          products:res.data.products
        });
        console.log("请求返回：==========="+res.data.products);
     })
  }, 
 

  
})

