//<debug>
Ext.Loader.setPath({
    'Ext':      'touch/src',
    'Ext.ux':   'app/ux'
});
//</debug>

Ext.application({

    name: 'OECDInfo',

    requires: [
        'Ext.MessageBox',
        'Ext.data.proxy.JsonP',
        'Ext.tab.Panel'
    ],

    views: [
        'Main',
        'Menu',
        'Detail',
        'MainList',
        'Share'
    ],

    models: [
        'Feed'
    ],

    stores: [
        'MainStore'
    ],

    controllers: [
       'Main'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    themes:[
        {
            name:'OECD Generic',
            key:'Generic'
        },
        {
            name:'Agriculture and Food',
            key:'Agriculture'
        },
        {
            name:'Development',
            key:'Development'
        },
        {
            name:'Economics',
            key:'Economics'
        },
        {
            name:'Education',
            key:'Education'
        },
        {
            name:'Employment',
            key:'Employment'
        },
        {
            name:'Energy',
            key:'Energy'
        },
        {
            name:'Environment',
            key:'Environment'
        },
        {
            name:'Finance and Investment',
            key:'Finance'
        },
        {
            name:'Governance',
            key:'Governance'
        },
        {
            name:'Industry and Services',
            key:'Industry'
        },
        {
            name:'Nuclear Energy',
            key:'Nuclear'
        },
        {
            name:'Science and Technology',
            key:'Science'
        },
        {
            name:'Social Issues/Migration/Health',
            key:'Social'
        },
        {
            name:'Taxation',
            key:'Taxation'
        },
        {
            name:'Trade',
            key:'Trade'
        },
        {
            name:'Transport',
            key:'Transport'
        },
        {
            name:'Urban, Rural and Regional Development',
            key:'Urban'
        }
    ],
    isTablet:false,
    currentType:'All',
    serviceRoot:function(){
        var protocol = location.protocol;
        console.log(protocol)
        if(protocol == 'file:'){
            return 'http://test-oecdinfo.herokuapp.com';
        }else{
            return '';
        }
    },
    launch: function() {

        var queryString = function () {
          // This function is anonymous, is executed immediately and 
          // the return value is assigned to QueryString!
          var query_string = {};
          var query = window.location.search.substring(1);
          var vars = query.split("&");
          for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
                // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
              query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
              var arr = [ query_string[pair[0]], pair[1] ];
              query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
              query_string[pair[0]].push(pair[1]);
            }
          } 
            return query_string;
        } ();


        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var width = window.innerWidth;
        var device = queryString.d;
        if(device == 'phone'){
            this.isTablet = false; 
        }else if(device == 'tablet'){
            this.isTablet = true; 
        }else{
            if(width > 500){
                this.isTablet = true; 
            }
        }

        console.log(this.isTablet);

        Ext.Viewport.on('orientationchange', function() {
            if (Ext.os.is.Android) {
                Ext.Viewport.setSize(window.innerWidth,window.innerHeight);
            }
        });
        // Initialize the main view
        Ext.Viewport.add((this.isTablet ? Ext.create('OECDInfo.view.Main') : Ext.create('OECDInfo.view.MainList')));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
