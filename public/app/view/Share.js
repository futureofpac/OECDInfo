Ext.define('OECDInfo.view.Share', {
    extend:'Ext.ActionSheet',
    alias:'widget.share',
    initialize:function(){
        if(this.getIsTablet()){
            var decline = this.query('button[action=decline]')[0];
            decline.setHidden(true);
            this.setWidth(250);
            this.setModal(true);
            this.setHideOnMaskTap(true);
            this.setHeight(145);
            // this.setStyle('font-size:smaller;');
            this.setShowAnimation({
                type:'fadeIn',
                duration:50
            });
            this.setHideAnimation({
                type:'fadeOut',
                duration:50
            });
        }
        this.callParent();
    },
    config:{
        isTablet:false,
    	hidden:true,
        defaults:{
            handler:function(btn, evt){
                console.log(btn.action);
                var parent = this.getParent();
                parent.fireEvent(btn.action+'tap', parent.getData());
                parent.hide();
            }
        },
        zIndex:1000,
        items:[
            {
                text:'Email',
                action:'email'
            },
            {
                text:'Facebook',
                action:'facebook'
            },
            {
                text:'Twitter',
                action:'twitter'
            },
            {
                text:'No thanks',
                ui:'decline',
                action:'decline'
            }
        ]
    }
});
