Ext.define('OECDInfo.view.Theme', {
    extend:'Ext.form.Panel',
    alias:'widget.theme',
    requires:[
    	'Ext.form.FieldSet'
    ],
    initialize:function(){
 		var index = 0;
            themes = OECDInfo.app.themes,
            initial = OECDInfo.app.isInitial,
            html = '',
            title = ''
            // ,
            // panels = this.query('panel');

        if(initial){
            this.setHideOnMaskTap(false);
            // this.query('panel[action=intro]')[0].setHidden(false);
            this.query('button[action=cancel]')[0].setHidden(true);
        	title = 'Chose at least one themes you want to follow';
        }else{
            this.setHideOnMaskTap(true);
            this.query('button[action=cancel]')[0].setHidden(false);
        	title = 'Chose the themes you want to follow';
        }

        if(this.getFromTablet()){
	    	var fieldset = Ext.create('Ext.form.FieldSet', {layout:'hbox' ,title:title});
        	var panels = [];
        	panels[0] = Ext.create('Ext.Panel', { flex:1 });
        	panels[1] = Ext.create('Ext.Panel', { flex:1 });

	        for(var i=0;i<themes.length;i++){
	        	panels[i % 2].add({
					xtype:'checkboxfield',
			        labelWidth:320,
			        checked:((initial && i == 0) ? true : false),
			        disabled:((initial && i == 0) ? true : false),
			        // ,
			        labelAlign:'right',
			        // ,
			        listeners: {change: function(me){
			            // console.log('Changed');
			            // var result = [];
			            // Ext.Object.each(me.getParent().getValues(), function(key, value, myself) {
			            //     if(value != null){
			            //         result.push(value)
			            //     }
			            // }); 
			            // this.fireEvent('themetap', result);
			        }},	        		
	    			name:themes[i].name,
	        		label:themes[i].name,
	        		value:themes[i].key
	        	})
	       }
	       fieldset.add(panels[0])
	       fieldset.add(panels[1])
	       this.add(fieldset);
        }else{
        	// style:'font-size:smaller;',
	    	var fieldset = Ext.create('Ext.form.FieldSet', {title:title, width:300});
	        for(var i=0;i<themes.length;i++){
	        	fieldset.add({
					xtype:'checkboxfield',
			        labelWidth:250,
			        checked:((initial && i == 0) ? true : false),
			        disabled:((initial && i == 0) ? true : false),

			        // ,
			        labelAlign:'right',
			        // ,
			        listeners: {change: function(me){
			            // console.log('Changed');
			            // var result = [];
			            // Ext.Object.each(me.getParent().getValues(), function(key, value, myself) {
			            //     if(value != null){
			            //         result.push(value)
			            //     }
			            // }); 
			            // this.fireEvent('themetap', result);
			        }},	        		
	    			name:themes[i].name,
	        		label:themes[i].name,
	        		value:themes[i].key
	        	})
	       }
	       this.add(fieldset);
        }
       this.callParent();
    },

    config:{
	    fromTablet:false,
	    id:'theme', 
	    // instructions:'Chose themes you are interested in',
	    scrollDock: 'bottom',
	    scrollable:'vertical',
	    // scrollable:false,
	    // height:730,
	    // height:300,
	    // style:'font-size:smaller;',
	    // layout:'fit',
	    // width:320,
	    height:'100%',
	    // ,
	  //   layout:'vbox',
	  //   defaults:{
			// xtype:'panel',
			// flex:1
	  //   },
	    items:[
	    	{
	    		xtype:'panel',
	    		action:'intro',
	    		height:30,
	    		html:'<h3>Welcome to OECDInfo!</h3>',
	    		hidden:true
	    	},
			{
			    		xtype:'toolbar',
			    		docked:'bottom',
			    		 layout: {
			        pack: 'center'
			    },
			    		items:[
			    			{
			    				xtype:'button',
			    				ui:'action',
			    				width:150,
			    				action:'cancel',
			    				text:'Cancel'
			    			},
			    			{
			    				xtype:'button',
			    				ui:'confirm',
			    				width:150,
			    				action:'save',
			    				text:'Save'
			    			}
			    		]
			    	}	    	
	    ]
    }
});
    // labelWrap:true,
