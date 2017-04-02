function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime2(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showLoading(){
  console.log("showloading-----");
  wx.showToast({
        title: '请稍后',
        icon: 'loading',
        duration: 5000
    });
}

function hideLoading(){
  wx.hideToast();
}

function showModal(text){
   wx.showModal({
      title: '提示',
      content: text,
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
           
        }
      }
   })
}

function showFailModal(){
  wx.showModal({
    title: '提示',
    content: '网络异常，请检查网络',
    success: function(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })
}

function getProductNameById(id){
  var products=wx.getStorageSync('products');
  for(var i=0;i<products.length;i++){
    var product=products[i]; 
    if(product.p_id==id){
      return product.p_title;
    }
  }
}

function getProductById(id){
  var products=wx.getStorageSync('products');
  for(var i=0;i<products.length;i++){
    var product=products[i]; 
    if(product.p_id==id){
      return product;
    }
  }
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;
 
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}


function su(){

}

function com(){

}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  showLoading:showLoading,
  hideLoading:hideLoading,
  showFailModal:showFailModal,
  getProductNameById:getProductNameById,
  getProductById:getProductById,
  showModal:showModal,
  uuid:uuid,
  su:su,
  com:com
}
