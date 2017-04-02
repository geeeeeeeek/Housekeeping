
Page({
    
    data:{
        pidsArr:null,
        products:null
    },

    onLoad:function(options){

        if(options.pids){
           var pids= options.pids;
           var pidsArr=pids.split(',');
           this.setData({
               pidsArr:pidsArr
           })
        }
        
        //get storage
        var products=wx.getStorageSync('products');

        //filter
        var i=0;
        var pidsArr=this.data.pidsArr;
        var newArr=new Array();
        for(i=0;i<products.length;i++){
            console.log(products[i].p_id);
            if(pidsArr.indexOf(products[i].p_id)>-1){
                newArr.push(products[i])
            }
        }
        this.setData({
            products:newArr
        })
    },

    itemClick:function(e){
        var ds=e.currentTarget.dataset;
        var id=ds.id;
        console.log(id);
        //存缓存
        wx.setStorageSync('selected_product_id', id);
        wx.navigateBack();
    }
})