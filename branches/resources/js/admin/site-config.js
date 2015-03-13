(function(){
    var  
		loc = window.location,
		host = loc.host,
        $libUrl = 'http://pui.pandawork.net/resources/',
		$staticWebsite = 'http://static.servant.pandawork.net/',
        $website = (host.search('localhost') > -1 || host.search('192') > -1)?
                        'http://' + host + '/':
                        'http://servant.pandawork.net/'
        
    PW_CONFIG = {
        //发布版本的地址域名,通常为http://localhost:8080 || http://emenu.pandawork.net
        website: $website,
        //静态资源地址，通常为此项目的resources文件夹地址，此文件夹多以文件服务器的方式存在
        staticWebsite: $staticWebsite,
        //pui地址，提供一套完整的pandawork 前端组件库
        libUrl : $libUrl,
        libTag:'v0',
        appTag: 'v0',
        //app配置
        pkgs:[{
            name:'page',
            path: $staticWebsite + 'resources/js/admin/app/',
            charset:'utf-8'
        },{
            name: 'io',
            path: $staticWebsite + 'resources/js/admin/app/',
            charset: 'utf-8'
        },{
            name: 'conn',
            path: $staticWebsite + 'resources/js/admin/app/',
            charset: 'utf-8'
        }],
        //组件库的配置参数
        modSettings:{
            dialog:{
                postion: 'fixed',
                top: 100,
                topLayer: 1,
                hasOverlay: true
            },
            defender: {
                theme: 'inline'
            },
            connector: {
                debug: false,
                //测试数据的地址前缀
               debugUrlPrefix: 'http://servant.pandawork.net/' + 'data/servant/',
               //debugUrlPrefix: $staticWebsite + 'test/api-data/',
                //线上发布数据的地址前缀
                deployUrlPrefix: $website
            },
			upload: {
                flashUrl: $staticWebsite + 'resources/flash/swfupload_fp10.swf',
                flash9Url: $staticWebsite + 'resources/flash/swfupload_fp9.swf'
            }
        }
    };
})()
