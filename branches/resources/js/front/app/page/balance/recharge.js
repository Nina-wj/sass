
/*-----------------------------------------------------------------------------
* @Description:     前台充值管理页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.01.14
* ==NOTES:=============================================
* v1.0.0(2014.01.14):
*     前台充值管理页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/balance/recharge',function(S,Recharge){
	PW.namespace('page.Balance.Recharge');
	PW.page.Balance.Recharge = function(param){
		return new Recharge(param);
	}
},{
	requires:['balance/recharge']
});

KISSY.add('balance/recharge', function(S,BalanceIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    	el={
    		//需要验证的表单
    		form:'form',
            //充值钱数
            recharge:'.J_rechargeMoney',
            //获得豆数
            getBalance:'.J_getbalance',
            //提交按钮
            submitBtn:'.J_submit'
    	},
       TIP={
            checkTeacher:'请检查输入',
			rechargSuccess:'充值成功'
       },
       //激活提交按钮
       ABLE_BTN_CLASS='btn-blue',
       //禁用提交按钮
       DISABLED_BTN_CLASS='btn-gray';

    var Recharge = function(param){
		this.opts = param;
    	this._validForm;
    	this._init();
    }
    S.augment(Recharge,{
    	_init:function(){
    		this._validForm = PW.mod.Defender('form',{theme:'inline', showTip:false});
    		this._addEventHandler();
    	},
    	_addEventHandler:function(){
    		var 
    			that = this;
    		on(el.form,'submit',that._submitHandler,that);
    		on(el.recharge,'keyup',that._rechargeHandler, that);
    	},
    	/**
    	 * 表单提交验证用户信息
    	 * @return {[type]} [description]
    	 */
    	_submitHandler:function(evt){
    		var 
    			that = this,
    			money = DOM.val(el.recharge);
    		BalanceIO.balanceRecharge({money: money},function(code,errMsg){
                if(code){
                    PW.page.Util.dialog.alert('<h1>'+TIP.rechargSuccess+'</h1>',function(){
						window.location.href = that.opts.rechargeSuccessUrl;
					});
                }else{
                	PW.page.Util.dialog.alert(TIP.errMsg);
                }
                return false;
            });
			return false;
    	},
    	/**
         * 修改兑换月数操作
         * @param {[type]} evt [description]
         */
    	_rechargeHandler:function(evt){
    		var
    			that = this,
                recharge = DOM.val(el.recharge);
            if(that._validForm.getItemResult(el.recharge)){
                 BalanceIO.getTotalBalance({money:recharge},function(code, data, errMsg){
                    if(code){
                        DOM.html(el.getBalance,data.balance);
                        that._ableSubmit();
                    }else{
                        that._disableSubmit();
                    }
                });
            }else{
                DOM.html(el.getBalance,'0');
                DOM.val(el.recharge,'');
                that._disableSubmit();
            }
    	},
        /**
         * 禁止提交操作
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _disableSubmit:function(evt){
            var
                that = this;
            //禁掉提交按钮    
            DOM.attr(el.submitBtn,'disabled','disabled');
            //添加禁掉按钮样式
            DOM.replaceClass(el.submitBtn, ABLE_BTN_CLASS, DISABLED_BTN_CLASS);
        },
        /**
         * 开启提交操作
         * @return {[type]}     [description]
         */
        _ableSubmit:function(){
            var
                that = this;
            //显示提交按钮    
            DOM.removeAttr (el.submitBtn,'disabled');
            //添加禁掉按钮样式
            DOM.replaceClass(el.submitBtn, DISABLED_BTN_CLASS, ABLE_BTN_CLASS);   
        }
    });
    return Recharge;
},{
	requires:['io/balance','core','mod/defender','mod/dialog','page/common/util']
})