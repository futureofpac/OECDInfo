Ext.define('OECDInfo.model.Feed', {
	extend: 'Ext.data.Model',
	alias:'widget.feed',
	config:{
		// identifier:'uuid',
		
		fields: [
			{name:'id', type:'int'},
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
			// ,
			// {name:'createDate', type:'date', dateFormat:'c'}
		]
	}
})			