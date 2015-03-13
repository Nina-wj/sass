/*-----------------------------------------------------------------------------
* @Description:     首页页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.04.24
* ==NOTES:=============================================
* v1.0.0(2014.04.24):
*     首页页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/index-page',function(S,Index, Intercept){
    PW.namespace('page.IndexHandler');
    PW.page.IndexHandler = function(param){
        new Index();
        new Intercept(param);
    }
},{
    requires:['index/nav','index/intercept']
});
/***************************{页面导航}**********************/
KISSY.add('index/nav', function(S){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,
        el={
            crumb:'.crumb',
            liBg:'.libg'
        };
    var Index = function(){
        this._init();
    }
    S.augment(Index,{
        _init:function(){
            this._showNav();
            this._addEventHandler();
        },
        /**
         * 显示nav
         * @return {[type]} [description]
         */
        _showNav:function(){
            var 
                that = this,
                subNav = DOM.get('.sub-nav'),
                newSubNav = DOM.clone(subNav,true,true,true);
            DOM.prepend(newSubNav,'.crumb');
            DOM.show(newSubNav);
        },
        _addEventHandler:function(){
            var 
                that = this,
                mainNavA = DOM.query('a','.main-nav');
            on(mainNavA,'click',that._showSubNavHandler,that);          
        },
        /**
         *   一级菜单的显示样式
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _showSubNavHandler:function(evt){
            var 
                that = this,
                target = evt.target,
                li = DOM.parent(target,'li'),
                ul = DOM.query('ul',el.crumb),
                div = DOM.query('div',el.crumb),
                mainName=DOM.attr(li,'class'),
                subName='.sub-'+mainName,
                top = DOM.height(target)-9,
                left = DOM.width(target)/2-9,
                top = $(li).offset().top+top,
                left = $(li).offset().left+left,
                otherLi = DOM.siblings(li),
                otherA = DOM.query('a',otherLi),
                subNavLi = DOM.query('li',subName),
                subNavA = DOM.query('a',subNavLi);
            DOM.removeAttr(otherA,'style');
            DOM.show(el.liBg);
            $(el.liBg).offset({top:top,left:left});
            DOM.css(target,{backgroundColor:'#000'});
            DOM.hide(div);
            DOM.hide(ul);
            DOM.show(subName);
            on(subNavA,'mouseenter',that._hoverSubNavLi,that);
        },
        /**
         * 二级菜单的hover样式
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _hoverSubNavLi:function(evt){
            var 
                target = evt.target,
                li = DOM.parent(target,'li'),
                otherLi = DOM.siblings(li,'li'),
                otherA = DOM.query('a',otherLi),
                ul = DOM.parent(li,'ul'),
                otherUl = DOM.siblings(ul,'ul'),
                otherUlLi = DOM.query('li',otherUl),
                otherUlA = DOM.query('a',otherUlLi);
            DOM.removeClass(otherUlLi,'sub-li-bg');
            DOM.removeClass(otherUlA,'sub-a-bg');
            DOM.removeClass(otherLi,'sub-li-bg');
            DOM.removeClass(otherA,'sub-a-bg');
            DOM.addClass(target,'sub-a-bg');
            DOM.addClass(li,'sub-li-bg');
        }       
    });
    return Index;
},{
    requires:['core']
});
/****************************{页面拦截}**********************/
KISSY.add('index/intercept', function(S){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,
        el = {
            //承载导航模块
            crumb: '.crumb',
            //学前测试按钮
            preTest:'.J_preTest',
            //登录标记
            isLogin:'.J_islogin'
        },
        PRECLASS_NAME = 'J_preTest'
    var Intercept = function(param){
        this.opts = param;
        this._init();
    }
    S.augment(Intercept, {
        _init: function(){
            this._addEventHandler();
        },
        _addEventHandler: function(){
            var 
                that = this,
                uls = DOM.children(el.crumb,'ul'),
                a;
            on(uls,'click',function(e){
                return that._navHandler(e);
            });
        },
        _navHandler: function(e){
            var
                that = this,
                target = e.target,
                isLogin = DOM.val(el.isLogin);
            if(!DOM.hasClass(PRECLASS_NAME) && (isLogin=='0'||isLogin=='')){
                that._showLogin(e);
                return false;
            }
        },
        /**
         * 弹出登录按钮
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _showLogin: function(e){
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
                // PW.page.Util.dialog.alert('<h1>'+TIP.modPwdSuccess+'</h1>');
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
                    PW.page.Util.dialog.alert('<h1>'+TIP.registerSuccess+'</h1>');
                    //关闭注册弹出层，开启登录弹出层 
                }else if(data.code == 1){
                  that._loginHandler();
                }
          });
      },
    });
    return Intercept;
},{
    requires:['core']
});