Ext.define('OECDInfo.view.Menu', {
    extend:'Ext.Panel',
    alias:'widget.menu',
    initialize:function(){
        this.callParent();
    },
    config:{
        width:200,
        zIndex:9900,
        hidden:true,
        modal:true,
        hideOnMaskTap:true,
        layout:'fit',
        showAnimation:{
            type:'slide',
            direction:'right',
            duration:150
        },
        items:[
            {
                xtype: 'list',
                id:'menu',
                cls:'fb x-slideview-container-left',
                itemHeight:46,
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
                        name: 'Articles',
                        type:'B'
                    },
                    {
                        name: 'Publications',
                        type:'.png'
                    },
                    {
                        name: 'Twitter',
                        type:'.png'
                    },
                    {
                        name: 'Photos',
                        type:'.png'
                    },
                    {
                        name: 'Videos',
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
                        // var slideview   = list.getParent().getParent(),
                        //     container   = slideview.getContainer();

                        // var store = Ext.getStore('testStore');
                        indexs = ['All', 'News', 'Articles', 'Publications', 'Twitter', 'Photos', 'Videos'];
                        // if(index == 0){
                        //     store.clearFilter(false);
                        // // }else if(index == 2 || index == 3){

                        // }else{
                        //     store.filter('typeName', indexs[index]);
                        // }
                        // container.setActiveItem(index);
                        this.fireEvent('typetap', indexs[index]);
                        // Ext.defer(slideview.closeContainer, 200, slideview);
                    },
                    initialize: function(list) {
                        list.select(0);
                    }
                }
            }
        ]
    }   
});