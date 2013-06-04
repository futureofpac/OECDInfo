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
                width:260,
                // scrollable:false,
                layout:'fit',
                items:[
                    {
                        xtype: 'list',
                        // scrollable:false,
                        // width:280,
                        // layout:'fit',
                        // style:'font-size:smaller;',
                        cls:'fb x-slideview-container-left',
                        data: [
                            {
                                name: 'All Feeds'
                            },
                            {
                                name: 'News'
                            },
                            {
                                name: 'Blog'
                            },
                            {
                                name: 'Publication'
                            },
                            {
                                name: 'Twitter'
                            },
                            {
                                name: 'Flickr'
                            },
                            {
                                name: 'Youtube'
                            }
                        ],
                        itemTpl: '{name}',
                        items: [
                            {
                                xtype:'formpanel',
                                scrollDock: 'bottom',
                                // scrollable:'vertical',
                                scrollable:false,
                                height:700,
                                // height:300,
                                style:'font-size:smaller;',
                                // layout:'fit',
                                width:260,
                                defaults:{
                                    xtype:'checkboxfield',
                                    labelWidth:200
                                },
                                // labelWrap:true,
                                items:[
                                    {
                                        name:'OECD Generic',
                                        label:'OECD Generic',
                                        value:'OECD Generic',
                                        checked:true
                                    },
                                    {
                                        name:'Agriculture and Food',
                                        label:'Agriculture and Food',
                                        value:'Agriculture and Food'
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
                                        value:'Finance and Investment'
                                    },
                                    {
                                        name:'Governance',
                                        label:'Governance',
                                        value:'Governance'
                                    },
                                    {
                                        name:'Industry and Services',
                                        label:'Industry and Services',
                                        value:'Industry and Services'
                                    },
                                    {
                                        name:'Nuclear Energy',
                                        label:'Nuclear Energy',
                                        value:'Nuclear Energy'
                                    },
                                    {
                                        name:'Science and Technology',
                                        label:'Science and Technology',
                                        value:'Science and Technology'
                                    },
                                    {
                                        name:'Social Issues/Migration/Health',
                                        label:'Social Issues/Migration/Health',
                                        value:'Social Issues/Migration/Health'
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
                                        value:'Urban, Rural and Regional Development'
                                    }
                                ]
                            }                        
                        ],
                        listeners: {
                            itemtap: function(list, index) {
                                var slideview   = list.getParent().getParent(),
                                    container   = slideview.getContainer();

                                var store = Ext.getStore('testStore');
                                indexs = ['All Feeds', 'News', 'Blog', 'Publication', 'Twitter', 'Flickr', 'Youtube'];
                                if(index == 0){
                                    store.clearFilter(false);
                                }else if(index == 2 || index == 3){

                                }else{
                                    store.filter('typeName', indexs[index]);
                                }

                                // container.setActiveItem(index);
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
            //     width: 250,
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
