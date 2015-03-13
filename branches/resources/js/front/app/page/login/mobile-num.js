
/*-----------------------------------------------------------------------------
* @Description:     验证注册时手机号码的合法性
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     验证注册时手机号码的合法性
* v1.0.1(2014.02.27):
*     by wangjing  添加点击立即登录操作
*     返回弹出层信息说明：
*     code = 0 注册成功
*     code = 1 立即登录
*     code = 3 手动关闭弹出层
* --------------------------------------------------------------------------*/
KISSY.add('page/login/mobile-num',function(S,MobileNum){
	PW.namespace('page.Login.MobileNum')
	PW.page.Login.MobileNum= function(){
		return new MobileNum();
	}
},{
	requires:['login/mobile-num']
});
KISSY.add('login/mobile-num', function(S,LoginIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,Dialog = PW.Dialog,
    	el={
            //需要验证的手机号
            mobile:'.mobile',
            //需要验证的表单
            form:'form',
            //提交按钮
            submit:'#J_submitBtn',
            //立即登录按钮
            loginHandler: '.J_login',
            //获取验证码
            verfyCodeTrigger: '#activate'
    	},
        TIP = {
            sendCodeMsg: '验证码已发送,请查看手机'
        };
    var MobileNum = function(){
    	this._init();
    }
    S.augment(MobileNum,{
        _init:function(){
            this._validForm();
            this._addEventHandler();
        },
        /**
         * 验证手机号码
         * @return {[type]} [description]
         */
        _validForm:function(){
            this._validForm = PW.mod.Defender(el.form,
                {theme:'inline',
                items:[{
                        queryName:el.mobile,
                        pattern: function(input,shell,form){
                            var
                               Num = DOM.val(input);
                            if(this.test('isMobile',Num)){
                                LoginIO.verifyMobile({phoneNum:Num},function(rs){
                                if(rs == true){
                                    shell.updateState('success');
                                    DOM.show('#activate');
                                }else{
                                    shell.updateState('error');
                                    }
                                }); 
                            }else{
                                return false;
                            }
                            return 'loading';
                        },
                        tip:'请输入正确的手机号码|手机号码填写错误',
                        showEvent:'focus',
                        async: true,
                        vldEvent:'keyup'
                        }]
                }
            );
        },
        _addEventHandler:function(){
            var 
                that = this;
            on(el.form,'submit',that._submitHandler,that); 
            //点击立即登录按钮,返回code为1关闭弹出层开启登录弹出层
            on('.J_login', 'click', function(){
                PW.Dialog.setData({code:1});
                PW.Dialog.closeThis();
            });  
            on(el.verfyCodeTrigger, 'click', that._getVerfyCodeHandler, that);
        },
        /**
         * 判断表单验证是否成功，成功后提交表单
         * @return {[type]} [description]
         */
        _submitHandler:function(){
            var 
                that=this;
            that._validForm.validAll();
            that._validForm.getValidResult(function(validRs){
                if(!validRs){
                    return false;
                }else{
                    var  
                        that = this,     
                        f = DOM.get(el.form),
                        data = DOM.serialize(f);
                    LoginIO.submitStudent(data,function(code,data,errMsg){
                        if(code == true){
                           Dialog.setData({code:0});
                           Dialog.closeThis();
                        }
                        else{
                             PW.dialog.alert(errMsg);
                            }
                    });
                }
            });
            return false; 
        },
        /**
         * 获取验证码
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _getVerfyCodeHandler: function(e){
            var
                that = this,
                mobile = DOM.val(el.mobile);
            LoginIO.getVerifyCode({mobilePhone: mobile}, function(code, errMsg){
                if(code){
                    PW.page.Util.dialog.alert('<h1>'+TIP.sendCodeMsg+'</h1>',null,{
                      topLayer: 1
                    });
                }
            });
        }
    });
    return MobileNum;
},{
	requires:['io/login','core','mod/defender','mod/dialog','page/common/util']
})