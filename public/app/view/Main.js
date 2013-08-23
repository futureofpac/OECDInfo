Ext.define("OECDInfo.view.Main", {
    extend: 'Ext.Container',
    alias:'widget.main',
    config: {
        // fullscreen:true,
    	layout:'hbox',
        // layout : {
        //     type  : 'hbox',
        //     align : 'stretch'
        // },
    	items:[
    		{
    			xtype:'menu',
    			width:230,
                // flex:1,
    			hidden:false,
				modal:false,
        		hideOnMaskTap:false    			
    		},
    		{
    			xtype:'mainlist'
                ,
                // width:'77%'
       //          ,
       //          // width:'500px'
    			flex:1
    		}
    	]
    }
});