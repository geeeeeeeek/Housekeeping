var appPath='https://www.wxfont.com';
// var appPath='http://localhost';

//图片资源
var img220=appPath+'/upload/img_220';
var img800=appPath+'/upload/img_800';

//api请求
var api_get_all_product=appPath+'/api/product/all';
var api_get_hot_product=appPath+'/api/product/hot';
var api_get_mode_product=appPath+'/api/product/mode';
var api_get_recent_product=appPath+'/api/product/recent'
var api_get_one_product=appPath+'/api/product/one';
var api_get_all_staff=appPath+'/api/staff/all';
var api_get_one_staff=appPath+'/api/staff/one';
var api_post_one_book=appPath+'/api/book/one';
var api_send_one_pv=appPath+'/api/pv/one';
var api_get_all_book=appPath+'/api/book/all';
var api_cancel_one_book=appPath+'/api/book/cancel'


module.exports = { 
    img220:img220,
    img800:img800,

    api_get_all_product,
    api_get_hot_product,
    api_get_recent_product,
    api_get_mode_product,
    api_get_one_product,
    api_get_all_staff,
    api_get_one_staff,
    api_post_one_book,
    api_send_one_pv,
    api_get_all_book,
    api_cancel_one_book,
    
    // 后台用户名
    mid:'100'
}