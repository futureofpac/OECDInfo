Ext.define('OECDInfo.view.testList', {
    extend:'Ext.List',
    alias:'widget.testList',
    config:{
        store:'testStore', 
        loadingText:'Loading ...',
        autoDestroy:false,
        disableSelection:true,  
        pinHeaders: true,
        grouped:true,
        // onItemDisclosure:true,
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'OECD Info',
                ui:'light'
                // defaults:{
                //  // xtype:'button',
                //  flex:1
                //  // style:'margin:3px;padding:0px;'
                // },
            }
        ],
        emptyText:'<div style="padding:10px;">No Data</div>',
        itemTpl:'<div style="font-size:small">{typeName} - {title} ({pubDate})</div>'
    }
});
