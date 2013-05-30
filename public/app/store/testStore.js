Ext.define('OECDInfo.store.testStore', {
	extend:'Ext.data.Store',
	config:{
		// storeId:'WhatsupMem',
		model:'OECDInfo.model.United',
		proxy:{
			type:'jsonp',
			url:'http://oecdinfo.herokuapp.com/all/oecd,oecd_pubs,oecdinnovation,oojoo/'
		},
		autoLoad:true,
 	// 	sorters:[
 	// 		{property:'pubDate', direction:'DESC'},
 	// 		{property:'typeName', direction:'ASC'}
		// ],
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