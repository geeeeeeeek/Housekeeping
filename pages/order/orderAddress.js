
 
var config=require('../../utils/config.js')
var util=require('../../utils/util.js')
var api=require('../../utils/api.js')

Page({
    data:{
        isFrom:null,
        name:'',
        phone:'',
        date: null,
        startDate:null,
        endDate:null,
        time:'09:00',
        startTime:'09:00',
        endTime:'23:59',
        pids:null,
        selectedId:null,
        selectedInfo:'请选择项目',
        sid:null
    },

    onLoad:function(options){
        var that=this;
        //清缓存
        wx.setStorageSync('selected_product_id', null);

        this.init();

        var isFrom=options.isFrom;
        if(isFrom&&isFrom=="product"){
            var pid=options.id;
            var pName=util.getProductNameById(pid);
            this.setData({
                isFrom:isFrom,
                selectedId:pid, 
                selectedInfo:pName,
            })

        }else if(isFrom&&isFrom=="staff"){ 
            api.getOneStaff(config.mid,options.id,function(res){
                var pids=res.data.staff.p_ids;
                console.log("请求返回：==========="+pids); 
                that.setData({
                    pids:pids
                })
            });
            that.setData({
                isFrom:isFrom,
                sid:options.id
            }) 
        } 
        

    },

    init:function(){
        //地址信息
        // var formData=wx.getStorageSync('formData');
        var address=wx.getStorageSync('address');
        console.log('address:'+address);
        if(address){
            this.setData({
                name:address.name,
                phone:address.phone
            })
        }

        var ts=new Date();
        ts.setDate(ts.getDate()+1);
        var start=util.formatTime2(ts);
        ts.setDate(ts.getDate()+7);
        var end=util.formatTime2(ts); 
        this.setData({
            date:start,
            startDate:start,
            endDate:end
        }) 
    },


    onShow:function(){

        //拿缓存显示,用于人员来源
        var selectedProductId=wx.getStorageSync('selected_product_id');
        if(selectedProductId){ 
            var product=util.getProductById(selectedProductId);
            var pName=product.p_title;
            this.setData({
                selectedId:selectedProductId, 
                selectedInfo:pName,
            })
            
        }
 
        
    },

    bindDateChange: function(e) { 
        this.setData({
            date: e.detail.value
        })
    },

    bindTimeChange:function(e){
        this.setData({
            time: e.detail.value
        })
    },

    pClick:function(e){

        if(this.data.isFrom=='product'){return;}
        var pids=this.data.pids;
        wx.navigateTo({
          url: 'orderProducts?pids='+pids
        })
    },
 

    formSubmit:function(e){
        var that=this;
        var uuid=wx.getStorageSync('uuid');

        var formData=e.detail.value;
        formData.mid=config.mid;
        formData.uuid=uuid;
        formData.pid=this.data.selectedId;
        formData.sid=this.data.sid; 
        
       

        if(!that.isValid(formData)){
            return;
        }

        var product=util.getProductById(this.data.selectedId);
        //价格
        formData.price=product.p_priceA;

        //基本信息存本地
        this.saveAddressInfo(formData);

        api.bookStaff(formData,function(res){
            var code=res.data.code;
            console.log("返回："+code);
            if(code==0){
                that.showSuccess(); 
            }else{ 
                that.showFail(); 
            }
        }) 
    },

    isValid:function(formData){
        if(formData.name==''){ 
            this.showModal("请输入姓名");
            return false;
        }else if(formData.phone==''){
            this.showModal("请输入手机号");
            return false;
        }else if(formData.time==''){
            this.showModal("请选择预约时间");
            return false;
        }else if(formData.pid==null){
            this.showModal("请选择项目");
            return false;
        }
        return true;
    },

    saveAddressInfo:function(formData){ 
        var address=new Object();
        address.name=formData.name;
        address.phone=formData.phone;
        if(formData.address){
            address.address=formData.address;
        }else{
            address.address='';
        }
        wx.setStorageSync('address', address);
    },

    showSuccess:function(){
        wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 1000
        })
        setTimeout(function(){
            wx.navigateBack()
        },1000)
    },

    showFail:function(){
        this.showModal('预约失败')
    },

    showModal:function(content){
        wx.showModal({
        title: '提示',
        showCancel:false,
        confirmText:'知道了',
        content: content
        })
    }

 
})