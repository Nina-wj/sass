/*-----------------------------------------------------------------------------
* @Description:     欢迎页面的操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-16
* ==NOTES:=============================================
* v1.0.0(2013-12-16):
*     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/welcome', function(S,Core){
	PW.namespace('page.Welcome');
	PW.page.Welcome = function(param){
		return new Core(param);
	}
},{
	requires:[
		'home/core',
		'mod/dialog'
	]
})


/**
 * 整个树节点的控制中心
 * 跳转控制
 */
KISSY.add('home/core', function(S, Menu, Crumb, Logout){
	var
		DOM = S.DOM, get = DOM.get,
		CONFIG = {
			menuUrl: ''
		},
		el = {
			iframe: '#J_contentHolder iframe'
		};
	function Core(param){
		this.opts = S.merge(CONFIG, param);
		this.menu = new Menu(this.opts.menuUrl);
		this.crumb = new Crumb();
		this.logout = new Logout();
		this.iframeUrl = '';
		this.init();
	}

	S.augment(Core, {
		init: function(){
			this._loadLastPage();
			this.addEvtDispatcher();
		},
		addEvtDispatcher: function(){
			var
				that = this;
			that.menu.on('select', function(e){
				that.crumb.refresh(e.nodes);
			})
			on(el.iframe, 'load', that._beforeUnloadHandler, that);
			on(window, 'hashchange', that._hashChangeHandler, that);
		},
		//如果页面刷新，且页面中存在hash值为一个链接，则自动打开此链接
		_loadLastPage: function(){
			var
				that = this,
				hash = window.location.hash,
				url = '';
			if(hash != '' && hash.search('redirectUrl=') > -1){
				url = hash.substr(13);
				that._ifarmeOpen(url);
			}
		},
		_hashChangeHandler: function(ev){
			var
				that = this,
				hash = window.location.hash,
				url;
			if(hash != '' && hash.search('redirectUrl=') > -1){
				url = hash.substr(13);
				if(url != that.iframeUrl){
					that._ifarmeOpen(url);
				}
			}
		},
		//当iframe切换时，采集url
		_beforeUnloadHandler: function(ev){
			var
				that = this,
				url = ev.currentTarget.contentWindow.location.href;
			if(url != ''){
				window.location.hash = 'redirectUrl=' + url;
				that.iframeUrl = url;
			}
		},
		//在iframe中打开一个新页
		_ifarmeOpen: function(url){
			var
				that = this;
			window.top.open(url, that.menu.linkTarget)
			that.crumb.refresh([{
				nodeId: -2, name:'上次打开的页面',url: url
			}]);
			//如果出现了内嵌情况，则强制跳出重新登录
			that._forceTop();
		},
		//处理页面可能出现的首页套首页问题
		_forceTop: function(){
			var
				loc = window.top.location;
			if(window.top != window) {
				//意在遮罩主页套主页的问题
				PW.dialog.alert('出现错误，请重新登录',function(){
					window.top.location = '/user/toLogin';
				}, {
					topLayer: 2
				});
			}
		}
	})
	return Core;
},{
	requires:[
		'home/menu',
		'home/crumb',
		'home/logout',
		'home/layout'
	]
})



/**
 * 导航菜单的样式
 */
