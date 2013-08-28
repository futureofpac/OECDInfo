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
        // defaults:{
        //     handler:function(btn, evt){
        //         alert('share')
        //         console.log(btn);
        //         console.log(evt);
        //         console.log(btn.action);
        //         var parent = this.getParent();
        //         parent.fireEvent(btn.action+'tap', null);
        //         parent.hide();
        //     }
        // },
        zIndex:1000,
        items:[
            {
                text:'Email',
                action:'email'
                // ,
                // handler:function(btn, evt){
                //     alert('share')
                //     console.log(btn);
                //     console.log(evt);
                //     console.log(btn.action);
                //     var parent = this.getParent();
                //     console.log(parent);
                //     parent.fireEvent(btn.action+'tap', null);
                //     parent.hide();
                // }
            },
            {
                text:'Facebook',
                action:'facebook'
                // ,
                // handler:function(btn, evt){
                //     alert('share')
                //     console.log(btn);
                //     console.log(evt);
                //     console.log(btn.action);
                //     var parent = this.getParent();
                //     console.log(parent);
                //     parent.fireEvent(btn.action+'tap', null);
                //     parent.hide();
                // }
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
        ],
        listeners: [
            {
                delegate: ['button[action=email]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('emailtap');
                    // this.hide();
                }
            },
            {
                delegate: ['button[action=facebook]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('facebooktap');
                    // this.hide();                    
                }
            },
            {
                delegate: ['button[action=twitter]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('twittertap');
                    // this.hide();
                }
            },
            {
                delegate: ['button[action=decline]'],
                event:'tap',
                fn:function(){
                    this.hide();
                }
            }
        ]
    }
});
