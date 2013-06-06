Ext.define("OECDInfo.view.Main", {
    extend: 'Ext.ux.slide.View',
    alias:'widget.main',
    

    requires: [
        'Ext.form.Panel'
    ],    
    // requires: [
    //     'Ext.dataview.List',
    //     'Ext.ux.slide.View'
    //     //'Ext.ux.plugin.ListActions'
    // ],

    // views: [
    //     'CoverList',
    //     'Item'
    // ],
    
    config: {
        fullscreen: true,
        // xtype: 'tabpanel',
        // tabBarPosition: 'bottom',
        // layout: {
        //     type: 'card',
        //     animation: {
        //         type: 'fade',
        //         direction: 'left'
        //     }
        // },

        // items: [{
        //     title: 'Home',
        //     iconMask: true,
        //     iconCls: 'home',
        //     html: '<h3>Slide View for Sencha Touch</h3><p>Code available at: http://github.com/wnielson/sencha-SlideView</p>',
        //     styleHtmlContent: true,
        //     style: 'text-align: center',
        //     items: [{
        //         docked: 'top',
        //         xtype: 'toolbar',
        //         title: 'Slide View',
        //         ui: 'light'
        //     }]
        // },



        // {
            // xtype: 'slideview',
            title: 'Slide View',
            containerMask:false,
            iconMask: true,
            iconCls: 'look',
            containerSlideDelay: 5,
            slideDuration: 500,

            container: {
                items: [{
                    xclass: 'OECDInfo.view.testList'
                },{
                    xtype: 'container',
                    layout: 'fit',
                    items: [{
                        xtype: 'toolbar',
                        docked: 'top',
                        title:  'Item 2',
                        ui:     'light'
                    },{
                        xclass: 'OECDInfo.view.CoverList'
                    }]
                },{
                    xclass: 'OECDInfo.view.Item',
                    name:   'Item 3'
                },{
                    xtype: 'list',
                    itemTpl: '{name}',
                    data: [{
                        name: 'Item 1'
                    },{
                        name: 'Item 2'
                    },{
                        name: 'Item 3'
                    },{
                        name: 'Item 4'
                    },{
                        name: 'Item 5'
                    },{
                        name: 'Item 6'
                    },{
                        name: 'Item 7'
                    },{
                        name: 'Item 8'
                    },{
                        name: 'Item 9'
                    },{
                        name: 'Item 10'
                    }],
                    items: {
                        docked: 'top',
                        xtype: 'toolbar',
                        title: 'Item 4',
                        layout: {
                            pack: 'right'
                        }/*,
                        items: [{
                            xtype: 'button',
                            name: 'listactions'
                        }]
                        */
                    }/*,
                    plugins: [{
                        xclass: 'Ext.ux.plugin.ListActions',
                        actionsToolbar: {
                            items: [{
                                text: 'Delete (0)',
                                ui: 'decline',
                                eventName: 'delete'
                            },{
                                text: 'Move (0)',
                                eventName: 'move'
                            },{
                                text: 'Mark (0)',
                                eventName: 'mark'
                            }]
                        },
                        actionToggleButton: {
                            selector: function(list) {
                                return list.down('button[name="listactions"]');
                            },
                            enableText: 'select',
                            disableText: 'cancel'
                        }
                    }]
                    */
                },{
                    xclass: 'OECDInfo.view.Item',
                    name:   'Item 5'
                },{
                    xclass: 'OECDInfo.view.Item',
                    name:   'Item 6'
                }
                ]
            },

            leftContainer:
            {
                xtype:'panel',
                width:200,
                // scrollable:false,
                layout:'fit',
                items:[
                    {
                        xtype: 'list',
                        id:'menu',
                        itemHeight:46,
                        // scrollable:false,
                        // width:280,
                        // layout:'fit',
                        // style:'font-size:smaller;',
                        cls:'fb x-slideview-container-left',
                        data: [
                            {
                                name: 'All Feeds',
                                type:'All'
                            },
                            {
                                name: 'News',
                                type:'News'
                            },
                            {
                                name: 'Blog',
                                type:'B'
                            },
                            {
                                name: 'Publication',
                                type:'.png'
                            },
                            {
                                name: 'Twitter',
                                type:'.png'
                            },
                            {
                                name: 'Flickr',
                                type:'.png'
                            },
                            {
                                name: 'Youtube',
                                type:'.png'
                            }
                        ],
                        itemTpl:'<span class="menuicon {name}"></span> <span class="menutext">{name}</span>',
                        items: [
                            {
                                xtype:'formpanel',
                                id:'theme',
                                scrollDock: 'bottom',
                                // scrollable:'vertical',
                                scrollable:false,
                                height:750,
                                // height:300,
                                style:'font-size:smaller;',
                                // layout:'fit',
                                width:200,
                                defaults:{
                                    xtype:'checkboxfield',
                                    labelWidth:160,
                                    listeners: {change: function(me){
                                        console.log('Changed');
                                        var result = [];
                                        Ext.Object.each(me.getParent().getValues(), function(key, value, myself) {
                                            if(value != null){
                                                result.push(value)
                                            }
                                        }); 
                                        this.fireEvent('themetap', result);
                                    }}
                                    // ,
                                    // style:'word-wrap:break-word'
                                },
                                // labelWrap:true,
                                items:[
                                    {
                                        name:'OECD Generic',
                                        label:'OECD Generic',
                                        value:'Generic',
                                        checked:true
                                    },
                                    {
                                        name:'Agriculture and Food',
                                        label:'Agriculture and Food',
                                        value:'Agriculture'
                                    },
                                    {
                                        name:'Development',
                                        label:'Development',
                                        value:'Development'
                                    },
                                    {
                                        name:'Economics',
                                        label:'Economics',
                                        value:'Economics'
                                    },
                                    {
                                        name:'Education',
                                        label:'Education',
                                        value:'Education'
                                    },
                                    {
                                        name:'Employment',
                                        label:'Employment',
                                        value:'Employment'
                                    },
                                    {
                                        name:'Energy',
                                        label:'Energy',
                                        value:'Energy'
                                    },
                                    {
                                        name:'Environment',
                                        label:'Environment',
                                        value:'Environment'
                                    },
                                    {
                                        name:'Finance and Investment',
                                        label:'Finance and Investment',
                                        value:'Finance'
                                    },
                                    {
                                        name:'Governance',
                                        label:'Governance',
                                        value:'Governance'
                                    },
                                    {
                                        name:'Industry and Services',
                                        label:'Industry and Services',
                                        value:'Industry'
                                    },
                                    {
                                        name:'Nuclear Energy',
                                        label:'Nuclear Energy',
                                        value:'Nuclear'
                                    },
                                    {
                                        name:'Science and Technology',
                                        label:'Science and Technology',
                                        value:'Science'
                                    },
                                    {
                                        name:'Social Issues/Migration/Health',
                                        label:'Social Issues/Migration/Health',
                                        value:'Social'
                                    },
                                    {
                                        name:'Taxation',
                                        label:'Taxation',
                                        value:'Taxation'
                                    },
                                    {
                                        name:'Trade',
                                        label:'Trade',
                                        value:'Trade'
                                    },
                                    {
                                        name:'Transport',
                                        label:'Transport',
                                        value:'Transport'
                                    },
                                    {
                                        name:'Urban, Rural and Regional Development',
                                        label:'Urban, Rural and Regional Development',
                                        value:'Urban'
                                    }
                                ]                               
                                // listeners: {
                                //     change:function(me, newValue, oldValue, eOpts){
                                //         console.log(me);
                                //         this.fireEvent('change', 'assad');
                                //         // form.getValues
                                //     },
                                //     check:function(a,b,c){
                                //         console.log(a);
                                //         this.fireEvent('check', 'assad');
                                //         // form.getValues
                                //     }
                                // }
                            },                        
                            {
                                xtype:'panel',
                                height:30,
                                html:'By Themem',
                                scrollDock: 'bottom',
                                style:'background-color:gray;padding:5px 0px 5px 0px;color:#ffffff;text-align:center;'
                            }
                        ],
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                alert('a')
                            },
                            itemtap: function(list, index) {
                                var slideview   = list.getParent().getParent(),
                                    container   = slideview.getContainer();

                                // var store = Ext.getStore('testStore');
                                indexs = ['All', 'News', 'Blog', 'Publication', 'Twitter', 'Flickr', 'Youtube'];
                                // if(index == 0){
                                //     store.clearFilter(false);
                                // // }else if(index == 2 || index == 3){

                                // }else{
                                //     store.filter('typeName', indexs[index]);
                                // }
                                // container.setActiveItem(index);
                                this.fireEvent('typetap', indexs[index]);
                                Ext.defer(slideview.closeContainer, 200, slideview);
                            },
                            initialize: function(list) {
                                list.select(0);
                            }
                        }
                    },
                    
                ]
            },
            
            rightContainer:false
            // rightContainer: {
            //     xtype: 'panel',
            //     cls:'fb x-slideview-container-right',
            //     width: 200,
            //     layout:'vbox',
            //     items: [
            //         {
            //             xtype: 'panel',
            //             scrollable:'vertical',
            //             flex:3
            //         },
            //         {
            //             xtype: 'panel',
            //             flex:2,
            //             defaults:{
            //                 xtype:'button',
            //                 ui:'action',
            //                 style:'font-size:smaller;margin:5px 15px 7px 15px;'
            //             },
            //             items:[
            //                 {
            //                     text:'Open'
            //                 },
            //                 {
            //                     text:'Email'
            //                 },
            //                 {
            //                     text:'Facebook'
            //                 },
            //                 {
            //                     text:'Twitter'
            //                 }
            //             ]
            //         }
            //     ]
            // }

        }

        // ]
    // }
});
