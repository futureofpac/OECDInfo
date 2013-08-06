Ext.define('OECDInfo.view.MainList', {
    extend:'Ext.List',
    alias:'widget.mainlist',
    requires:[
        // 'Ext.plugin.ListPaging'
        // , 
        // 'Ext.plugin.PullRefresh'
        // ,
        // 'Ext.SegmentedButton'
    ],    
    config:{
        store:'MainStore', 
        loadingText:'Loading ...',
        autoDestroy:false,
        scrollToTopOnRefresh:false,
        // disableSelection:true,  
        pinHeaders: true,
        grouped:true,
        plugins: [
            // {
            //     xclass:'Ext.plugin.PullRefresh',
            //     pullRefreshText:'Pull Down to Update',
            //     refreshFn:function(){
            //         Ext.defer(function(){
            //             var list = Ext.widget('testList');
            //             list.firePullRefresh();
            //         }, 500)
            //     }
            // },
            // {
            //       xclass: 'Ext.plugin.ListPaging',
            //       autoPaging: true,
            //       hidden:false
            // }
       ],           
        // onItemDisclosure:true,
        items:[
            {
                xtype:'toolbar',
                // initialize:function(){
                //     this.on({
                //         tap:function(){
                //             console.log('a');
                //             console.log(this.getParent());
                //             this.getParent().getScrollable().getScroller().scrollTo(0,0, false);

                //             this.fireEvent('toptap');
                //         }
                //     })
                // },
                docked:'top',
                title:'OECD Info',
                ui:'light',
                items:[
                    {
                        xtype:'button',
                        iconCls:'more',
                        action:'menu'
                    },
                    {
                        xtype:'spacer'
                    },
                    {
                        xtype:'button',
                        iconCls:'refresh',
                        action:'refresh'
                    }
                ]
                // defaults:{
                //  // xtype:'button',
                //  flex:1
                //  // style:'margin:3px;padding:0px;'
                // },
            }
            ,
            {
                xtype:'panel',
                height:80,
                scrollDock: 'bottom',
                docked:'bottom',
                padding:15,
                hidden:true,
                width:'100%',
                // centered:true,
                // layout:'hbox',
                // http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/loading_black.gif
                items:[
                    // {
                    //     xtype:'img',
                    //     src:'https://www.isof.cnr.it/docmgr/themes/default/images/loading.gif',
                    //     // width:60
                    //     flex:1
                    // }
                    // ,
                    {
                        xtype:'button',
                        // ui:'gray',
                        // iconMask:true,
                        // iconCls:'arrow_down',
                        // iconAlign:'right',
                        width:'50%',
                        centered:true,
                        text:'<span style="font-size:smaller;">Load More...</span>'
                        // ,
                        // handler:function(me){
                        //     console.log(me);
                        //     var list = Ext.widget('mainlist');
                        //     list.fireLoadmore();
                        // }
                        // ,
                        // scope:this                      
                    }
                ]
            }        


            // ,
            // {
            //     xtype:'toolbar',
            //     docked:'bottom',
            //     scrollable:{
            //         direction:'horizontal',
            //         indicators:false
            //     },
            //     // layout:{
            //     //     pack:'center',
            //     //     align:'center'
            //     // },
            //     defaults:{
            //         xtype:'button'
            //     },
            //     items:[
            //         {
            //             text:'All',
            //             handler:function(){
            //                 var store = Ext.getStore('testStore');
            //                 store.clearFilter(true);
            //             }
            //         },
            //         {
            //             text:'News',
            //             handler:function(){
            //                 var store = Ext.getStore('testStore');
            //                 store.filter('typeName', 'News');
            //             }
            //         },
            //         {
            //             text:'Article',
            //             handler:function(){
            //                 var store = Ext.getStore('testStore');
            //                 store.filter('typeName', 'Twitter');
            //             }

            //         },
            //         {
            //             text:'Books',
            //         },
            //         {
            //             text:'Photo',
            //             handler:function(){
            //                 var store = Ext.getStore('testStore');
            //                 store.filter('typeName', 'Flickr');
            //             }

            //         },
            //         {
            //             text:'Video',
            //             handler:function(){
            //                 var store = Ext.getStore('testStore');
            //                 store.filter('typeName', 'Youtube');
            //             }

            //         }
            //     ]


            // }
        ],
        emptyText:'<div style="padding:10px;">There is no data</div>',
        // itemTpl:'<div style="font-size:small">{typeName} - {title} ({pubDate})</div>'
        itemTpl: 
            new Ext.XTemplate(
                '<tpl if="this.isFlickr(typeName)">',
                    // '<div style="background-image:url({image}_s.jpg);background-repeat:no-repeat;background-position:center center;width:150px;height:150px;"></div>',
                    // '<div style="overflow:hidden;text-overflow:ellipsis;padding-top:7npx;">{title:ellipsis(90, true)}</div>',
                    '<div style="min-height:120px;font-family:Arial, sans-serif;">',
                        '<img src="{image}_q.jpg" style="float:left;width:120px;height:120px;">',
                        '<div style="margin-left:130px;">',
                        '<div><tpl if="this.isTypeAll()"><span style="color:#989898;margin-bottom:8px;">{typeName} : </span></tpl>{title:ellipsis(60, true)}</div>',
                        '<div style="overflow:hidden;text-overflow:ellipsis;padding-top:7px;font-size:smaller;">{content:ellipsis(90, true)}</div>',
                        '<div style="clear:both;margin-bottom:2px;"></div>',
                    '</div>',
                '<tpl else>',
                    '<tpl if="this.hasImage(image)">',
                        '<div style="min-height:60px;font-family:Arial, sans-serif;">',
                            '<tpl if="this.isTwitter(typeName)">',
                                '<img src="{image}" style="float:left;width:45px;-webkit-border-radius:5px;">',
                                '<div style="margin-left:55px;">',
                                '<div><span style="color:#989898;margin-bottom:8px;"><tpl if="this.isTypeAll()">{typeName}</tpl> @{userInfo.screen_name}</span></div>',
                                '<div style="padding-top:7px;">{title}</div>',
                                '<div style="clear:both;margin-bottom:2px;"></div>',
                            '</div>',
                            '<tpl else>',
                                '<img src="{image}" style="float:left;width:80px;-webkit-border-radius:5px;">',
                                '<div style="margin-left:90px;">',
                                '<div><tpl if="this.isTypeAll()"><span style="color:#989898;margin-bottom:8px;">{typeName} : </span></tpl>{title}</div>',
                                '<div style="overflow:hidden;text-overflow:ellipsis;padding-top:7px;font-size:smaller;">{content:ellipsis(130, true)}</div>',
                                '<div style="clear:both;margin-bottom:2px;"></div>',
                            '</div>',
                            '</tpl>',
                        '</div>',
                    '<tpl else>',
                        '<div><tpl if="this.isTypeAll()"><span style="color:#989898;margin-bottom:8px;">{typeName} : </span></tpl>{title}</div>',
                        '<div style="overflow:hidden;text-overflow:ellipsis;padding-top:7px;font-size:smaller;">{content:ellipsis(130, true)}</div>',
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
                    if(type == 'Photos'){
                        return true;
                    }else{
                        return false;
                    }
                },
                isTypeAll:function(){
                    if(OECDInfo.app.currentType == 'All'){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        )           
    },
    fireLoadmore:function(){
        this.fireEvent('loadmoretap');
    }});
