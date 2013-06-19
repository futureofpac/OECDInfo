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
            main:'main',
            list: 'mainlist',
            loadmore:'mainlist panel button',
            // main: 'main',
            menu: 'menu', 
            menulist: '#menu',
            menutheme: '#theme',
            menuthemefield: '#theme checkboxfield',
            menuBtn: 'mainlist toolbar button[action="menu"]',
            refreshBtn: 'mainlist toolbar button[action="refresh"]',
            // moviePosterListContainer:   'slidenavigationview container[title="Item 8"]',
            detail:'#detail',
            share:'share'
        },

        control: {
            
            list:{
                itemsingletap:function (me, index, target, record, e, eOpts) {
                    console.log(me);
                    console.log(index);
                    console.log(record.data);
                    this.self.currentIndex = index;
                    // var main = this.getMain();
                    // // Ext.defer(main.moveContainer, 200, main);
                    // main.moveContainer(null, -200, 200)
                    if(record.data.typeName == 'Links'){
                        this.openLink(record.data.link);
                    }else{
                        this.openDetail(record.data);
                    }
                },
                loadmoretap:function () {
                    // console.log('called!');
                    // this.displayList(++this.self.currentPage);
                }
            },
            loadmore:{
                tap:function(){
                    this.getLoadmore().getParent().setHidden(true);
                    console.log('called!');
                    this.displayList(++this.self.currentPage);
                }
            },            
            detail:{
                hidetap:function(){
                    this.hideDetail();
                },
                prevtap:function () {
                    var data = this.getDataByIndex('prev', this.self.currentIndex);
                    if(data == 'first'){
                        Ext.Msg.alert('', 'This is the first item')
                    }else{
                        this.self.currentIndex--;
                        this.openDetail(data);
                    }
                },
                nexttap:function () {
                    var data = this.getDataByIndex('next', this.self.currentIndex);
                    if(data == 'last'){
                        Ext.Msg.alert('', 'This is the last item')
                    }else{
                        this.self.currentIndex++;
                        this.openDetail(data);
                    }
                },
                sharetap:function(){
                    this.openShare();
                },
                opentap:function(link){
                    this.openLink(link);
                },
                providertap:function(direction){
                    var detail =  this.self.detail;

                    this.controlProvider(direction);
                }
            },
            menuBtn: {
                tap:function (me, e, eOpts) {
                    // var main = this.getMain();
                    // main.moveContainer(null, 200, 200)
                    console.log(this.getMenu());
                    if(this.getMenu().getHidden()){
                        this.openMenu();
                    }else{
                        this.closeMenu();
                    }
                }
            },
            refreshBtn:{
                tap:function (me, e, eOpts) {
                    this.callService(this.getTheme());
                }
            },
            menulist: {
                typetap:function (type) {
                    var title = (type == 'All' ? 'OECD Info' : type);
                    toolbar = this.getList().query('toolbar')[0];
                    toolbar.setTitle(title);

                    this.self.currentType = type;
                    OECDInfo.app.currentType = type;

                    if(type == 'Links'){
                        this.displayMenu();
                    }else{
                        this.displayList(1);
                    }
                    if(!this.self.isTablet){
                        this.closeMenu();
                    }
                }
            },
            menuthemefield:{
                themetap:function(){
                    // alert('b')
                    var result = [];

                    Ext.Object.each(this.getMenutheme().getValues(), function(key, value, myself) {
                        if(value != null){
                            result.push(value)
                        }
                    }); 

                    // console.log(this.getMenutheme().getValues());
                    this.setTheme(result.join(','));
                    if(!this.self.stopCheckEvent){
                        this.callService(result.join(','));
                    }
                }
            },
            share:{
                emailtap:function(){
                    var data = this.self.detail.getData();
                    console.log(data);
                    // window.open('mailto:""', 'email')
                    var a = document.createElement('a');
                    // a.href='mailto:?subject=OECD Info:data&body=sss';
                    a.href='mailto:?subject=OECD Info:' + data.title + '&body=' + data.link + data.content;
                    // a.href='mailto:';
                    a.click();

                },
                facebooktap:function(data){
                },
                twittertap:function(data){

                    var data = this.self.detail.getData();
                    console.log(data);
                    // window.open('mailto:""', 'email')
                    var a = document.createElement('a');
                    a.target = '_new';
                    // a.href='mailto:?subject=OECD Info:data&body=sss';
                    a.href='https://twitter.com/intent/tweet';
                    // a.href='mailto:';
                    a.click();
                }
            }
        }
    },
    statics:{
        currentType:'',
        currentPage:1,
        currentIndex:-1,
        pageSize:40,
        feeds:[],
        links:[],
        detail:null,
        menu:null,
        actionsheet:null,
        stopCheckEvent:false,
        isTablet:false
    },  
    init:function(){
        this.callParent(arguments);
    },
    launch:function(){
        this.callParent(arguments);
        // this.initMenu();
        this.initOptions();
        var themes = this.getTheme();
        this.callService(themes);
        this.self.stopCheckEvent = true;
        this.checkTheme(themes.split(','));        
        this.self.stopCheckEvent = false;
        // console.log(this.getMenutheme());
        // console.log(this.getMenutheme().getFieldArray());
        // Ext.Object.each(this.getMenutheme().getItems(), function(item, key, myself) {
        //     // console.log(item.getLabel());
        //     console.log(key.getLabel());
        // }); 
    },
    checkTheme:function(themes){
        // console.log(themes);
        // // var themesArray = [];
        // console.log(this.getMenutheme().getValues());

        var index = 0;
        var themesArray = this.getMenutheme().getItems().items;
        Ext.Object.each(this.getMenutheme().getValues(), function(label, val, myself) {

            var check = false;
            var key = label.split(' ')[0];
            if(key == 'OECD'){
                key = 'Generic'
            }

            for (var i=0;i<themes.length;i++){
                if(themes[i] == key){
                    check = true;
                    break;
                }
            }

            if(check){
                themesArray[index].check();
            }
            index++;
        }); 

        this.getMenutheme().setValues(themesArray);
    },
    initOptions:function(){
        var me = this;
        console.log(this.self.isTablet);
        this.self.isTablet = OECDInfo.app.isTablet;
        if(this.self.isTablet){
            this.self.detail = Ext.Viewport.add(
                {
                    xtype:'detail',
                    fromTablet:true,
                    modal:true,
                    hideOnMaskTap:true,
                    width:350,
                    right:0
                }
            );
            this.self.actionsheet = Ext.Viewport.add(
                {
                    xtype:'share',
                    isTablet:true
                    // ,
                    // width:200,
                    // height:160,
                    // style:'font-size:smaller;',
                    // // modal:true,
                    // showAnimation:{
                    //     type:'fadeIn',
                    //     // direction:'top',
                    //     duration:150
                    // },
                    // hideAnimation:{
                    //     type:'fadeOut',
                    //     // direction:'top',
                    //     duration:150
                    // }
                }
            );
        }else{
            this.self.menu = Ext.Viewport.add({xtype:'menu'});
            this.self.detail = Ext.Viewport.add({xtype:'detail'});
            this.self.actionsheet = Ext.Viewport.add({xtype:'share'});
        }
    },
    getTheme:function(){
        var local = window.localStorage.getItem('themes');
        var json = JSON.parse(local);
        return ((json == '' || json == null) ? 'Generic' : json);
    },
    setTheme:function(themes){
        // window.localStorage.removeItem('themes');
        window.localStorage.setItem('themes', JSON.stringify(themes));
    },
    setFeeds:function(feeds){
        console.log(feeds);
        // window.localStorage.removeItem('themes');
        window.localStorage.setItem('feeds', JSON.stringify(feeds));
        // window.localStorage.setItem('feeds', feeds);
    },
    getFeeds:function(){
        var local = window.localStorage.getItem('feeds');
        var json = JSON.parse(local);
        return ((json == '' || json == null) ? [] : json);
        // return local;
    },
    openMenu:function(){
        if(this.self.isTablet){
            this.getMain().query('menu')[0].setHidden(false);
        }else{
            this.self.menu.show();
        }
    },
    closeMenu:function(){
        if(this.self.isTablet){
            this.getMain().query('menu')[0].setHidden(true);
        }else{
            this.self.menu.hide();
        }
    },
    openDetail:function(data){
        // console.log('detail');
        // this.self.detail.animateActiveItem(1, {type:'slide', direction:'left'})
        // console.log(this.self.detail);
        // console.log(record);

        var fromTablet = this.self.isTablet,
            content = this.getDetailContent(data, fromTablet)
            detail = this.self.detail,
            currentData = detail.getData(),
            topmenu = detail.query('toolbar')[0],
            carousel = detail.query('carousel')[0],
            panel = detail.query('panel'),
            type = data.typeName,
            userInfo = data.userInfo,
            html = '',
            panelTitle = panel[0],
            panelContent = panel[1],
            carousel1 = carousel.getItems().items[1],
            carousel2 = carousel.getItems().items[2];
            // panelProvider = panel[1];
            detail.setData(data)

        topmenu.setTitle(type);
        carousel.setActiveItem(0);

        if(userInfo == null){

            carousel.setHidden(true);
            if(type == 'Photos'){
                html = content.createFlickrBody();
                panelTitle.setHidden(true);
                panelContent.setHidden(false);
                panelContent.setHtml(html);

            }else{            
                html = content.createBody();

                panelTitle.setHidden(false);
                panelTitle.setHtml(html[0]);
 
                if(data.provider){
                    var provider = content.createProvider();
                    carousel1.setHtml(provider[0]);
                    carousel2.setHtml(provider[1]);
                    carousel.setHeight(140);
                //     // panelContent.setHtml('<div style="text-align:right;padding:10px 30px 0px 0px;">By <a href=# class=providername>' + data.provider.name + '</a></div><div id=providerinfo></div>' + html[1]);
                // }else{
                //     carousel.setHidden(true);
                }
                panelContent.setHtml(html[1]);
            }
        }else{
            html = content.createTwitterBody();

            if(currentData == null || currentData.type != type){
                carousel1.setHtml(html[0]);
                carousel2.setHtml(html[1]);

                if(fromTablet == true){
                    carousel.setHeight(170);
                }else{
                    carousel.setHeight(140);
                }
            }
            carousel.setHidden(false);

            panelTitle.setHidden(false);
            panelTitle.setHtml(html[2]);
            panelContent.setHtml(html[3]);
            // panelProvider.setHidden(true)

        }

        // detail.setData(data);
        detail.show();
    },
    hideDetail:function(){
        this.self.detail.hide();
    },
    callService:function (themes) {
        if(navigator.onLine){
            var me = this;
            Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading', zIndex:100000});
            console.log(themes);
            Ext.data.JsonP.request({
                url:'http://oecdinfo.herokuapp.com/api/'+themes+'/5/',
                callback:function(success, response){
                    console.log(response);
                    me.self.feeds = [].concat(response.feeds);
                    me.self.links = [].concat(response.links);
                    me.displayList(1);
                    // me.setFeeds([{test:'aaaa'}]);
                    var localFeeds = [], type = '';
                    for(var i=0;i<response.feeds.length;i++){
                        type = response.feeds[i].typeName;
                        if(type != 'Articles' && type != 'Photos' && type != 'Videos'){
                            localFeeds.push(response.feeds[i]);
                        }
                    }
                    me.setFeeds(localFeeds);
                    // me.setFeeds(response.links);
                    Ext.Viewport.setMasked(false);
                } 
            });
        }else{
            Ext.Msg.alert('Notice', 'No Internet connection, data will be loaded from the cache and some features might be limited.')
            var cache = this.getFeeds();

            console.log(cache);

            if(cache){
                this.self.feeds = [].concat(cache);
            }
            // if(cache.links){
            //     this.self.links = [].concat(cache.links);
            // }
            this.displayList(1);
        }

    },
    filterFn:function (element, index, array) {
        var type = this.self.currentType;
        // console.log(type);
        // console.log(element.typeName);
        return (element.typeName == type);
    },
    getDataByIndex:function(direction, index){
        var me = this;
        var filterFn = function (element, index, array) {
            var type = me.self.currentType;
            console.log(type);
            console.log(element.typeName);
            return (element.typeName == type);
        }
        var data = (
            (
                this.self.currentType == '' || this.self.currentType == 'All'
            ) ? 
            this.self.feeds : 
            this.self.feeds.filter(filterFn)
        );

        if(direction == 'prev'){
            if(index == 0){
                return 'first';
            }else{
                return data[index-1];
            }
        }else if(direction == 'next'){
            if(index == data.length){
                return 'last';
            }else{
                return data[index+1];
            }
        }
    },
    displayMenu:function(){
        var store = Ext.getStore('MainStore'),
            list = this.getList();
        // list.setGrouped(false);
        list.getScrollable().getScroller().scrollTo(0,0, false);

        store.removeAll();
        this.getLoadmore().getParent().setHidden(true);

        store.setData(this.self.links);
        store.load();
    },
    displayList:function (page) {
        var store = Ext.getStore('MainStore'),
            list = this.getList();

        if(page == 1){
            this.self.currentPage = 1;
        } 

        Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading', zIndex:100000});
        var me = this,
            pageSize = this.self.pageSize;

        var filterFn = function (element, index, array) {
            var type = me.self.currentType;
            return (element.typeName == type);
        }

        var feeds = (
            (
                this.self.currentType == '' || this.self.currentType == 'All'
            ) ? 
            this.self.feeds :
            this.self.feeds.filter(filterFn)
        );

        var data = feeds.slice(((page - 1) * pageSize),page * pageSize);

        if(feeds.length > data.length){
            this.getLoadmore().getParent().setHidden(false);
        }else{
            this.getLoadmore().getParent().setHidden(true);
        }


            console.log(data);

            if(page == 1){
                list.getScrollable().getScroller().scrollTo(0,0, false);
                if(data.length == 0){
                    store.removeAll();
                }else{
                    store.removeAll();
                    store.setData(data);
                    store.load();
                }
            }else{
                store.add(data);
            }

        // list.setGrouped(true);
        Ext.Viewport.setMasked(false);
    },
    openLink:function(link){
        window.open(link, 'OECD Info')
    },
    controlProvider:function(direction){
        var detail = this.self.detail,
            carousel = detail.query('carousel')[0];

        if(carousel.getHidden()){
            carousel.setHidden(false);
        }else{
            carousel.setHidden(true);
        }

        // if(direction == 'up'){

        // }else{
        //     carousel.setHidden(true);
        // }

    },
    getThemeByKey:function(key){
        var themes = OECDInfo.app.themes,
        result = '';
        for(var i=0;i<themes.length;i++){
            if(themes[i].key == key){
                result = themes[i].name;
                break;
            }
        }
        return result;
    },
    getDetailContent:function(data, fromTablet){
        var me = this;
        var replaceLinks = function(html, replace){
            if(html == null) {
                return '';
            }
            
            html = html.replace(/(http:\/\/[^\s]*)/g, "<span class=\"link\" name=\"$1\">$1</span>");
            html = html.replace(/(www.[^\s]*)/g, "<span class=\"link\" name=\"http://$1\">$1</span>");
            html = html.replace(/(@[^\s]*)/g, "<span class=\"at\" name=\"http://$1\">$1</span>");
            html = html.replace(/(#[^\s]*)/g, "<span class=\"shap\" name=\"http://$1\">$1</span>");

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
                        '<h4><strong>Theme: '+ me.getThemeByKey(data.theme) +'</strong></h4>' +
                        '<h4>Published at: '+ getDateStr(data.pubDate) +'</h4>' +
                    '</div>' +
                '</div>';
            }else{
                header =
                '<div class=header '+ type +'>' + 
                    '<h3><strong>'+ replaceLinks(data.title) +'</strong></h3>' +
                    '<h4><strong>Theme: '+ me.getThemeByKey(data.theme) +'</strong></h4>' +
                    '<h4>Published at: '+ getDateStr(data.pubDate) +'</h4>' +
                '</div>';
            }

            if(type == 'Videos' && fromTablet){
                body = '<iframe class="video" width="95%" align="center" height="280" src='+ data.link +'?enablejsapi=1" frameborder="0" allowfullscreen style="margin-left:auto;margin-right:auto;display:block;margin-top:10px;"></iframe>'
                // body = '<iframe class="video" width="95%" align="center" height="270" src="http://www.youtube.com/embed/fnIl212tBPk?enablejsapi=1" frameborder="0" allowfullscreen style="margin-left:auto;margin-right:auto;display:block;margin-top:10px;"></iframe>'
                // body = '<video controls="controls" x-webkit-airplay="allow" src="'+ data.link +'&html5=True" width="95%" style="margin:5px;"></video>';
            }
            
            // if(type == 'Insight' || type == 'Wordpress'){
            //     body += '<div id="detailContent">'+ filterTags(data.content) +'</div>';
            // }else{
            //     body += '<p>'+ replaceLinks(data.content) +'</p>';
            // }        
            body += '<div style="padding:10px">'+ filterTags(data.content) +'</div>';

            return [header, body];
        },
        createTwitterBody = function(){
            // console.log(userInfo);
            var image = data.image,
                type = data.type,
                userInfo = data.userInfo,
                header = '',
                header2 = '',
                indicator = '',
                body = '',
                height = (fromTablet?170:140),
                layerHeight = (fromTablet?90:60),
                top = (fromTablet?17:7),

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
console.log(data);
                body +=
                '<div style="font-size:smaller;color:gray;'+ (fromTablet?'padding:10px 15px 15px 15px;':'padding:10px;') +'">' + 
                    '<h4><strong>Theme: '+ me.getThemeByKey(data.theme) +'</strong></h4>' +
                    '<h4>Published at: '+ getDateStr(data.pubDate) +'</h4>' +
                '</div>' +
                '<div style="'+ (fromTablet?'line-height:140%;padding:20px 15px 15px 15px;font-size:18px;':'line-height:120%;padding:0px 10px 10px 10px;') +'background-color:white;">'+ replaceLinks(data.title) +'</div>';
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
        },
        createProvider = function(){
            var header = '', header2 = '';

                header =
                '<div style="background-size:100%;height:140px;padding-top:10px;background-color:#444;">' +
                    '<div style="position:relative;padding:0px;margin-top:10px;color:white;text-align:center;text-shadow: rgba(0, 0, 0, 0.498039) 0px 1px 1px;">' + 
                        (data.provider.logo ? '<img src="'+ data.provider.logo +'" height="40"> ':'') +
                        '<h3><strong style="font-size:larger;margin-bottom:12px;">' + data.provider.name +'</strong></h3>' +
                        '<h4 style="padding:5px;"><a href="'+ data.provider.url +'" target="_new" style="color:white">'+ data.provider.url +'</a></h4>' +
                    '</div>' +
                '</div>';

                header2 =
                '<div style="background-size:100%;height:140px;padding:7px;background-color:#444;">' +
                    '<div style="position:relative;margin-top:10px;color:white;text-align:center;text-shadow: rgba(0, 0, 0, 0.498039) 0px 1px 1px;">' + 
                        '<h4 style="font-size:smaller">'+ data.provider.description +'</h4>' +
                    '</div>' +
                '</div>';

            // return data.provider.name + ' ' + data.provider.url + ' ' + data.provider.description
            return [header, header2];
        }

        return {
            createBody:         createBody,
            createTwitterBody:  createTwitterBody,
            createFlickrBody:   createFlickrBody,
            createProvider: createProvider
        }
    },   
    openShare:function(){
        if(this.self.isTablet){
            var btnShare = this.getDetail().query('button[action=share]')[0];
            this.self.actionsheet.showBy(btnShare);
        }else{
            this.self.actionsheet.show();
        }
        // console.log(actionsheet);
    }
});




