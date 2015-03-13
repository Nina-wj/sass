/*-----------------------------------------------------------------------------
* @Description:     所有登陆页中的表单验证
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*    表单验证
* --------------------------------------------------------------------------*/
KISSY.add('page/login/loginValid',function(S,loginValid){
	PW.namespace('page.Login.loginValid')
	PW.page.Login.loginValid= function(){
		return new loginValid ();
	}
},{
	requires:['login/loginValid']
});
KISSY.add('login/loginValid', function(S,LoginIO){
	var 
        DOM = S.DOM, get = DOM.get,IO = S.Event.IO,
        on = S.Event.on,Dialog=PW.Dialog,Cookie = S.Cookie,
        el={
            //提交按钮
            form:'form',
            //错误提示信息
            errTip:'.errtip',
            //提交按钮
            submitBtn:'button',
            //自动登录
            autoLogin:'.login-radio',
            //密码
            passWord:'.J_password',
            //用户名
            userName:'.J_username'

    	};
    var loginValid = function(){
    	this._init();
    	//表单验证结果的变量
    	this._validF; 
    }
    S.augment(loginValid,{
        _init:function(){
            this._initPage();
            this._addEventHandler();
        },
        /**
         * 页面加载成功后，可以提交表单
         * @return {[type]} [description]
         */
        _initPage:function(){
            var
                that = this,
                userName = Cookie.get('servantUserName'),
                passWord = Cookie.get('servantPassWord');
            if(userName || passWord){
                DOM.attr(el.autoLogin,'checked','checked');
                DOM.val(el.userName,userName);
                DOM.val(el.passWord,passWord);
            }
            DOM.replaceClass(el.submitBtn,'btn-pray','btn-blue');
            DOM.removeAttr(el.submitBtn,'disabled');
        },
        _addEventHandler:function(){
        	var
    			that = this;
    		this._validF = PW.mod.Defender('form',{theme:'inline',showTip:false});
    		on(el.form,'submit',that._submitHandler,that);
            //点击忘记密码
            on('.J_forgetpwd', 'click', function(){
                        Dialog.setData({code:1});
                        Dialog.closeThis();
            });
            //点击立即注册
            on('.J_register', 'click', function(){
                Dialog.setData({code:2});
                Dialog.closeThis();
            });
        },
        /**
         * 判断表单验证是否成功，成功后提交表单
         * @return {[type]} [description]
         */
        _submitHandler:function(){
        	var that=this;
			that._validF.validAll();
            that._validF.getValidResult(function(validRs){
                if(!validRs){
                    return false;
                }else{
                    var       
                        f = DOM.get(el.form),
                        data = DOM.serialize(f),
                        autoLoginEl = DOM.get(el.autoLogin),
                        userName = DOM.val(el.userName),
                        passWord = DOM.val(el.passWord);
                    LoginIO.loginFormValid(data,function(code,data,errMsg){
                        if(code == true){
                            if(autoLoginEl.checked){
                                Cookie.set('servantUserName',userName);
                                Cookie.set('servantPassWord',passWord);
                            }
                           DOM.hide(el.errTip);
                           Dialog.setData({code:0});
                           Dialog.closeThis();
                        }else{
                            DOM.show(el.errTip);
                            DOM.html(el.errTip,errMsg);
                        }
                    });
                }
            });
            return false; 
        }
    });
    return loginValid;
},{
	requires:['io/login','core','mod/defender','mod/dialog']
})