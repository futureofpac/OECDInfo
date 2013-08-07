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
            listtop: 'mainlist toolbar',
            loadmore:'mainlist panel button[action="loadmore"]',
            // main: 'main',
            menu: 'menu', 
            menulist: '#menu',
            menutheme: '#theme',
            menuthemefield: '#theme checkboxfield',
            menuBtn: 'mainlist toolbar button[action="menu"]',
            searchfield: 'menu toolbar searchfield',
            searchclear:'mainlist panel button[action="search"]',
            refreshBtn: 'mainlist toolbar button[action="refresh"]',
            // moviePosterListContainer:   'slidenavigationview container[title="Item 8"]',
            detail:'#detail',
            share:'share',
            tabletPrev:'#btnPrev',
            tabletNext:'#btnNext'
        },

        control: {
            viewport:{
                onrientationchange:function () {
                    alert('change')
                }
            },
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
                        this.callLogItem(record.data)
                    }
                },
                loadmoretap:function () {
                    // console.log('called!');
                    // this.displayList(++this.self.currentPage);
                }
            },
            listtop:{
                toptap:function(){
                    alert('a')
                }
            },
            searchfield:{
                searchtap:function(search){
                    this.callService(this.getTheme(), search)
                // },
                // cleartap:function(){
                //     this.callService(this.getTheme());
                }
            },
            searchclear:{
                tap:function(){
                    this.controlSearchBox();
                    this.getSearchfield().setValue('');
                    this.callService(this.getTheme());
                }
            },
            loadmore:{
                tap:function(){
                    this.loadMore();
                }
            },
            tabletPrev:{
                tap:function () {
                    var data = this.getDataByIndex('prev', this.self.currentIndex);
                    if(data == 'first'){
                        Ext.Msg.alert('', 'This is the first item')
                    }else{
                        // this.scrollListSelected(this.self.currentIndex);
                        this.self.currentIndex--;
                        this.scrollListSelected();
                        this.openDetail(data);
                    }
                }
            },
            tabletNext:{

                tap:function () {
                    var data = this.getDataByIndex('next', this.self.currentIndex);
                    if(data == 'last'){
                        Ext.Msg.alert('', 'This is the last item')
                    }else{
                        if(this.self.currentIndex == (this.self.currentPage * this.self.pageSize)-1){
                        // this.scrollListSelected(this.self.currentIndex);
                            this.loadMore();
                        } 
                        this.self.currentIndex++;
                        this.scrollListSelected();
                        this.openDetail(data);
                    }
                }
            },         
            detail:{
                show:function () {
                    if(this.self.isTablet){
                        this.openTabletNavi();
                    }
                },
                hide:function(){
                    console.log(this.self.currentIndex);
                    if(this.self.currentIndex > -1 && !this.self.isTablet){
                        this.scrollListSelected();
                    }
                    if(this.self.isTablet){
                        this.closeTabletNavi();
                    }
                },
                hidetap:function(){
                    this.hideDetail();
                },
                prevtap:function () {
                    var data = this.getDataByIndex('prev', this.self.currentIndex);
                    if(data == 'first'){
                        Ext.Msg.alert('', 'This is the first item')
                    }else{
                        // this.scrollListSelected(this.self.currentIndex);
                        this.self.currentIndex--;
                        this.openDetail(data);
                    }
                },
                nexttap:function () {
                    var data = this.getDataByIndex('next', this.self.currentIndex);
                    if(data == 'last'){
                        Ext.Msg.alert('', 'This is the last item')
                    }else{
                        if(this.self.currentIndex == (this.self.currentPage * this.self.pageSize)-1){
                        // this.scrollListSelected(this.self.currentIndex);
                            this.loadMore();
                        } 
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
                },
                emailtap:function(data){
                    this.shareEmail(data);
                },
                facebooktap:function(data){
                    this.shareFacebook(data);
                },
                twittertap:function(data){
                    this.shareTwitter(data);
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
                    var title = (type == 'All' ? OECDInfo.app.label : type);
                    toolbar = this.getList().query('toolbar')[0];
                    toolbar.setTitle(title);

                    this.self.currentType = type;
                    OECDInfo.app.currentType = type;

                    if(type == 'Links'){
                        // this.displayMenu();
                        this.callLinks();
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
                    this.shareEmail();
                },
                facebooktap:function(){
                    this.shareFacebook();
                },
                twittertap:function(){
                    this.shareTwitter();
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
        this.callLogInit();
        this.callParent(arguments);
    },
    launch:function(){
        this.callParent(arguments);
        // this.initMenu();
        this.initOptions();
        // var themes = this.getTheme();
        var themes = 'Generic';

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
    callLogInit:function(){
        var me = this;
        Ext.data.JsonP.request({
            url: 'http://smart-ip.net/geoip-json',
            // url: OECDInfo.app.serviceRoot() + '/api/links/',
            timeout: 20000,
            callback:function(success, response){
                var log = {
                    ip:response.host,
                    deviceType:Ext.os.deviceType,
                    os:Ext.os.name,
                    osversion:Ext.os.version,
                    country:response.countryName,
                    countryCode:response.countryCode,
                    city:response.city,
                    createdat:(new Date())
                };

                Ext.Ajax.request({
                    url: OECDInfo.app.serviceRoot() + '/log/init',
                    method:'POST',
                    params:log,
                    callback:function(success, response){

                    }
                });
            } 
        });
    },
    callLogTheme:function(themes){
        Ext.Ajax.request({
            url: OECDInfo.app.serviceRoot() + '/log/theme',
            method:'POST',
            params:{themes:themes},
            callback:function(success, response){

            }
        });
    },
    callLogItem:function(data){
        Ext.Ajax.request({
            url: OECDInfo.app.serviceRoot() + '/log/item',
            method:'POST',
            params:{
                typeName:data.typeName,
                title:data.title,
                image:data.image,
                pubdate:data.pubDate
            },
            callback:function(success, response){

            }
        });
    },
    scrollListSelected:function(){
        var list = this.getList(),
            els = list.getViewItems(),
            el = els[this.self.currentIndex-1],
            offset = el.bodyElement.dom.offsetTop-26;

        list.getScrollable().getScroller().scrollTo(0, offset);
        list.deselectAll();
        list.select(this.self.currentIndex);
    },
    getLink:function(){
        var replaceLinks = function(html, replace){
            if(html == null) {
                return '';
            }
            
            html = html.replace(/(http:\/\/[^\s]*)/g, "<span class=\"link\" name=\"$1\">$1</span>");
            html = html.replace(/(www.[^\s]*)/g, "<span class=\"link\" name=\"http://$1\">$1</span>");
            html = html.replace(/(@[^\s]*)/g, "<span class=\"at\" name=\"http://$1\">$1</span>");
            html = html.replace(/(#[^\s]*)/g, "<span class=\"shap\" name=\"http://$1\">$1</span>");

            return html;
        }  

    },
    preloadImg:function(srcs){
        for(var i=0;i<srcs.length;i++){
            var images = new Image()
            images.src = srcs[i];
        }
    },
    shareEmail:function(){
        var data = this.self.detail.getData();
        // window.open('mailto:?subject=OECD Info:' + data.title + '&body=' + data.link + data.content);
        // window.open('mailto:?subject=OECD Info:' + data.title + '&body=' + data.link);
        alert('a')
        window.open('mailto:?subject=OECD Info:', 'email' );
    },
    shareFacebook:function(data){
        var data = this.self.detail.getData();
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + data.link, 'fbsharer');
    },
    shareTwitter:function(data){
        var data = this.self.detail.getData();
        window.open('https://twitter.com/intent/tweet?url='+ data.link +'&text=' + data.title, 'twitter');
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

            this.self.prev = Ext.Viewport.add(
                {
                    xtype:'image',
                    id:'btnPrev',
                    src:'resources/images/arrow_left.png',
                    zIndex:10000,
                    width:110,
                    height:130,
                    top:300,
                    left:50
                }
            );
            
            this.self.next = Ext.Viewport.add(
                {
                    xtype:'image',
                    id:'btnNext',
                    src:'resources/images/arrow_right.png',
                    zIndex:10000,
                    width:110,
                    height:130,
                    top:300,
                    right:50
                }
            );

            this.self.detail = Ext.Viewport.add(
                {
                    xtype:'detail',
                    fromTablet:true,
                    modal:true,
                    hideOnMaskTap:true,
                    width:400,
                    height:'80%',
                    centered:true,
                    style:'border:solid 1px black',
                    showAnimation:{
                        // type:'fadeIn',
                        type:'pop',
                        // direction:'top',
                        duration:150
                    },
                    hideAnimation:{
                        type:'fadeOut',
                        // direction:'top',
                        duration:150
                    }                
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

            this.preloadImg([
                'resources/images/arrow_left.png',
                'resources/images/arrow_right.png'
            ]);

        }else{
            this.self.menu = Ext.Viewport.add({xtype:'menu'});
            this.self.detail = Ext.Viewport.add({xtype:'detail'});
            this.self.actionsheet = Ext.Viewport.add({xtype:'share'});
        }
    },
    openTabletNavi:function() {
        this.self.prev.show();
        this.self.next.show();
    },
    closeTabletNavi:function() {
        this.self.prev.hide();
        this.self.next.hide();
    },
    getTheme:function(){
        // var local = localStorage.getItem('themes');
        var local = localStorage['themes'];
        var json = JSON.parse(local);
        return ((json == '' || json == null) ? 'Generic' : json);
    },
    setTheme:function(themes){
        // window.localStorage.removeItem('themes');
        // localStorage.setItem('themes', JSON.stringify(themes));
        localStorage['themes'] = JSON.stringify(themes);
    },
    setFeeds:function(feeds){
        console.log(feeds);
        // window.localStorage.removeItem('themes');
        // localStorage.setItem('feeds', JSON.stringify(feeds));
        localStorage['feeds'] = JSON.stringify(feeds);
        // window.localStorage.setItem('feeds', feeds);
    },
    getFeeds:function(){
        // var local = localStorage.getItem('feeds');
        var local = localStorage['feeds'];
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
    handleOrientationDetail:function(){
        var width = window.innerWidth;

        if(width > 800){
            this.self.prev.setTop(330);
            this.self.next.setTop(330);

            this.self.prev.setLeft(90);
            this.self.next.setRight(90);

            this.self.detail.setWidth(440);
            this.self.detail.setHeight('80%');
        }else{
            this.self.prev.setTop(500);
            this.self.next.setTop(500);

            this.self.prev.setLeft(50);
            this.self.next.setRight(50);

            this.self.detail.setWidth(400);
            this.self.detail.setHeight('70%');
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

            if(fromTablet){
                this.handleOrientationDetail();
            }
            // panelProvider = panel[1];
            detail.setData(data);

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
                    carousel.setHeight(130);
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
                    carousel.setHeight(130);
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

        // _gaq.push(['_trackEvent', 'type', type]);
    },
    hideDetail:function(){
        this.self.detail.hide();
    },
    callLinks:function () {
        var me = this;
        Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading', zIndex:100000});
        Ext.data.JsonP.request({
            url: OECDInfo.app.serviceRoot() + '/api/links/',
            callback:function(success, response){

                if(response == null){
                    Ext.Msg.alert('Alert', 'No Data, Try it later again');
                    me.displayMenu();
                }else{
                    me.self.links = [].concat(response);
                    me.displayMenu();
                }
                Ext.Viewport.setMasked(false);
            } 
        });
    },
    callService:function (themes, search) {
        // if(navigator.onLine){
            var me = this;
            Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading', zIndex:100000});
            console.log(themes);
            console.log(search);
            var url = '';
            if(search != undefined){
                url = OECDInfo.app.serviceRoot() + '/api/'+themes+'/60/'+search;
            }else{
                url = OECDInfo.app.serviceRoot() + '/api/'+themes+'/20/';
            }
            Ext.data.JsonP.request({
                url: url,
                callback:function(success, response){
                    console.log(response);

                    if(response == null){
                        Ext.Msg.alert('Alert', 'No Data, Try it later again');
                        me.displayList(1);
                    }else{
                        me.self.feeds = [].concat(response.feeds);
                        // me.self.links = [].concat(response.links);

                        me.controlSearchBox(search);
                        me.displayList(1, search);
                        // me.setFeeds([{test:'aaaa'}]);
                        var localFeeds = [], type = '';
                        for(var i=0;i<response.feeds.length;i++){
                            type = response.feeds[i].typeName;
                            if(type != 'Articles' && type != 'Photos' && type != 'Videos'){
                                localFeeds.push(response.feeds[i]);
                            }
                        }
                        // me.setFeeds(localFeeds);
                    }
                    Ext.Viewport.setMasked(false);
                } 
            });
        // }else{
        //     Ext.Msg.alert('Notice', 'No Internet connection, data will be loaded from the cache and some features might be limited.')
        //     var cache = this.getFeeds();

        //     console.log(cache);

        //     if(cache){
        //         this.self.feeds = [].concat(cache);
        //     }
        //     // if(cache.links){
        //     //     this.self.links = [].concat(cache.links);
        //     // }
        //     this.displayList(1);
        // }
        this.callLogTheme(themes);
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
    loadMore:function(){
        this.getLoadmore().getParent().setHidden(true);
        console.log('called!');
        this.displayList(++this.self.currentPage);
    },
    controlSearchBox:function(search){
        var searchclear = this.getSearchclear().getParent();

        if(search == undefined){
            searchclear.setHidden(true);
            this.getListtop().setTitle(OECDInfo.app.label);
        }else{
            this.getListtop().setTitle('Search Result');
            searchclear.setHidden(false);
            searchclear.setHtml('<p style="color:black;">"'+ search +'" ('+ this.self.feeds.length +' items)</p>');
        }
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

                    store.setData(data);
                    store.load();

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

        var imgs = [];
        for(var i=0;i<data.length;i++){
            if(data[i].typeName == 'Photos'){
                imgs.push(data[i].image + '.jpg');
            }
        }
        if(imgs.length > 0){
            this.preloadImg(imgs);            
        }
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
                        // '<h4><strong>Theme: '+ me.getThemeByKey(data.theme) +'</strong></h4>' +
                        // '<h4>Published at: '+ getDateStr(data.pubDate) +'</h4>' +
                        '<h4 style="font-size:14px;">'+ me.getThemeByKey(data.theme) +' | '+ getDateStr(data.pubDate) +'</h4>' +
                    '</div>' +
                '</div>';
            }else{
                header =
                '<div class=header '+ type +'>' + 
                    '<h3><strong>'+ replaceLinks(data.title) +'</strong></h3>' +
                    // '<h4><strong>Theme: '+ me.getThemeByKey(data.theme) +'</strong></h4>' +
                    // '<h4>Published at: '+ getDateStr(data.pubDate) +'</h4>' +
                    '<h4 style="font-size:14px;">'+ me.getThemeByKey(data.theme) +' | '+ getDateStr(data.pubDate) +'</h4>' +
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
                height = (fromTablet?170:130),
                layerHeight = (fromTablet?90:60),
                top = (fromTablet?17:5),

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
                        '<h4 style="font-size:smaller">'+ userInfo.description +'</h4>' +
                    '</div>' +
                '</div>';

                indicator =
                '<div style="height:50px;background-color:#fff;padding:0px;border-top:rgba(0,0,0, 0.0976563) solid 1px;border-bottom:rgba(0,0,0, 0.0976563) solid 1px;">' + 
                // border-bottom-left-radius:5px;border-bottom-right-radius:5px;
                    // '<h3><strong>Tweets:'+ userInfo.statuses_count +' Following:'+ userInfo.friends_count +' Followers:'+ userInfo.followers_count +' </strong></h3>' +
                    // '<span>'+ this.getDateStr(data.pubDate) +'</span>' +
                    '<span style="padding:5px 5px 5px 12px;float:left;border-right:rgba(0,0,0, 0.0976563) solid 1px;font-weight:bold;font-size:medium;width:24%;height:100%;">'+ userInfo.statuses_count + '</br><span style="float:left;color:gray;font-weight:lighter;font-size:small">Tweets</span></span>' +
                    '<span style="padding:5px 5px 5px 12px;float:left;border-right:rgba(0,0,0, 0.0976563) solid 1px;font-weight:bold;font-size:medium;width:24%;height:100%;">'+ userInfo.followers_count + '</br><span style="float:left;color:gray;font-weight:lighter;font-size:small">Followers</span></span>' +
                    '<span style="padding:5px 5px 5px 12px;float:left;font-weight:bold;font-size:medium;width:24%;height:100%;">'+ userInfo.friends_count + '</br><span style="float:left;color:gray;font-weight:lighter;font-size:small">Following</span></span>' +
                    '<span style="padding:12px 5px 5px 5px;float:right;font-weight:bold;font-size:medium;width:28%;height:100%;">' +
                        '<img src="resources/images/twitter_32.png" width=30 style="vertical-align:middle;margin-right:4px;">' +
                        '<a href="https://twitter.com/intent/user?screen_name='+ userInfo.screen_name +'" target="_new" style="text-decoration:none;font-size:smaller;color:black;">Follow</a>' +
                    '</span>' +
                    '<span style="clear:both;"></span>' +
                    // Tweets:'+ userInfo.statuses_count + ', Followers:'+ userInfo.followers_count +'
                    // '<div style="color:#000;font-weight:normal;vertical-align:middle;font-size:small;text-align:center;">Tweets:'+ userInfo.statuses_count + ', Followers:'+ userInfo.followers_count +'</div>' +
                '</div>';

                body +=
                '<div style="font-size:14px;color:gray;'+ (fromTablet?'padding:10px 15px 15px 10px;':'padding:7px 10px 8px 10px;') +'">' + 
                    // '<h4><strong>Theme: '+ me.getThemeByKey(data.theme) +'</strong></h4>' +
                    // '<h4>Published at: '+ getDateStr(data.pubDate) +'</h4>' +
                    '<h4>'+ me.getThemeByKey(data.theme) +' | '+ getDateStr(data.pubDate) +'</h4>' +
                '</div>' +
                '<div style="'+ (fromTablet?'line-height:140%;padding:0px 15px 15px 15px;font-size:17px;':'line-height:110%;padding:0px 10px 10px 10px;') +'background-color:white;">'+ replaceLinks(data.title) +'</div>';
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