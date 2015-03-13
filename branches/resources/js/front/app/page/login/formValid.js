
/*-----------------------------------------------------------------------------
* @Description:     所有登陆页中的表单验证
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*    表单验证
* --------------------------------------------------------------------------*/
KISSY.add('page/login/formValid',function(S,formValid){
	PW.namespace('page.Login.formValid')
	PW.page.Login.formValid= function(param){
		return new formValid(param);
	}
},{
	requires:['login/formValid']
});
KISSY.add('login/formValid', function(S){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,
        el={
            //提交按钮
            form:'form'
    	},
    	TIP = {
            errMassage:'填写错误，请重新填写!'
        };
    var formValid = function(param){
    	this._init();
    	//表单验证结果的变量
    	this._validF; 
    }
    S.augment(formValid,{
        _init:function(){
            this._addEventHandler();
        },
        _addEventHandler:function(){
        	var
    			that = this;
    		this._validF = PW.mod.Defender('form',{theme:'inline'});
    		on(el.form,'submit',that._submitHandler,that);
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
                    //手动提交表单
                	var f=DOM.get('form');
                    f.submit();
                }
                return false;
            });
        }
    });

    return formValid;

},{
	requires:['core','mod/defender','mod/dialog']
})