KISSY.add('home/menu', function(S, LoginIO){
	var
		DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
		on = S.Event.on,  delegate = S.Event.delegate, detach = S.Event.detach,
		IO = S.IO, juicer = S.juicer, JSON = S.JSON,
		el = {
			menu: '#J_menu',
			content: '#J_contentHolder'
		},
		//过渡动画时长
		ANIMATE_TIMEOUT = .1;

	//控制鼠标移出任何li时的事件
	function addTargetOutEvt(target,subMenu){
		var $subMenu = $(subMenu);
		$(target)
			.on('mouseout', function(ev){
				if(!$subMenu.data('timer')){
					$subMenu.data('timer', S.timer(function(){
						$subMenu.hide().data('timer', null);
					}, .05, 1))
				}
			})
	}
	//添加控制二级以下子菜单移入移出事件
	function addSubMenuEvt(subMenu){
		var $subMenu = $(subMenu);
		$subMenu
			.on('mouseover', function(ev){
				if(!!$subMenu.data('timer')){
					S.clearTimer($subMenu.data('timer'))
					$subMenu.data('timer',null);
				}
			})
			.on('mouseout', function(ev){
				if(!$subMenu.data('timer')){
					$subMenu.data('timer', S.timer(function(){
						$subMenu.hide().data('timer', null);
					}, .05, 1))
				}
			});
	}

	/**
	 * 构造函数
	 * @param  {String} url 菜单地址
	 */
	var Menu = function(url){
		this.url = url;
		//所有菜单链接的目标窗口
		this.linkTarget = $(el.content).one('iframe').attr('name');
		this.loadingTip = PW.mod.LoadingTip({
			hint: '正在加载菜单信息，请稍候...',
			width: 200
		});
		this.init();
	}

	S.augment(Menu, S.EventTarget, {
		init: function(){
			var
				that = this;
			//加载菜单数据
			this.loadingTip.show();
			this._loadMenu(function(rs){
				try{
					if(rs.status){
						//写入菜单数据
						that._render(rs.nodes);
						that.addEvtDispatcher();

						S.timer(function(i,stop){
							that.loadingTip.hide();
						},.2,1)

					}else{
						alert(rs.msg);
					}
				}catch(err){
					S.log(err)
				}
			});
		},
		addEvtDispatcher: function(){
			var
				that = this;
			//一级菜单移入
			delegate(el.menu, 'mouseover', '.menu-title', that._menuOverHandler, that);
			//二级以下菜单移入
			delegate(el.menu, 'mouseover', '.sub-menu li',that._subMenuOverHandler, that);
			//最终菜单点击关闭
			delegate(el.menu, 'click', '.leaf', that._closeSubMenuHandler, that);
		},

		//鼠标移入第一级菜单事件
		_menuOverHandler: function(ev){
			var
				that = this,
				target = ev.target,
				li = DOM.parent(target,'li'),
				sm = DOM.siblings(target,'ul'),
				aoff = DOM.offset(target),
				h = DOM.height(li);
			if(sm != null){
				if(!!$(sm).data('timer')){
					//如果计时器存在，则清空
					S.clearTimer($(sm).data('timer'))
					$(sm).data('timer', null);
				}else{
					DOM.css(sm, {
						left: aoff.left,
						//根据项目需要为top加了holder的padding高度
						top:  h +5
					})
					
					addTargetOutEvt(target, sm);
					addSubMenuEvt(sm);
					$(sm).animate({
						opacity: 'show',
						//根据项目需要为top加了holder的padding高度
						top: h +5
					}, ANIMATE_TIMEOUT);
				}
			}
		},
		//二级菜单移入事件
		_subMenuOverHandler: function(ev){
			var
				that = this,
				target = ev.target,
				li = DOM.parent(target,'li'),
				psm = DOM.parent(target,'.sub-menu'),
				sm  = DOM.siblings(target, '.sub-menu'),
				tOff = DOM.offset(target),
				pOff = DOM.offset(psm),
				w = DOM.width(li),
				smw = DOM.width(sm);
			if(sm != null){
				if(!!$(sm).data('timer')){
					//如果计时器存在，则清空
					S.clearTimer($(sm).data('timer'))
					$(sm).data('timer', null);
				}else{
					$(sm).css({
						left: w - 10,
						top: tOff.top - pOff.top,
						width: smw
					}).show();

					addTargetOutEvt(target, sm);
					addSubMenuEvt(sm);
				}
			}

		},
		//点击最终菜单，将下拉菜单关闭
		_closeSubMenuHandler: function(ev){
			var
				that = this,
				target = ev.target,
				menu = DOM.parent(target,'.menu-item');
			if(menu != null){
				$(menu).children('ul').hide();
				that.fire('select', {nodes: that._getParentSeries(target)})
			}
		},
		/**
		 * 获取父亲节点序列
		 * @param  {htmlElement} el 叶子节点
		 * @return {Array}    从子节点到父节点的数组
		 */
		_getParentSeries: function(el){
			var
				arr = [],
				prts;
			prts = DOM.parents(el,'li');
			S.each(prts, function(li){
				var 
					url = '',
					o = {
						nodeId: $(li).attr('nid'),
						name: $(li).children('a').text()
					};
				url = $(li).children('a').attr('href');
				if( url != ''){
					o.url = url;
				}
				arr.push(o);
			})
			return arr;
		},
		/**
		 * 渲染menu第一级菜单
		 * @param  {Object} nodes 所有远端传入的节点
		 */
		_render: function(nodes){
			var 
				that = this,
				html  = '';
			for(var i = 0, l = nodes.length; i < l; i++){
				var node1 = nodes[i];
				html += '<li nid="'+node1.nodeId+'" class="menu-item">';
				html += '<a href="javascript:;" class="menu-title" title="'+ node1.description +'">'+ node1.name +'</a>';
				if(!!node1.children || !S.isEmptyObject(node1.children)){
					html += that._createSubMenu(node1.nodeId,node1.children);
				}
				html += '</li>';
			}
			DOM.html(el.menu,'');
			DOM.appendHTML(el.menu, html);
		},
		/**
		 * 拼接2级及以下菜单html
		 * @param  {Object} subNodes 二级菜单节点json
		 * @return {String}          html片段
		 */
		_createSubMenu: function(pid,subNodes){
			var
				that = this,
				linkTarget = that.linkTarget,
				html = '<ul pid="'+ pid +'" class="sub-menu" style="z-index: 200;">';
			for(var i = 0, l = subNodes.length; i < l; i++){
				var node2 = subNodes[i];
				html +='<li nid="'+ node2.nodeId +'">';
				if(!!node2.children || !S.isEmptyObject(node2.children)){
					html += '<a href="javascript:;" class="next">'+ node2.name +'</a>';
					html += arguments.callee.call(that,node2.nodeId, node2.children); //此处测试callee
				}else if(node2.url){
					html += '<a href="'+ node2.url +'" class="leaf" target="'+ linkTarget +'">'+ node2.name +'</a>'
				}
				html += '</li>';
			}
			html += '</ul>';
			return html;
		},
		/**
		 * 返回远程加载的数据，保证json格式，否则，报错
		 * @param  {Function} cb 回调函数
		 */
		_loadMenu: function(cb){
			var
				that = this,
				url = that.url;
			LoginIO.getMenu('', function(code,rs,errMsg){
				cb({
					status: true,
					nodes: rs.zNodes
				});
			})
			/*IO({
				url: url,
				type: 'get', 
				success: function(data){
					if(S.isString(data)) data = JSON.parse(data);
					cb({
						status: true,
						nodes: data.zNodes
					});
				},
				error: function(err){
					S.log(err);
					cb({
						status: false,
						msg: '加载目录数据失败'
					})
				}
			});*/
		}
	});

	return Menu;
	
},{
	requires:[
		'io/login',
		'core',
		'mod/juicer',
		'mod/ext',
		'mod/loading-tip',
		'sizzle'
	]
})

