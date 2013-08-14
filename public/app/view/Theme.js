Ext.define('OECDInfo.view.Theme', {
    extend:'Ext.form.Panel',
    alias:'widget.theme',
    // requires:[
    // 	''
    // ],
    initialize:function(){
 		var index = 0;
            themes = OECDInfo.app.themes,
            html = ''
            // ,
            // panels = this.query('panel');
            var title = 'Chose the themes you are interested in';

        if(this.getFromTablet()){
	    	var fieldset = Ext.create('Ext.form.FieldSet', {layout:'hbox', title:title});
        	var panels = [];
        	panels[0] = Ext.create('Ext.Panel', { flex:1 });
        	panels[1] = Ext.create('Ext.Panel', { flex:1 });

	        for(var i=0;i<themes.length;i++){
	        	panels[i % 2].add({
					xtype:'checkboxfield',
			        labelWidth:320,
			        // ,
			        labelAlign:'right',
			        // ,
			        listeners: {change: function(me){
			            console.log('Changed');
			            var result = [];
			            Ext.Object.each(me.getParent().getValues(), function(key, value, myself) {
			                if(value != null){
			                    result.push(value)
			                }
			            }); 
			            this.fireEvent('themetap', result);
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
	    	var fieldset = Ext.create('Ext.form.FieldSet', {title:title});
	        for(var i=0;i<themes.length;i++){
	        	fieldset.add({
					xtype:'checkboxfield',
			        labelWidth:250,
			        // ,
			        labelAlign:'right',
			        // ,
			        listeners: {change: function(me){
			            console.log('Changed');
			            var result = [];
			            Ext.Object.each(me.getParent().getValues(), function(key, value, myself) {
			                if(value != null){
			                    result.push(value)
			                }
			            }); 
			            this.fireEvent('themetap', result);
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
			    		xtype:'toolbar',
			    		docked:'bottom',
			    		items:[
			    			{
			    				xtype:'button',
			    				ui:'action-round',
			    				text:'Cancel'
			    			},
			    			{
			    				xtype:'button',
			    				ui:'confirm-round',
			    				text:'Save'
			    			}
			    		]
			    	}	    	
	    ]
    }
});
    // labelWrap:true,
