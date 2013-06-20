Ext.define('OECDInfo.view.Detail', {
    extend:'Ext.Panel',
    alias:'widget.detail',
    requires:[
        'Ext.form.Panel',
        'Ext.carousel.Carousel',
        'Ext.ActionSheet'
    ],
    initialize:function(){
        if(this.getFromTablet()){
            this.query('button[action=close]')[0].hide();
            this.query('button[action=share]')[0].hide();
            this.query('panel[id=shareContainer]')[0].show();
        }
        this.callParent();
    },
    config:{
        // showAnimation:'fadeIn',
        fromTablet:false,
        favoriteId:'',
        userInfo:null,
        id:'detail',
        hidden:true,
        // modal:true,
        // hideOnMaskTap:true,
        zIndex:100,
        width:'100%',
        height:'100%',
        showAnimation:{
            type:'slide',
            direction:'left',
            duration:150
        },
        // hideAnimation:{
        //     type:'slide',
        //     direction:'right',
        //     duration:150
        // },

        // id:'detail',
        // model:true,
        // centered:true, 
        // scrollable:true,
        // Make it modal so you can click the mask to hide the overlay
        // modal: false,
        // hideOnMaskTap: true,
        // border:0,
        // style:'border-style:none', 
        // Set the width and height of the panel
        // width: '100%',
        // height: '100%',
        // html:this.createBody()
        style:'background-color:white',
        layout:'vbox',
        items:[  
            // {
            //     xtype:'panel',
            //     scrollable:{
            //         direction:'horizontal'
            //     },
            //     height:30
            // },
            {
                xtype:'carousel',
                direction:'vertical',
                height:140,
                items:[
                    {
                        html:''
                    },
                    {
                        html:''
                    }
                ]
            },
            {
                xtype:'panel'
            },
            {
                xtype:'panel',
                layout:'fit',
                scrollable:true,
                flex:1
            },
			{
                xtype: 'panel',
                id:'shareContainer',
                hidden:true,
                height:115,
                defaults:{
                    xtype:'button',
                    // ui:'action',
                    style:'font-size:smaller;margin:5px 15px 7px 15px;'
                },
                items:[
                    // {
                    //     text:'Open'
                    // },
                    {
                        text:'Email'
                    },
                    {
                        text:'Facebook'
                    },
                    {
                        text:'Twitter'
                    }
                ]
            },            
            {
                xtype:'toolbar',
                ui:'light',
                docked:'top',
                items:[
                    {
                        xtype:'button',
                        // ui:'back',
                        // text:'Back'
                        iconCls:'delete',
                        action:'close'
                    }
                    // ,
                    // {
                    //     xtype:'spacer'
                    // },
                    // {
                    //     xtype:'button',
                    //     iconCls:'action',
                    //     action:'share'
                    // }
                ]
            },
            {
                xtype:'toolbar',
                docked:'bottom',
                defaults:{
                    xtype:'button',
                    flex:1,
                    style:''
                },
                items:[
                    {
                        // iconCls:'arrow_left',
                        ui:'back',
                        text:'Prev',
                        action:'prev'
                    },
                    {
                        // iconCls:'action'
                        text:'Share',
                        action:'share'
                    },
                    {
                        // iconCls:'reply'
                        text:'Open',
                        action:'open'
                    },
                    {
                        // iconCls:'arrow_right',
                        ui:'forward',
                        text:'Next',
                        action:'next'
                    }
                ]
            }
        ],
        listeners: [
            {
                element: 'element',
                //if service is getting stable, username and hashtag can be included
                // delegate: ['span.link','span.username','span.hashtag'],
                delegate: ['span.link'],
                event:'tap',
                fn:function(evt, node, options){
                    // this.openLink(node.getAttribute('name'));
                    this.fireEvent('opentap', node.getAttribute('name'));
                }
            },
            {
                element: 'element',
                //if service is getting stable, username and hashtag can be included
                // delegate: ['span.link','span.username','span.hashtag'],
                delegate: ['.header'],
                event:'swipe',
                fn:function(evt, node, options){
                    if(evt.direction == 'up'){
                        this.fireEvent('providertap', 'up');
                    }else if(evt.direction == 'down'){
                        this.fireEvent('providertap', 'down');
                    }
                    // this.openLink(node.getAttribute('name'));
                    // this.fireEvent('detailswipe', this.getData(), evt);
                }
            },
            {
                element: 'element',
                //if service is getting stable, username and hashtag can be included
                // delegate: ['span.link','span.username','span.hashtag'],
                delegate: ['.header'],
                event:'tap',
                fn:function(evt, node, options){
                    this.fireEvent('providertap', 'up');
                }
            },
            {
                delegate: ['button[action=prev]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('prevtap');
                }
            },
            {
                delegate: ['button[action=next]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('nexttap');
                }
            },
            {
                delegate: ['button[action=open]'],
                event:'tap',
                fn:function(){
                    // console.log(this.getData());
                    var link = this.getData().link;

                    this.fireEvent('opentap', link);
                }
            },
            {
                delegate: ['button[action=share]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('sharetap');
                }
            },
            {
                delegate: ['button[action=close]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('hidetap');
                }
            }
        ]
    }
   
});
