/*-----------------------------------------------------------------------------
* @Description:     给公务员前台header操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014-02-20
* ==NOTES:=============================================
* v1.0.0(2014-02-20):
*     给公务员前台header操作
* ---------------------------------------------------------------------------*/
KISSY.add('page/common/header',function(S,Header, LoginAndRegister, Intercept){
	PW.namespace('page.common.header');
	PW.page.common.header = function(param){
		    new Header();
        new LoginAndRegister(param);
        new Intercept(param);
	}
},{
	requires:['comm/header','comm/loginAndRegister','comm/intercept']
});
KISSY.add('comm/header', function(S, BalanceIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on,
    	el={
    		//用户名
    		userName:'.user-name',
    		//用户导航
    		userNav:'.J_nav',
        //是否登录
        isloginEl:'.J_islogin',
        //用户豆数
        userBalance: '.J_userBalance'
    	};
   var Header = function(){
    	this._init();
    }
    S.augment(Header,{
    	_init:function(){
        this._initBalance();
    		this._addEvtDispatcher();
    	},
    	_addEvtDispatcher:function(){
    		var
    			that = this;
    		on(el.userName,'click',function(){
    			that._showUserNav();
    			
    		});
    		on(el.userNav,'mouseleave',function(){
    			that._hideNav();
    		});
    	},
      /**
       * 初始化用户豆信息
       * @return {[type]} [description]
       */
      _initBalance: function(){
        var
          that = this,
          isloginEl = DOM.val(el.isloginEl);
        if(!(!isloginEl || isloginEl == '0')){
          BalanceIO.getUserBalance({},function(code, data, errMsg){
            if(code){
            	var str = '剩余豆:'+data.userBalance;
              DOM.html(el.userBalance, str);
            }else{
              PW.page.Util.dialog.alert('<h1>' + errMsg + '</h1>');
            }
          });
        }
      },
    	/**
    	 * 显示用户导航
    	 * @return {[type]} [description]
    	 */
    	_showUserNav: function(){
    		var
    			that = this;
    		DOM.addClass(el.userName,'user-choosenav');
    		DOM.css(el.userName,'background-color','#F0F0F0');
    		DOM.css(el.userName,'border','1px solid #C1BFBF');
    		DOM.show(el.userNav);
    	},
    	/**
    	 * 隐藏用户导航
    	 * @return {[type]} [description]
    	 */
    	_hideNav: function(){
    		DOM.removeClass(el.userName,'user-choosenav');
    		DOM.css(el.userName,'background-color','#EBEBEB');
    		DOM.css(el.userName,'border','1px solid #EBEBEB');
			DOM.hide(el.userNav);
    	}
    });
    return Header;
},{
	requires:['io/balance','core','page/common/util']
});
/**
 * 网站登录
 * requires:['core' [description]
 * @param  {[type]} 'mod/dialog']}    [description]
 * @return {[type]}                    [description]
 */
