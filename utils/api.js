
var config=require('config.js')
var util=require('util.js')

/**
 * 发送pv
 */
function sendPv(id,su){
    var url=config.api_send_one_pv;
    wx.request({
      url: url,
      data: {
          pid:id
      },
      method: 'POST', 
      success: su
    })
}


/**
 * 获取swiper数据
 */
function getSwiperData(mid,su){
    util.showLoading();
    var url=config.api_get_hot_product;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            mid:mid 
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}


/**
 * 获取全部产品
 */
function getProductData(mid,su){
    util.showLoading();
    var url=config.api_get_all_product;
    console.log("url:"+url+" mid:"+mid);
    wx.request({
        url:url,
        method:'GET', 
        data:{
            mid:mid 
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}



/**
 * 获取热门产品
 */
function getHotProductData(mid,su,fa){
    util.showLoading();
    var url=config.api_get_hot_product;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            mid:mid 
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}


/**
 * 获取最近产品
 */
function getRecentProductData(mid, su, fa) {
  util.showLoading();
  var url = config.api_get_recent_product;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      mid: mid
    },
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      util.hideLoading();
    }
  })
}


/**
 * 服务模式：上门，到店
 */
function getModeProductData(mid,mode,su,fa){
    util.showLoading();
    var url=config.api_get_mode_product;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            mid:mid,
            mode:mode
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}

/**
 * 获取单个产品
 */
function getProductById(pid,su,fa){
    util.showLoading(); 
    var url=config.api_get_one_product;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            pid:pid
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}


/**
 * 获取人员
 */
function getStaffList(mid,su){
    util.showLoading();
    var url=config.api_get_all_staff;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            mid:mid 
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}

/**
 * 获取单个人员
 */
function getOneStaff(mid,sid,su){
    util.showLoading();
    var url=config.api_get_one_staff;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            mid:mid,
            sid:sid
        },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}


/**
 * 预约人员
 */
function bookStaff(data,su){
    util.showLoading();
    var url=config.api_post_one_book;
    wx.request({
        url:url,
        method:'POST', 
        data:data,
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            // util.hideLoading();
        }
    }) 
}

/**
 * 所有预约
 */
function getAllBook(userId,su){
    util.showLoading();
    var url=config.api_get_all_book;
    wx.request({
        url:url,
        method:'GET', 
        data:{
            userId:userId
            },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            util.hideLoading();
        }
    }) 
}

/**
 * 取消预约
 */
function cancelOneBook(bid,su){
    util.showLoading();
    var url=config.api_cancel_one_book;
    wx.request({
        url:url,
        method:'POST', 
        data:{
            bid:bid
            },
        success:su,
        fail:function(){
            util.showFailModal();
        },
        complete:function(){
            // util.hideLoading();
        }
    }) 
}



module.exports={
    getSwiperData:getSwiperData,
    getProductData:getProductData,
    getHotProductData:getHotProductData,
    getRecentProductData:getRecentProductData,
    getModeProductData:getModeProductData,
    getStaffList:getStaffList,
    getProductById:getProductById,
    getOneStaff:getOneStaff,
    bookStaff:bookStaff,
    sendPv:sendPv,
    getAllBook:getAllBook,
    cancelOneBook:cancelOneBook
}