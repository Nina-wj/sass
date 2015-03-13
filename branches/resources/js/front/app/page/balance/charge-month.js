
/*-----------------------------------------------------------------------------
* @Description:     前台送豆管理页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.01.14
* ==NOTES:=============================================
* v1.0.0(2014.01.14):
*     前台送豆管理页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/balance/charge-month',function(S,ChargeMonth){
	PW.namespace('page.Balance.ChargeMonth');
	PW.page.Balance.ChargeMonth = function(){
		return new ChargeMonth();
	}
},{
	requires:['balance/chargeMonth']
});

KISSY.add('balance/chargeMonth', function(S,BalanceIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    	el={
    		//需要验证的表单
    		form:'form',
            //剩余豆数
            remainder:'.J_remaind',
            //每月扣豆数
            snap:'.J_snap',
            //扣豆月数
            month:'.J_month',
            //实付豆数
            pocket:'.J_pocket',
            //充豆提示
            balanceLess:'.J_balanceless',
            //提交按钮
            submitBtn:'.J_submit'
    	},
       TIP={
            checkTeacher:'请检查输入',
            successMsg:'充值成功！'
       },
       //激活提交按钮
       ABLE_BTN_CLASS='btn-blue',
       //禁用提交按钮
       DISABLED_BTN_CLASS='btn-gray',
       ABLE_BTN_BLUE_CLASS='exchange-blue-btn',
       DISABLED_BTN_GRAY_CLASS='exchange-gray-btn'

    var ChargeMonth = function(){
    	this._validForm;
    	this._init();
    }
    S.augment(ChargeMonth,{
    	_init:function(){
    		this._validForm = PW.mod.Defender('form',{theme:'inline',showTip:false});
    		this._addEventHandler();
    	},
    	_addEventHandler:function(){
    		var 
    			that = this;    		
    		on(el.month,'keyup',that._valuePocketHandler, that);
            on(el.form,'submit',that._submitHandler,that);
    	},
    	/**
         * 修改兑换月数操作
         * @param {[type]} evt [description]
         */
    	_valuePocketHandler:function(evt){
    		var
    			that = this,
                remaind = DOM.html(el.remainder),
                snap = DOM.html(el.snap),
                month = DOM.val(el.month),
                pocket = snap*month;
            if(this._validForm.getItemResult(el.month)){
                DOM.html(el.pocket,pocket);
                if(remaind < pocket){
                    that._showTip();
                    that._disableSubmit();
                }else{
                    that._hideTip();
                    that._ableSubmit();
                }
            }else{
                DOM.html(el.pocket,0);
                that._disableSubmit();
                that._hideTip();
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
            DOM.replaceClass(el.submitBtn, ABLE_BTN_BLUE_CLASS, DISABLED_BTN_GRAY_CLASS);
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
            DOM.replaceClass(el.submitBtn, DISABLED_BTN_GRAY_CLASS, ABLE_BTN_BLUE_CLASS);
        },
        /**
         * 显示提示信息
         * @return {[type]} [description]
         */
        _showTip:function(){
            //显示充值提示信息
            DOM.addClass(el.month,'error-tip');
            DOM.show(el.balanceLess);
        },
        /**
         * 隐藏提示信息
         * @return {[type]} [description]
         */
        _hideTip:function(){
            //隐藏充值提示信息
            DOM.removeClass(el.month,'error-tip');
            DOM.hide(el.balanceLess);
        },
        /**
         * 表单提交验证用户信息
         * @return {[type]} [description]
         */
        _submitHandler:function(evt){
            var 
                that = this,
                month = DOM.val(el.month),
                f = DOM.get(el.form);
            this._validForm.getValidResult(function(validRs){
               if(!validRs){
                    return false;
                }else{
                    BalanceIO.balanceChangeMonth({month:month},function(code, errMsg){
                        if(code == true){
                          PW.page.Util.dialog.alert('<h1>'+TIP.successMsg+'</h1>');
                        }else{
                            PW.page.Util.dialog.alert('<h1>'+errMsg+'</h1>');
                        }
                    });
                }
            });
           return false;
        }
    });
    return ChargeMonth;
},{
	requires:['io/balance','core','mod/defender','mod/dialog']
})