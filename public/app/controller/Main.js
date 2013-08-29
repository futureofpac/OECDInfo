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
            pnlTheme: 'menu panel[action="pnlTheme"]', 
            openTheme: 'menu panel button[action="open"]', 
            cancelTheme: 'theme button[action="cancel"]', 
            saveTheme: 'theme button[action="save"]', 
            menulist: '#menu',
            menutheme: '#theme',
            // menuthemefield: '#theme checkboxfield',
            menuBtn: 'mainlist toolbar button[action="menu"]',
            searchfield: 'menu toolbar searchfield',
            searchresult:'mainlist panel[action="search"]',
            searchclear:'mainlist panel button[action="search"]',
            refreshBtn: 'mainlist toolbar button[action="refresh"]',
            // moviePosterListContainer:   'slidenavigationview container[title="Item 8"]',
            detail:'#detail',
            share:'share',
            tabletPrev:'#btnPrev',
            tabletNext:'#btnNext'
        },
        routes: {
            'home': 'closeDialog'
        },
        control: {
            // viewport:{
            //     onrientationchange:function () {
            //         alert('change')
            //     }
            // },
            list:{
                itemsingletap:function (me, index, target, record, e, eOpts) {
                    console.log(me);
                    console.log(index);
                    console.log(record.data);

                    console.log(e);
                    console.log(target);


                    if(e.target.className == "link"){
                        this.getList().deselect(index);
                        this.openLink(e.target.innerText);
                    }else{
                        this.self.currentIndex = index;
                        if(record.data.typeName == 'Links'){
                            this.openLink(record.data.link);
                        }else{

                            this.openDetail(record.data);
                            this.callLogItem(record.data)
                        }
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
                    // this.callService(this.getTheme());
                    this.callServiceOffline();
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
                        if((this.self.currentIndex+3) == (this.self.currentPage * this.self.pageSize)-1){
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
                // show:function () {
                //     if(this.self.isTablet){
                //         this.openTabletNavi();
                //     }
                // },
                hide:function(){
                    var me = this;
                    console.log(this.self.currentIndex);
                    if(this.self.currentIndex > -1 && !this.self.isTablet){
                        this.scrollListSelected();
                    }
                    if(this.self.isTablet){
                        this.closeTabletNavi();
                    }
                    setTimeout(function(){
                        me.getList().deselectAll();
                        // me.getList().deselect(me.self.currentIndex, true);
                    },1000);
                },
                hidetap:function(){
                    this.closeDetail();
                },
                prevtap:function () {
                    // var data = this.getDataByIndex('prev', this.self.currentIndex);
                    // if(data == 'first'){
                    //     Ext.Msg.alert('', 'This is the first item')
                    // }else{
                    //     // this.scrollListSelected(this.self.currentIndex);
                    //     this.self.currentIndex--;
                    //     this.openDetail(data);
                    // }
                    this.naviDetail('prev');
                },
                nexttap:function () {
                    // var data = this.getDataByIndex('next', this.self.currentIndex);
                    // if(data == 'last'){
                    //     Ext.Msg.alert('', 'This is the last item')
                    // }else{
                    //     if(this.self.currentIndex == (this.self.currentPage * this.self.pageSize)-1){
                    //     // this.scrollListSelected(this.self.currentIndex);
                    //         this.loadMore();
                    //     } 
                    //     this.self.currentIndex++;
                    //     this.openDetail(data);
                    // }
                    this.naviDetail('next');
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
                    this.shareFacebook();
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
            openTheme:{
                tap:function() {
                    // if(this.self.theme.getHidden()){
                    //     this.self.theme.show();
                    // }else{
                    //     this.self.theme.hide();
                    // }
                    this.openTheme();
                }
            },
            saveTheme:{
                tap:function(){
                    this.saveTheme();
                }
            },
            cancelTheme:{
                tap:function(){
                    this.closeTheme();
                }
            },
            // menuthemefield:{
            //     themetap:function(){
            //         // alert('b')
            //         var result = [];

            //         Ext.Object.each(this.getMenutheme().getValues(), function(key, value, myself) {
            //             if(value != null){
            //                 result.push(value)
            //             }
            //         }); 

            //         // console.log(this.getMenutheme().getValues());
            //         this.setTheme(result.join(','));
            //         if(!this.self.stopCheckEvent){
            //             this.callService(result.join(','));
            //         }
            //     }
            // },
            share:{
                emailtap:function(){
                    this.self.actionsheet.hide();
                    this.shareEmail();
                },
                facebooktap:function(){
                    this.self.actionsheet.hide();
                    this.shareFacebook();
                },
                twittertap:function(){
                    this.self.actionsheet.hide();
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
        theme:null,
        actionsheet:null,
        // stopCheckEvent:false,
        isTablet:false
    },  
    init:function(){
        this.callLogInit();
        this.callParent(arguments);
    },
    launch:function(){
        this.callParent(arguments);
        // this.initMenu();
        this.setLocation('home');
        this.initOptions();
    },
    naviDetail:function(direction){
        var data = this.getDataByIndex(direction, this.self.currentIndex);
        if(direction == 'prev'){
            if(data == 'first'){
                Ext.Msg.alert('', 'This is the first item')
            }else{
                this.self.currentIndex--;
                this.scrollListSelected(this.self.currentIndex);
                this.openDetail(data);
            }
        }else if(direction == 'next'){
            if(data == 'last'){
                Ext.Msg.alert('', 'This is the last item')
            }else{
                // if(this.self.currentIndex == (this.self.currentPage * this.self.pageSize)-1){
                //     this.loadMore();
                // } 
                this.loadWhenlast();
                this.self.currentIndex++;
                this.scrollListSelected(this.self.currentIndex);
                this.openDetail(data);
            }
        }
    },
    checkKey:function(e, me) {
        e = e || window.event;

        // if (e.keyCode == '8' || e.keyCode == '27') {
        //     me.closeDialog();
        // }

        if(me.self.detail.getHidden()){
            if (e.keyCode == '38') {
                // if(me.self.currentIndex > 0){
                //     me.self.currentIndex--;
                // }
                if(me.self.currentIndex == 0){
                    me.self.currentIndex=-1;
                    me.getList().deselect(0);
                }else if(me.self.currentIndex == 1){
                    me.self.currentIndex--;
                    me.getList().deselect(1);
                    me.getList().select(0);
                }else if(me.self.currentIndex > 1){
                    me.self.currentIndex--;
                    me.scrollListSelected();
                }
            }else if (e.keyCode == '40') {
                if(me.self.currentIndex == -1){
                    me.self.currentIndex++;
                    me.getList().select(0);
                }else{
                    me.self.currentIndex++;
                    this.loadWhenlast();
                    me.scrollListSelected();
                }
            }else if (e.keyCode == '13') {
                console.log(e);
                if(e.target.className.toString().indexOf('search') == -1){
                    me.openDetail(me.self.feeds[me.self.currentIndex]);
                }
            }
        }else{
            if (e.keyCode == '37') {
                me.naviDetail('prev');
            }else if (e.keyCode == '39') {
                me.naviDetail('next');
            }            
        }
    },
    callLogInit:function(){
        var me = this;
        Ext.data.JsonP.request({
            url: 'http://smart-ip.net/geoip-json',
            // url: OECDInfo.app.serviceRoot() + '/api/links/',
            timeout: 20000,
            callback:function(success, response){
                var log = {
                    ip:(response == null ? '' : response.host),
                    deviceType:Ext.os.deviceType,
                    os:Ext.os.name,
                    osversion:Ext.os.version,
                    country:(response == null ? '' : response.countryName),
                    countryCode:(response == null ? '' : response.countryCode),
                    city:(response == null ? '' : response.city),
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
    closeDialog:function(){
        if(!Ext.os.is.iOS && !OECDInfo.app.isInitial){
            if(!this.self.isTablet){
                this.closeMenu();
            }

            if(!this.self.theme.getHidden()){
                this.closeTheme();
            }
            if(!this.self.detail.getHidden()){
                this.closeDetail();
            }
        }
    },
    loadWhenlast:function(){
        if(this.self.currentIndex == (this.self.currentPage * this.self.pageSize)-1){
            this.loadMore();
        } 
    },    
    scrollListSelected:function(){
        var list = this.getList(),
            els = list.getViewItems(),
            el = els[this.self.currentIndex-1];

            if(el !== undefined){
                offset = el.bodyElement.dom.offsetTop-26;

                list.getScrollable().getScroller().scrollTo(0, offset);
                list.deselectAll();
                list.select(this.self.currentIndex);                
            }
    },
    getLink:function(html){
        if(html == null) {
            return '';
        }
        
        html = html.replace(/(http:\/\/[^\s]*)/g, "<span class=\"link\" name=\"$1\">$1</span>");
        html = html.replace(/(www.[^\s]*)/g, "<span class=\"link\" name=\"http://$1\">$1</span>");
        // html = html.replace(/(@[^\s]*)/g, "<span class=\"at\" name=\"http://$1\">$1</span>");
        // html = html.replace(/(#[^\s]*)/g, "<span class=\"shap\" name=\"http://$1\">$1</span>");

        return html;
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
        this.openLink('mailto:?subject=OECD Info:')
    },
    shareFacebook:function(){
        var data = this.self.detail.getData();
        var link = data.link;
        this.openLink('https://www.facebook.com/sharer/sharer.php?u=' + data.link);
    },
    shareTwitter:function(data){
        var data = this.self.detail.getData();
        // this.openLink('https://twitter.com/intent/tweet?url='+ data.link +'&text=' + data.title, 'twitter');
        this.openLink('https://twitter.com/intent/tweet');
    },
    checkTheme:function(themes){
        // console.log(themes);
        // // var themesArray = [];
        console.log(this.getMenutheme().query('checkboxfield'));
        var checks = this.getMenutheme().query('checkboxfield');

        for(var i=0;i<checks.length;i++){
            for(var j=0;j<themes.length;j++){
                if(checks[i].getValue() == themes[j]){
                    checks[i].check();
                }
            }
        }
    },
    labelTheme:function(themes){
        console.log(themes);
        // // var themesArray = [];
        // console.log(this.getMenutheme().getValues());

        var index = 0;
            themesArray = OECDInfo.app.themes,
            html = '';

        for(var i=0;i<themes.length;i++){
            for(var j=0;j<themesArray.length;j++){
                if(themesArray[j].key == themes[i]){
                    html += '<div style="padding:10px;font-size:smaller;">' + themesArray[j].name + '</div>';
                }
            }
        }

        this.getPnlTheme().setHtml(html);
        // this.getMenutheme().setValues(themesArray);
    },
    setLocation:function(type){
        if(!Ext.os.is.iOS){
            var url = location.href.toString();
            // if(type == 'home'){
            //     if(url.indexOf('#') > -1){
            //         url = url.split('#')[0] + '#home';
            //     }
            //     location.href = url;
            // }else{
                if(url.indexOf('#') > -1){
                    url = url.split('#')[0];
                }
                location.href = url + '#' + type;
            // }
        }
    },
    initOptions:function(){

        var me = this;

        console.log(this.self.isTablet);
        this.self.isTablet = OECDInfo.app.isTablet;

        var themes = this.getTheme();
        OECDInfo.app.isInitial = (themes == '' ? true : false);

        if(this.self.isTablet){

            Ext.Viewport.on('orientationchange', 'handleOrientationDetail', this);

            this.self.theme = Ext.Viewport.add({
                xtype:'theme',
                // instructions:'Chose themes you are interested in',
                fromTablet:true,
                hidden:(OECDInfo.app.isInitial ? false : true),
                modal:true,
                hideOnMaskTap:true,
                // zIndex:10001,
                width:770,
                height:540,
                centered:true
            });

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
                    hidden:true,
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

            this.preloadImg([
                'resources/images/arrow_left.png',
                'resources/images/arrow_right.png'
            ]);

        }else{
            this.self.theme = Ext.Viewport.add({
                xtype:'theme',
                hidden:(OECDInfo.app.isInitial ? false : true),
                zIndex:10005,
                centered:true,
                width:'100%',
                height:'100%'
            });

            this.self.menu = Ext.Viewport.add({xtype:'menu'});
            this.self.detail = Ext.Viewport.add({xtype:'detail'});
            // this.self.actionsheet = Ext.Viewport.add({xtype:'share'});
        }

        if(!OECDInfo.app.isInitial){
        // if(themes == ''){
        //     OECDInfo.app.isInitial = true;
        //     // this.openTheme();
        // }else{
            this.labelTheme(themes.split(','));        
            this.callService(themes);
        }


        if(!Ext.os.is.iOS){
            document.onkeydown = function(e){
                me.checkKey(e, me);
            }

            this.getDetail().on('hide', function(){
                me.setLocation('home');
            })
            this.self.theme.on('hide', function(){
                me.setLocation('home');
            })
            if(this.self.isTablet){
                this.getMenu().on('hide', function(){
                    me.setLocation('home');
                })
            }else{
                this.self.menu.on('hide', function(){
                    me.setLocation('home');
                })
            }
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
        var local = localStorage.getItem('themes');
        // var local = localStorage['themes'];
        // alert(local);
        var json = JSON.parse(local);
        // alert(json)
        // return ((json == '' || json == null) ? 'Generic' : json);
        return ((json == '' || json == null) ? '' : json);
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
            this.setLocation('menu')
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
    saveTheme:function(){
        var checks = this.getMenutheme().query('checkboxfield'),
            result = [];

        for(var i=0;i<checks.length;i++){
            if(checks[i].getChecked()){
                result.push(checks[i].getValue());
            }
        }
        var themes = result.join(',');
        this.labelTheme(result)
        this.setTheme(themes);
        this.callService(themes);
        this.closeTheme();
        if(!this.self.isTablet){
            this.closeMenu();
        }
    },
    openTheme:function(){
        console.log(this.self.theme.getHidden());
        this.self.theme.show();
        console.log(this.self.theme.getHidden());
        // this.self.theme.setHidden(false);
        this.setLocation('theme');
        var themes = this.getTheme();
        this.checkTheme(themes.split(','));        
    },
    closeTheme:function(){
        this.self.theme.hide();
    },
    handleOrientationDetail:function(){
        var width = window.innerWidth;
    alert(width)

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
        this.setLocation('detail');

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

            panelContent.getScrollable().getScroller().scrollTo(0, 0);

            if(fromTablet){
                this.handleOrientationDetail();
                this.openTabletNavi();
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
    closeDetail:function(){
        // this.self.currentIndex = -1;
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

                OECDInfo.app.isInitial = false;
                // if(!success){
                //     this.callServiceOffline(true);
                // }else{
                    if(response == null){
                        Ext.Msg.alert('Alert', 'No Data, Try it later again');
                        me.displayList(1);
                    }else{
                        me.self.feeds = [].concat(response.feeds);
                        console.log('in callService:');
                        console.log(me.self.feeds);
                        // me.self.links = [].concat(response.links);
                        me.controlSearchBox(search);
                        me.displayList(1);
                        // me.setFeeds([{test:'aaaa'}]);

                        if(search == undefined){

                            var localFeeds = [], type = '';
                            for(var i=0;i<response.feeds.length;i++){
                                type = response.feeds[i].typeName;
                                // if(type != 'Articles' && type != 'Photos' && type != 'Videos'){
                                    localFeeds.push(response.feeds[i]);
                                // }
                            }
                            // me.setFeeds(localFeeds);
                            me.setFeeds(response.feeds);
                        }else{
                            if(!me.self.isTablet){
                                me.closeMenu();
                            }
                        }
                    }
                    Ext.Viewport.setMasked(false);
                    me.callLogTheme(themes);
                // }
            } 
        });
    },
    callServiceOffline:function(useAlert){
        if(useAlert){
            Ext.Msg.alert('Notice', 'It seems there is no Internet connection, data will be loaded from the cache and some features might be limited.')
        }
        var cache = this.getFeeds();

        console.log(cache);

        if(cache){
            this.self.feeds = [].concat(cache);
        }
        // if(cache.links){
        //     this.self.links = [].concat(cache.links);
        // }
        this.displayList(1);
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
        var searchclear = this.getSearchresult();

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
        console.log('page:' + page);
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
            // window.open(link, '_newtab')
        // Create link in memory
        if (Ext.os.is.Android) {
            var a = window.document.createElement("a");
            a.target = '_blank';
            a.href = link;
         
            // Dispatch fake click
            var e = window.document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);        
        }else{
            var ref = window.open(link, '_blank', 'location=yes');
        }
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
                '<div style="'+ (fromTablet?'line-height:140%;padding:0px 15px 15px 15px;font-size:17px;':'line-height:110%;padding:0px 10px 10px 10px;') +'background-color:white;">'+ data.title +'</div>';
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
        // if(this.self.isTablet){
        //     var btnShare = this.getDetail().query('button[action=share]')[0];
        //     this.self.actionsheet.showBy(btnShare);
        // }else{
            this.self.actionsheet.show();
        // }
        // console.log(actionsheet);
        // this.getShare().show();
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