/**
 * 面包屑控制
 */
KISSY.add('home/crumb', function(S){
	var
		DOM = S.DOM, get = DOM.get, query = DOM.query, $ =　S.all,
		on = S.Event.on,
		el = {
			crumb: '#J_crumb',
			iframe : '#J_contentHolder iframe'
		};


	var Crumb = function(){
		this.firstItem = {
			nodeId: -1,
			name: '后台管理'
		};
		this.init();
	}

	S.augment(Crumb, {
		init: function(){
			var
				that = this;
			if(window.location.hash.search('redirectUrl=') > -1){				
				that.refresh([{nodeId: -2, name:'上次打开的页面'}]);
			}else{
				that.refresh([{nodeId: -2, name:'欢迎页'}]);
			}
			
		},
		refresh: function(nodes){
			var
				that = this,
				html;
			nodes.push(that.firstItem);
			nodes.reverse();
			html = that._createHTML(nodes);
			that._render(html);
		},
		//渲染crumb
		_render: function(html){
			DOM.html(el.crumb, '');
			DOM.appendHTML(el.crumb, html);
		},
		_createHTML: function(nodes){
			var
				that = this,
				html = '',
				l = nodes.length;
			S.each(nodes, function(node,i){
				if(i == 0){
					html += '<li forMenu="'+ node.nodeId +'" class="first">';
				}else if(i == l -1){
					html += '<li forMenu="'+ node.nodeId +'" class="last">';
				}else{
					html += '<li forMenu="'+ node.nodeId +'">';
				}
				if(i == l -1){
					html += '<a href="'+ node.url +'" target="'+ get(el.iframe).name +'">'+ node.name +'</a>'
				}else{
					html += '<a href="javascript:;">'+ node.name +'</a>'
				}
				
				html += '</li>';
			})
			return html;
		}
	})

	return Crumb;
},{
	requires:[
		'core',
		'mod/ext'
	]
})


/**
 * 修复布局缺陷(此处调用直接修复)
 */
KISSY.add('home/layout', function(S){
	var
		DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
		on = S.Event.on,
		el = {
			logoBar: '#J_logoBar',
			menu: '#J_menu',
			crumb: '#J_crumb',
			content: '#J_contentHolder'
		};	
	function init(){
		fix();
		on(window,'resize', function(ev){
			fix();
		})
	}
	//高度修复
	function fix(){
		var
			//视窗高度
			vh = $(window).height(),
			//logo高度
			lh = $(el.logoBar).outerHeight(),
			//导航高度
			nh = $(el.menu).outerHeight(),
			//面包屑高度
			cbh = $(el.crumb).outerHeight(),
			//额外的偏移修正高度
			off = 25;
		$(el.content).height(vh - lh - nh - cbh - off);
	}
	init();
},{
	requires:[
		'core'
	]
})

/**
 *登出 
 */

KISSY.add('home/logout',function(S){
    var 
    	DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all
    	on = S.Event.on, detach = S.Event.detach, 
        el = {
            username:'#J_userName'
        };
    var Logout = function(){
    	this.overlay = PW.mod.Overlay({
    		zIndex: 101,
    		bgColor: '#fff'
    	});
    	this.init();
    }

    S.augment(Logout, {
    	init: function(){
    		var
    			that = this;
    		that.addEvtDispatcher();
    	},
    	addEvtDispatcher: function(){
    		var
    			that = this;
    		on(el.username, 'click', that._showLogoutPanel,that);
    		that.overlay.on('click', that._hideLogoutPanel,that)
    	},
    	_showLogoutPanel: function(){
    		var
    			that = this,
    			$panel = $(el.username).one('ul');
    		$panel.css('zIndex', 102).show();
    		that.overlay.render();

    		S.Event.one(window,'keyup',function(evt){
	            if(evt.keyCode == '27'){
	                that._hideLogoutPanel();
	            }
	        })
    	},
    	_hideLogoutPanel: function(){
    		var
    			that = this,
    			$panel = $(el.username).one('ul');
    		this.overlay.hide();
    		$panel.hide();
    	}
    });
    return Logout;
},{
    requires:[
    	'mod/overlay'
    ]
});