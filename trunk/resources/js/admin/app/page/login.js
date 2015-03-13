/*-----------------------------------------------------------------------------
* @Description:     登陆页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.13
* ==NOTES:=============================================
* v1.0.0(2013.12.13):
*     登陆页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/login',function(S,Login){
	PW.namespace('page.login');
	PW.page.login = function(){
		return new Login();
	}
},{
	requires:['login/manage']
});

KISSY.add('login/manage', function(S,LoginIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    	el={
    		//需要验证的表单
    		form:'form',
    		//提交按钮
    		submit:'#J_submitBtn',
    		//用户名
    		userName:'.J_username',
    		//密码
    		password:'.J_password',
            //错误提示信息
            errTip:'.error-tip'
    	};
    var Login = function(){
        if(window.top != window){
        window.top.location.reload();
        } 
    	this._validForm;
    	this._init();
    }
    S.augment(Login,{
    	_init:function(){
    		this._validForm = PW.mod.Defender(el.form,{theme:'inside',fieldErrorContainer: el.errTip});
    		this._addEventHandler();
    	},
    	_addEventHandler:function(){
    		var 
    			that = this;
    		on(el.form,'submit',that._submitHandler,that);
    	},
    	/**
    	 * 表单提交验证用户信息
    	 * @return {[type]} [description]
    	 */
    	_submitHandler:function(evt){
    		var 
    			that = this;
    		that._validForm.getValidResult(function(validRs){
                if(!validRs){
                    //PW.dialog.alert('请检查输入');
                    return false;
                }else{
                    //ajax验证用户信息
                    that._validUser(); 
                }
            });
           return false;
    	},
    	//后台交互验证用户名密码是否合理
    	_validUser:function(){
    		var
    			that = this,
    			userName = DOM.val(el.userName),
    			password = DOM.val(el.password);
    		LoginIO.getLogin({username:userName,password:password},function(rs,data){
    			if(rs == true){
                   var f = get(el.form);
                    f.submit();
    			}else{
    				PW.dialog.alert(data);
    			}
    		});
    	}
    });
    return Login;
},{
	requires:['io/login','core','mod/defender','mod/dialog']
})