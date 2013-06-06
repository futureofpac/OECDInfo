/**
 *  @class SlideNavigationExample.controller.Main
 *
 *  This {@link Ext.app.Controller} serves as a demonstration of how to
 *  listen to various events relating to a {@link Ext.ux.slidenavigation.View}.
 *
 */
Ext.define("OECDInfo.controller.Main", {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            list: 'testList',
            main:                   'main',
            menu: '#menu',
            theme: '#theme checkboxfield',
            menuBtn: 'testList toolbar button',
            moviePosterListContainer:   'slidenavigationview container[title="Item 8"]'
        },

        control: {
            /**
             *  Here are examples of the various events you can listen for.
             */
            main: {
                open: function(nav, position, duration) {
                    console.log('Container open (position='+position+',duration='+duration+')');
                },

                close: function(nav, position, duration) {
                    console.log('Container close (position='+position+',duration='+duration+')');
                },

                select: function(nav, item, index) {
                    console.log('Selected item (index='+index+')');
                },

                opened: function(nav, aa, bb) {
                    console.log('Container opened');
                    console.log(nav);
                    console.log(aa);
                    console.log(bb);
                },

                closed: function(nav) {
                    console.log('Container closed');
                },

                slideend: function(nav, aa, bb) {
                    console.log('Container slideend');
                    console.log(nav);
                    console.log(aa);
                    console.log(bb);
                },

                slidestart: function(nav, aa, bb) {
                    console.log('Container slidestart');
                    console.log(nav);
                    console.log(aa);
                    console.log(bb);
                },

                dragstart: function(nav) {
                    console.log('Container dragstart');

                },

                dragend: function(nav, aa, bb) {
                    console.log('Container dragend');
                    console.log(nav);
                    console.log(aa);
                    console.log(bb);
                }
            },

            /**
             *  The 'activate' event fires on the container, not the child
             *  element.
             *
             */
            moviePosterListContainer: {
                activate: function(container) {
                    console.log('Activate moviePosterListContainer');
                }
            },
            list:{
                itemsingletap:function (me, index, target, record, e, eOpts) {
                    // var main = this.getMain();
                    // // Ext.defer(main.moveContainer, 200, main);
                    // main.moveContainer(null, -200, 200)
                    this.openDetail(record);
                },
                loadmoretap:function () {
                    console.log('called!');
                    this.displayList(++this.self.currentPage);
                }
            },
            menuBtn: {
                tap:function (me, e, eOpts) {
                    var main = this.getMain();
                    // Ext.defer(main.openContainer, 200, main);
                    main.moveContainer(null, 200, 200)
                }
            },
            menu: {
                typetap:function (type) {
                    this.self.currentType = type;
                    this.displayList(1);
                }
            },
            theme:{
                themetap:function(themes){
                    this.callService(themes.join(','));
                }
            }
        }
    },
    statics:{
        currentType:'',
        currentPage:1,
        pageSize:30,
        models:[],
        detail:null
    },     
    init:function(){
        this.callParent(arguments);
    },
    launch:function(){
        this.callParent(arguments);
        // this.initMenu();
        this.initMenu();
        this.callService('Education');        
    },
    initMenu:function(){
        // this.self.detail = Ext.Viewport.add(Ext.widget('detail'));
        this.self.detail = Ext.widget('detail');
        // this.self.detail = Ext.Viewport.add({
        //     xtype:'panel',
        //     id:'detail',
        //     hidden:true,
        //     modal:true,
        //     hideOnMaskTap:true,
        //     zIndex:100,
        //     width:300,
        //     height:'100%',
        //     right:0,
        //     style:'border:none;',
        //     showAnimation:{
        //         type:'slide',
        //         direction:'left',
        //         duration:150
        //     }

        // });
        // var detail = Ext.Viewport.add({
        //     xtype:'actionsheet',
        //     zIndex:200000,
        //     defaults:{
        //         iconMask:true
        //     },
        //     items:[
        //         {
        //             text:'test1',
        //             scope:this,
        //             handler:function () {
        //                 detail.hide();
        //             }
        //         },
        //         {
        //             text:'test2',
        //             scope:this,
        //             handler:function () {
        //                 detail.hide();
        //             }
        //         }
        //     ]
        // });

        // detail.show();
    },
    openDetail:function(){
        // console.log('detail');
        // this.self.detail.animateActiveItem(1, {type:'slide', direction:'left'})
        // console.log(this.self.detail);
        this.self.detail.show();
    },
    callService:function (themes) {
        var me = this;
        Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading', zIndex:100000});
        console.log(themes);
        Ext.data.JsonP.request({
            url:'http://oecdinfo.herokuapp.com/api/'+themes+'/10/',
            callback:function(success, response){
                console.log(response);
                me.self.models = [].concat(response);
                me.displayList(1);
                Ext.Viewport.setMasked(false);
            } 
        });
    },
    displayList:function (page) {
        var me = this;

        var filterFn = function (element, index, array) {
            var type = me.self.currentType;
            console.log(type);
            console.log(element.typeName);
            return (element.typeName == type);
        }
        var data = ((this.self.currentType == '' || this.self.currentType == 'All') ? this.self.models.slice(0,page * this.self.pageSize) : this.self.models.filter(filterFn).slice(0,page * this.self.pageSize));

        var store = Ext.getStore('testStore'),
            list = this.getList();


        // console.log('data:');
        // console.log(data);

        store.setData(data);
        // list.setGrouped(true);
        // list.setStore(store);
        store.load();

    }
    // ,
    // paging:function (page) {
    //     var data = this.self.models.slice((page * this.self.pageSize)-this.self.pageSize, page * this.self.pageSize);

    //     var store = Ext.getStore('testStore'),
    //         list = this.getList();

    //     console.log(data);

    //     store.add(data)
    // }
});