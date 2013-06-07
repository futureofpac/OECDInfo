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
        this.callService('Generic');        
    },
    initMenu:function(){
        this.self.detail = Ext.Viewport.add({xtype:'detail'});
        // this.self.detail = Ext.widget('detail');
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
    openDetail:function(record){
        // console.log('detail');
        // this.self.detail.animateActiveItem(1, {type:'slide', direction:'left'})
        // console.log(this.self.detail);
        // console.log(record);
        var content = this.getDetailContent(record.data, {}, false),
            detail = this.self.detail,
            currentData = detail.getData(),
            carousel = detail.query('carousel')[0],
            panel = detail.query('panel'),
            type = record.data.typeName,
            userInfo = record.data.userInfo,
            html = '';

        if(userInfo == null){
            carousel.setHidden(true);

            if(type == 'Flickr'){
                html = content.createFlickrBody();
                panel[0].setHidden(true);
                panel[1].setHidden(false);
                panel[1].setHtml(html);

            }else{            
                html = content.createBody();

                panel[0].setHidden(false);
                panel[0].setHtml(html[0]);
                panel[1].setHtml(html[1]);
            }
        }else{
            html = content.createTwitterBody();

            if(currentData == null || currentData.type != type){
                carousel.getItems().items[1].setHtml(html[0]);
                carousel.getItems().items[2].setHtml(html[1]);

                if(fromTablet == true){
                    carousel.setHeight(180);
                }else{
                    carousel.setHeight(140);
                }
            }
            carousel.setHidden(false);
            carousel.setActiveItem(0);

            panel[0].setHidden(false);
            panel[0].setHtml(html[2]);
            panel[1].setHtml(html[3]);

        }

        // detail.setData(data);
        detail.show();
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

    },

getDetailContent:function(data, userInfo, fromTablet){
        var replaceLinks = function(html, replace){
            if(html == null) {
                return '';
            }
            
            html = html.replace(/(http:\/\/[^\s]*)/g, "<span class=\"link\" name=\"$1\">$1</span>");
            html = html.replace(/(www.[^\s]*)/g, "<span class=\"link\" name=\"http://$1\">$1</span>");

            return html;
        },  
        filterTags = function(html){
            html = html.replace(/<[\/]{0,1}(a|A|iframe|Iframe|IFrame|IFRAME)[^><]*>/g,"");    
            return html;
        },
        getDateStr = function(yymmdd){
            // console.log(typeof 'a');
            yymmdd = (typeof yymmdd == 'string' ? new Date(yymmdd) : yymmdd);

            if (yymmdd) {
                var date = yymmdd.getDate(),
                    month = yymmdd.getMonth(),
                    year = yymmdd.getFullYear(),
                    day = yymmdd.getDay(),
                    aDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    aMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                return aDay[day] + ', ' + (date.length == 1 ? '0'+date : date) + ' ' + aMonth[month] + ', ' + year;
            }               
        }          

        var createBody = function(){
            var image = data.image,
                type = data.typeName,
                header = '',
                body = '';

            if(image != null && image != ""){
                header =
                '<div class=\"header '+ type +'\">' +
                    '<img src='+ image +' style="float:left;width:'+ (type == 'Youtube' ? '60' : '45') +'px;-webkit-border-radius:5px;">' +
                    '<div style="margin-left:'+ (type == 'Youtube' ? '70' : '55') +'px;">' + 
                        '<h3><strong>'+ replaceLinks(data.title) +'</strong></h3>' +
                        '<h4>'+ getDateStr(data.pubDate) +'</h4>' +
                    '</div>' +
                '</div>';
            }else{
                header =
                '<div class=header '+ type +'>' + 
                    '<h3><strong>'+ replaceLinks(data.title) +'</strong></h3>' +
                    '<h4>'+ getDateStr(data.pubDate) +'</h4>' +
                '</div>';
            }

            if(type == 'Youtube' && fromTablet){
                body = '<iframe class="video" width="95%" align="center" height="280" src='+ data.link +'?enablejsapi=1" frameborder="0" allowfullscreen style="margin-left:auto;margin-right:auto;display:block;margin-top:10px;"></iframe>'
                // body = '<iframe class="video" width="95%" align="center" height="270" src="http://www.youtube.com/embed/fnIl212tBPk?enablejsapi=1" frameborder="0" allowfullscreen style="margin-left:auto;margin-right:auto;display:block;margin-top:10px;"></iframe>'
                // body = '<video controls="controls" x-webkit-airplay="allow" src="'+ data.link +'&html5=True" width="95%" style="margin:5px;"></video>';
            }
            
            if(type == 'Insight' || type == 'Wordpress'){
                body += '<div id="detailContent">'+ filterTags(data.content) +'</div>';
            }else{
                body += '<p>'+ replaceLinks(data.content) +'</p>';
            }        

            return [header, body];
        },
        createTwitterBody = function(){
            // console.log(userInfo);
            var image = data.image,
                type = data.type,
                header = '',
                header2 = '',
                indicator = '',
                body = '',
                height = (fromTablet?180:140),
                layerHeight = (fromTablet?90:60),
                top = (fromTablet?25:7),

                header =
                '<div style="background-image:url('+ userInfo.profile_banner_url +'/mobile);background-size:100%;height:'+ height +'px;padding-top:'+ top +'px;background-color:#444;">' +
                    '<div style="width:100%;height:'+ layerHeight +'px;position:absolute;top:'+ (height - layerHeight) +'px;background-image:-webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.54902) 100%);text-shadow: rgb(255, 255, 255) 0px 1px 0px;background-color: rgba(0, 0, 0, 0);background-origin: padding-box;"></div>' + 
                    '<img src='+ image +' style="display:block;-webkit-border-radius:5px;margin-top:7px;margin-left:auto;margin-right:auto;">' +
                    '<div style="position:relative;padding:0px;margin-top:'+ top +'px;color:white;text-align:center;text-shadow: rgba(0, 0, 0, 0.498039) 0px 1px 1px;">' + 
                        '<h3><strong style="font-size:larger;margin-bottom:5px;">'+ userInfo.name +'</strong></h3>' +
                        '<h4 style="padding:5px;">@'+ userInfo.screen_name +'</h4>' +
                    '</div>' +
                '</div>';

                header2 =
                '<div style="background-image:url('+ userInfo.profile_banner_url +'/mobile);background-size:100%;height:'+ height +'px;padding-top:5px;background-color:#444;">' +
                    '<div style="width:100%;height:'+ layerHeight +'px;position:absolute;top:'+ (height - layerHeight) +'px;background-image:-webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.54902) 100%);text-shadow: rgb(255, 255, 255) 0px 1px 0px;background-color: rgba(0, 0, 0, 0);background-origin: padding-box;"></div>' + 
                    '<div style="position:relative;margin-top:'+ top +'px;color:white;text-align:center;text-shadow: rgba(0, 0, 0, 0.498039) 0px 1px 1px;">' + 
                        '<h4 style="margin-bottom:'+ top +'px;"><span class=link name='+ userInfo.url +' style="color:white;text-decoration:none;">'+ userInfo.url +'</span></h4>' +
                        '<h4>'+ userInfo.description +'</h4>' +
                    '</div>' +
                '</div>';

                indicator =
                '<div style="height:50px;background-color:#fff;padding:0px;border-top:rgba(0,0,0, 0.0976563) solid 1px;border-bottom:rgba(0,0,0, 0.0976563) solid 1px;">' + 
                // border-bottom-left-radius:5px;border-bottom-right-radius:5px;
                    // '<h3><strong>Tweets:'+ userInfo.statuses_count +' Following:'+ userInfo.friends_count +' Followers:'+ userInfo.followers_count +' </strong></h3>' +
                    // '<span>'+ this.getDateStr(data.pubDate) +'</span>' +
                    '<span style="padding:5px 5px 5px 12px;float:left;border-right:rgba(0,0,0, 0.0976563) solid 1px;font-weight:bold;font-size:medium;width:33%;height:100%;">'+ userInfo.statuses_count + '</br><span style="color:gray;font-weight:lighter;font-size:small">Tweets</span></span>' +
                    '<span style="padding:5px 5px 5px 12px;float:left;border-right:rgba(0,0,0, 0.0976563) solid 1px;font-weight:bold;font-size:medium;width:33%;height:100%;">'+ userInfo.followers_count + '</br><span style="color:gray;font-weight:lighter;font-size:small">Followers</span></span>' +
                    '<span style="padding:5px 5px 5px 12px;float:left;font-weight:bold;font-size:medium;width:33%;height:100%;">'+ userInfo.friends_count + '</br><span style="color:gray;font-weight:lighter;font-size:small">Following</span></span>' +
                    '<span style="clear:both;"></span>' +
                    // Tweets:'+ userInfo.statuses_count + ', Followers:'+ userInfo.followers_count +'
                    // '<div style="color:#000;font-weight:normal;vertical-align:middle;font-size:small;text-align:center;">Tweets:'+ userInfo.statuses_count + ', Followers:'+ userInfo.followers_count +'</div>' +
                '</div>';
              
            body += '<div style="'+ (fromTablet?'line-height:150%;padding:25px 15px 15px 15px;font-size:larger;':'line-height:120%;padding:10px;') +'background-color:white;">'+ replaceLinks(data.title) +'</div>';
            return [header, header2, indicator, body];
        },
        // createFlickrBody = function(width, height){
        createFlickrBody = function(){
            var image = data.image,
                header = '';

            // word-wrap:break-word;
            // body = '<div style="margin:0px;padding:0px;background-color:#444;background-image:url(' + image + '.jpg);background-repeat:no-repeat;background-position:center center;width:100%;height:'+ height +'px;"></div>' +
            header = '<div><img src=' + image + '.jpg style="width:100%;margin:0px;padding:0px;"/></div>'+
                     '<div style="background-color:#fff;padding:10px;color:#000;"><strong>'+ data.title + '</strong></br></br><span style="font-size:smaller;">' + data.content +'</span></div>';
            // return [header, body];
            return header;
        }

        return {
            createBody:         createBody,
            createTwitterBody:  createTwitterBody,
            createFlickrBody:   createFlickrBody
        }
    },   
    stopVideo:function(){
        if(!Ext.os.is.Phone){
            var videos = Ext.DomQuery.select('iframe.video');

            for(var i=0;i<videos.length;i++){
                var func = 'stopVideo';
                videos[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
            }
        }
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