// main: {
            //     open: function(nav, position, duration) {
            //         console.log('Container open (position='+position+',duration='+duration+')');
            //     },

            //     close: function(nav, position, duration) {
            //         console.log('Container close (position='+position+',duration='+duration+')');
            //     },

            //     select: function(nav, item, index) {
            //         console.log('Selected item (index='+index+')');
            //     },

            //     opened: function(nav, aa, bb) {
            //         console.log('Container opened');
            //         console.log(nav);
            //         console.log(aa);
            //         console.log(bb);
            //     },

            //     closed: function(nav) {
            //         console.log('Container closed');
            //     },

            //     slideend: function(nav, aa, bb) {
            //         console.log('Container slideend');
            //         console.log(nav);
            //         console.log(aa);
            //         console.log(bb);
            //     },

            //     slidestart: function(nav, aa, bb) {
            //         console.log('Container slidestart');
            //         console.log(nav);
            //         console.log(aa);
            //         console.log(bb);
            //     },

            //     dragstart: function(nav) {
            //         console.log('Container dragstart');

            //     },

            //     dragend: function(nav, aa, bb) {
            //         console.log('Container dragend');
            //         console.log(nav);
            //         console.log(aa);
            //         console.log(bb);
            //     }
            // },

            // /**
            //  *  The 'activate' event fires on the container, not the child
            //  *  element.
            //  *
            //  */
            // moviePosterListContainer: {
            //     activate: function(container) {
            //         console.log('Activate moviePosterListContainer');
            //     }
            // },