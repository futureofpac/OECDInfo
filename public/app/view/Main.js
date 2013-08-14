Ext.define("OECDInfo.view.Main", {
    extend: 'Ext.Container',
    alias:'widget.main',
    config: {
    	layout:'hbox',
    	items:[
    		{
    			xtype:'menu',
    			width:'230px',
    			hidden:false,
				modal:false,
        		hideOnMaskTap:false    			
    		},
    		{
    			xtype:'mainlist',
    			flex:1
    		}
    	]
    }
});