Ext.define('OECDInfo.view.Share', {
    extend:'Ext.ActionSheet',
    alias:'widget.share',
    config:{
    	hidden:true,
        defaults:{
            handler:function(btn, evt){
                this.getParent().hide();
            }
        },
        zIndex:1000,
        items:[
            {
                text:'Email'
            },
            {
                text:'Facebook'
            },
            {
                text:'Twitter'
            },
            {
                text:'No thanks',
                ui:'decline'
            }
        ]
    }
});
