Ext.define('OECDInfo.view.Detail', {
    extend:'Ext.Panel',
    alias:'widget.detail',
    requires:['Ext.carousel.Carousel'],
    initialize:function(){
        this.callParent();
    },
    config:{
        // showAnimation:'fadeIn',
        favoriteId:'',
        fromTablet:false,
        userInfo:null,
        id:'detail',
        hidden:true,
        modal:true,
        hideOnMaskTap:true,
        zIndex:100,
        width:300,
        height:'100%',
        right:0,
        showAnimation:{
            type:'slide',
            direction:'left',
            duration:150
        },

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
        // style:'background-color:white',
        layout:'vbox',
        items:[  
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
                height:150,
                defaults:{
                    xtype:'button',
                    ui:'action',
                    style:'font-size:smaller;margin:5px 15px 7px 15px;'
                },
                items:[
                    {
                        text:'Open'
                    },
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
                    this.fireEvent('linktap', node.getAttribute('name'));
                }
            },
            {
                element: 'element',
                //if service is getting stable, username and hashtag can be included
                // delegate: ['span.link','span.username','span.hashtag'],
                delegate: ['.header'],
                event:'swipe',
                fn:function(evt, node, options){
                    // this.openLink(node.getAttribute('name'));
                    this.fireEvent('detailswipe', this.getData(), evt);
                }
            },
            {
                delegate: ['button[action=favorite]'],
                event:'tap',
                fn:function(){
                    var favoriteId = this.getFavoriteId(),
                        data = this.getData(),
                        btn = this.query('button[action=favorite]')[0];

                    if(favoriteId == ''){
                        this.fireEvent('favoriteadd', data);
                        this.setFavoriteId(data.id);
                        // btn.setText('Remove Favorite');
                        btn.setUi('decline');
                    }else{
                        this.fireEvent('favoriteremove', favoriteId);
                        this.setFavoriteId('');
                        btn.setUi('action');
                        // btn.setText('Add Favorite');
                    }
                }
            },
            {
                delegate: ['button[action=link]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('linktap', this.getData().link);
                }
            },
            {
                delegate: ['button[action=share]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('sharetap', this.getData());
                }
            },
            {
                delegate: ['button[action=close]'],
                event:'tap',
                fn:function(){
                    this.fireEvent('closetap', this.getData());
                }
            }
        ]
    }
   
});
