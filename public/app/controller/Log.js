Ext.define("OECDInfo.controller.Log", {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            list: 'loglist'
        },
        control: {
            list:{
                itemsingletap:function (me, index, target, record, e, eOpts) {
                }
            }
        }
    },
    init:function(){
        this.callParent(arguments);
    },
    launch:function(){
        this.callParent(arguments);
        this.callService();
    },
    callService:function (themes) {
        var me = this;
        Ext.data.JsonP.request({
            url: OECDInfo.app.serviceRoot() + '/log/item/',
            callback:function(success, response){
                console.log(response);

                var store = Ext.getStore('MainStore'),
                    list = me.getList();

                store.removeAll();

                store.setData(response);
                store.load();
            } 
        });
    }
});