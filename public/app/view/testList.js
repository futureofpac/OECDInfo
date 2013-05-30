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
        // itemTpl:'<div style="font-size:small">{typeName} - {title} ({pubDate})</div>'
        itemTpl: 
            new Ext.XTemplate(
                '<tpl if="this.isFlickr(typeName)">',
                    '<div style="background-image:url({image}_n.jpg);background-repeat:no-repeat;background-position:center center;width:100%;height:180px;"></div>',
                    '<div style="overflow:hidden;text-overflow:ellipsis;padding-top:7npx;">{title:ellipsis(90, true)}</div>',
                '<tpl else>',
                    '<tpl if="this.hasImage(image)">',
                    '<div style="min-height:60px;font-family:Arial, sans-serif;">',
                        '<tpl if="this.isTwitter(type)">',
                            '<img src="{image}" style="float:left;width:45px;-webkit-border-radius:5px;">',
                            '<div style="margin-left:55px;">',
                        '<tpl else>',
                            '<img src="{image}" style="float:left;width:80px;-webkit-border-radius:5px;">',
                            '<div style="margin-left:90px;">',
                        '</tpl>',
                            '<div style="color:#989898;margin-bottom:8px;">{typeName}</div>',
                            '<div>{title}</div>',
                            '<div style="clear:both;margin-bottom:2px;"></div>',
                        '</div>',
                    '</div>',
                    '<tpl else>',
                        '<div style="color:#989898;margin-bottom:8px;">{typeName}</div>',
                        '<div style="margin-left:5px;margin-bottom:2px;">{title}</div>',
                    '</tpl>',
                '</tpl>',
                {
                hasImage: function(image){
                    if(image != null && image != ""){
                        return true;
                    }else{
                        return false;
                    }
                },
                isTwitter: function(type){
                    if(type == 'Twitter'){
                        return true;
                    }else{
                        return false;
                    }
                },
                isFlickr: function(type){
                    if(type == 'Flickr'){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        )           
    }
});