KISSY.add('comm/loginAndRegister', function(S){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on,
        el={
            //登录按钮
            loginTrigger:'.J_login',
            //登录成功列表
            userTrigger:'.user-login',
            //未登录列表
            unLoginTrigger:'.user-unlogin',
            //注册按钮
            registerTrigger:'.J_register'
        },
        TIP = {
          modPwdSuccess:'修改密码成功，请重新登录！',
          registerSuccess:'注册用户成功，请点击登录！'
        };
    var LoginAndRegister = function(param){
        this.opts = param;
        this._init();
    }
    S.augment(LoginAndRegister, {
        _init: function(){
          this._addEvtDispatcher();  
      },
      _addEvtDispatcher: function(){
        var 
            that = this;
        on(el.loginTrigger, 'click', function(e){
            that._loginHandler();
        });
        on(el.registerTrigger, 'click', function(e){
            that._registerHandler();
        });
      },
      /**
       * 登录操作，弹出对话框登录
       * @return {[type]} [description]
       */
      _loginHandler: function(){
        var
            that = this,
            url = that.opts.loginUrl;
        PW.page.Util.dialog.manage(url,507, 310,function(data){
            //登录时返回code为0是表示登录成功
            if(data.code == 0){
                that._hideUnLogin();
                //重新刷新页面
                document.location.reload();
            //返回code为1是表示忘记密码重置密码
            }else if(data.code == 1){
                that._openForgetPwd();
              //返回code为2是标识立即注册新用户
            }else if(data.code == 2){
                that._registerHandler();
            }
        });
      },
      /**
       * 打开忘记密码对话框
       * @return {[type]} [description]
       */
      _openForgetPwd: function(){
        var
            that = this,
            url = that.opts.forgetPwdUrl;
        PW.page.Util.dialog.manage(url,355, 344,function(data){
            //返回code为0是表示重置密码成功
            if(data.code == 0){
              window.location.href = that.otps.returnIndexUrl;
            }
        });
      },
      /**
       * 打开注册对话框
       * @return {[type]} [description]
       */
      _registerHandler: function(){
          var
              that = this,
              url = that.opts.registerUrl;
          PW.page.Util.dialog.manage(url,500, 540,function(data){
                    //注册成功并提示信息
                if(data.code == 0){
                    PW.page.Util.dialog.alert('<h1>'+TIP.registerSuccess+'</h1>', null, {
                      topLayer: 1
                    });
                    //关闭注册弹出层，开启登录弹出层 
                }else if(data.code == 1){
                  that._loginHandler();
                }
          });
      },
      /**
       * 显示登录选项,并隐藏用户nav
       * @return {[type]} [description]
       */
      _showUnLogin: function(){
        DOM.show(el.unLoginTrigger);
        DOM.hide(el.userTrigger);
      },
      /**
       * 隐藏登录选项,并显示用户nav
       * @return {[type]} [description]
       */
      _hideUnLogin:function(){
        DOM.hide(el.unLoginTrigger);
        DOM.show(el.userTrigger);
      }
    });
    return LoginAndRegister;
},{
    requires:['core','mod/dialog','page/common/util']
});
/********************************页面拦截**********************************************/
KISSY.add('comm/intercept', function(S){
  var 
      DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
      on = S.Event.on, delegate = S.Event.delegate,
      el = {
        //导航栏
        navHolder: '.crumb',
        //是否登录
        isloginEl:'.J_islogin'
      },
      //学前测试的class名
      A_CLASS_ATTR = 'J_preTest',
      TIP = {
          modPwdSuccess:'修改密码成功，请重新登录！',
          registerSuccess:'注册用户成功，请点击登录！'
        };
  var 
    Intercept = function(param){
      this.opts = param;
      this._init();
  }
  S.augment(Intercept, {
    _init: function(){
      this._addEvtDispatcher();
    },
    _addEvtDispatcher: function(){
      var
         that = this;
      delegate(el.navHolder, 'click', 'a', that._interceptHandler, that);
    },
    _interceptHandler: function(e){
      var
         that = this,
         target = e.target,
         islogin = DOM.val(el.isloginEl);
      if((!islogin || islogin == '0') && !DOM.hasClass(target, A_CLASS_ATTR)){
          that._loginHandler();
          return false;
      }
    },
     /**
       * 登录操作，弹出对话框登录
       * @return {[type]} [description]
       */
      _loginHandler: function(){
        var
            that = this,
            url = that.opts.loginUrl;
        PW.page.Util.dialog.manage(url,507, 310,function(data){
            //登录时返回code为0是表示登录成功
            if(data.code == 0){
                //重新刷新页面
                document.location.reload();
            //返回code为1是表示忘记密码重置密码
            }else if(data.code == 1){
                that._openForgetPwd();
              //返回code为2是标识立即注册新用户
            }else if(data.code == 2){
                that._registerHandler();
            }
        });
      },
      /**
       * 打开忘记密码对话框
       * @return {[type]} [description]
       */
      _openForgetPwd: function(){
        var
            that = this,
            url = that.opts.forgetPwdUrl;
        PW.page.Util.dialog.manage(url,355, 344,function(data){
            //返回code为0是表示重置密码成功
            if(data.code == 0){
              window.location.href = that.otps.returnIndexUrl;
            }
        });
      },
      /**
       * 打开注册对话框
       * @return {[type]} [description]
       */
      _registerHandler: function(){
          var
              that = this,
              url = that.opts.registerUrl;
          PW.page.Util.dialog.manage(url,500, 540,function(data){
                    //注册成功并提示信息
                if(data.code == 0){
                    PW.page.Util.dialog.alert('<h1>'+TIP.registerSuccess+'</h1>',null,{
                      topLayer: 1
                    });
                    //关闭注册弹出层，开启登录弹出层 
                }else if(data.code == 1){
                  that._loginHandler();
                }
          });
      }
  });
  return Intercept;
},{
  requires: ['core', 'page/common/util']
});