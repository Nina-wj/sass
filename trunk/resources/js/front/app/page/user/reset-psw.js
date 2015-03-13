
/*-----------------------------------------------------------------------------
* @Description:     修改用户密码
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     修改用户密码
* --------------------------------------------------------------------------*/
KISSY.add('page/user/reset-psw',function(S,ResetPsw){
	PW.namespace('page.User.ResetPsw')
	PW.page.User.ResetPsw = function(param){
		return new ResetPsw(param);
	}
},{
	requires:['user/reset-psw']
});
KISSY.add('user/reset-psw', function(S,UserIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,
    	el={
            //需要验证的表单
            form:'form'
    	},
        TIP={
            repswsuccess:'修改密码成功'
        };
    var ResetPsw = function(param){
        this.opts = param;
    	this._init();
    }
    S.augment(ResetPsw,{
    	_init:function(){
    		this._validForm = PW.mod.Defender(el.form,{theme:'inline'});
    		this._addEvtHandler();
    	},
        _addEvtHandler:function(){
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
                    return false;
                }else{
                    var 
                        f = DOM.get(el.form),
                        data = DOM.serialize(f);
                    UserIO.resetUserPwd(data,function(code, errMsg){
                        if(code == true){
                           PW.page.Util.dialog.alert('<h1>'+TIP.repswsuccess+'</h1>');
                        }else{
                            PW.page.Util.dialog.alert('<h1>'+errMsg+'</h1>');
                        }
                    });
                }
            });
           return false;
    	}
    });
    return ResetPsw;
},{
	requires:['io/user','core','mod/defender','mod/dialog','page/common/util']
})