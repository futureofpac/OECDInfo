Ext.define('OECDInfo.model.United', {
	extend: 'Ext.data.Model',
	alias:'widget.united',
	config:{
		// identifier:'uuid',
		
		fields: [
			{name:'id', type:'string'},
			// {name:'type', type:'string'},
			{name:'typeName', type:'string'},
			{name:'theme', type:'string'},
			// {name:'author', type:'string'},
			{name:'title', type:'string'},
			{name:'content', type:'string'},
			{name:'link', type:'string'},
			{name:'image', type:'string'},
			{name:'userInfo'},
			{name:'provider'},
			// {name:'favorite', type:'boolean', defaultValue: false},
			{name:'pubDate', type:'date', dateFormat:'c'}
			,
			{name:'createDate', type:'date', dateFormat:'c'}
		]
	}
})			