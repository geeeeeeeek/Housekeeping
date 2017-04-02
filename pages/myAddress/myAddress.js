
Page({
    data:{
        name:'',
        phone:'',
        address:''
    },


    onLoad:function(){
        var address=wx.getStorageSync('address');
        if(address){
            this.setData({
                name:address.name,
                phone:address.phone,
                address:address.address
            })
        }
    },

    formSubmit:function(e){
        var that=this;
        var uuid=wx.getStorageSync('uuid');

        var formData=e.detail.value;
        
        

        if(!that.isValid(formData)){
            return;
        }


        //基本信息存本地
        wx.setStorageSync('address', formData);

        that.showModal("保存成功");
         
    },

    isValid:function(formData){
        if(formData.name==''){ 
            this.showModal("请输入姓名");
            return false;
        }else if(formData.phone==''){
            this.showModal("请输入手机号");
            return false;
        }else if(formData.address==''){
            this.showModal("请输入详细地址");
            return false;
        } 
        return true;
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