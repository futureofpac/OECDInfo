Ext.define('OECDInfo.store.MainStore', {
	extend:'Ext.data.Store',
	config:{
		// storeId:'WhatsupMem',
		model:'OECDInfo.model.Feed',
		// proxy:{
		// 	type:'jsonp',
		// 	url:'http://oecdinfo.herokuapp.com/all/oecd,oecd_pubs,oecdinnovation/30/'
		// },
		proxy:{
			type:'memory'
		},		
		autoLoad:false,
 		sorters:[
 			{property:'id', direction:'ASC'}
 			// {property:'pubDate', direction:'DESC'},
 			// {property:'typeName', direction:'ASC'}
		],
		grouper:{
			sortProperty:'pubDate',
			direction:'DESC',
			groupFn:function  (record) {

				var yymmdd = record.get('pubDate');
				if (record && yymmdd) {
					//return record.pubDate.toDateString();
				    var date = yymmdd.getDate(),
				        month = yymmdd.getMonth(),
				        year = yymmdd.getFullYear(),
				        day = yymmdd.getDay(),
				        aDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
				        aMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
					return aDay[day] + ', ' + (date.length == 1 ? '0'+date : date) + ' ' + aMonth[month] + ', ' + year;
				}else{
					return '';
				}				
			}
		}		
	}
});