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
                itemtap:function (me, index, target, record, e, eOpts) {
                    var main = this.getMain();
                    // Ext.defer(main.moveContainer, 200, main);
                    main.moveContainer(null, 200, 200)

                    // console.log(this.getMain().getLeftContainer());
                    // console.log(this.getMain().getRightContainer());
                    // body...
                },
                loadmoretap:function () {
                    console.log('called!');
                    this.paging(++this.self.currentPage);
                }
            },
            menuBtn: {
                tap:function (me, e, eOpts) {
                    var main = this.getMain();
                    Ext.defer(main.openContainer, 200, main);
                }
            }
        }
    },
    statics:{
        currentPage:1,
        pageSize:30,
        models:[]
    },     
    init:function(){
        this.callParent(arguments);
    },
    launch:function(){
        this.callParent(arguments);

        var me = this;
        Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading'});

        Ext.data.JsonP.request({
            url:'http://oecdinfo.herokuapp.com/api/Generic,Development,Economy/20/',
            callback:function(success, response){
                console.log(response);
                me.self.models = [].concat(response);
                me.displayList(1);
                Ext.Viewport.setMasked(false);

            } 
        });
    },
    displayList:function (page) {

        var data = this.self.models.slice(0,page * this.self.pageSize);

        var store = Ext.getStore('testStore'),
            list = this.getList();

        console.log(data);

        store.setData(data);
        // list.setGrouped(true);
        // list.setStore(store);
        if(page == 1){
            store.load();
        }

    },
    paging:function (page) {
        var data = this.self.models.slice((page * this.self.pageSize)-this.self.pageSize, page * this.self.pageSize);

        var store = Ext.getStore('testStore'),
            list = this.getList();

        console.log(data);

        store.add(data)
    }
});