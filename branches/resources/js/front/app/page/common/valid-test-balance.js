/*-----------------------------------------------------------------------------
* @Description:     前台套题测试用户验豆页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台套题测试用户验豆页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/common/valid-test-balance', function(S, validBalance, index){
	PW.namespace('page.common.validTestBalance');
	PW.page.common.validBalance = function(param, IO){
		new validBalance(param, IO);
		new index();
	}
},{
	requires:['valid/manage','valid/index']
});
KISSY.add('valid/manage', function(S){
	var DOM = S.DOM, on = S.Event.on, $ = S.all,
		el={
			//提交按钮
			submitBtn: '.J_submit',
			//待提交的表单
			formEl: '.validform',
			//开始答题按钮holder
			footerHolder:'.dlg-footer',
			//套题id
			groupQuestionId:'.J_groupQuestionId'
		};
	var 
		validBalance = function(param, IO){
		this.ExamIO = IO;
		this.opts = param;
		this._init();
	}
	S.augment(validBalance,{
		_init: function(){
			this._abledSubmit();
			this._addEvtListener();
		},
		_addEvtListener: function(){
			var
				that = this;
			on(el.formEl, 'submit', that._validBalanceHandler, that);
		},
		_abledSubmit: function(){
			var
				that = this,
				submitBtn = DOM.query('button',el.footerHolder);
			DOM.removeAttr(submitBtn,'disabled');
		},
		/**
		 * 验证用户持有豆数是否满足做题要求
		 * @return {[type]} [description]
		 */
		_validBalanceHandler: function(evt){
			var
				that = this,
				f = DOM.get(el.formEl);
			that.ExamIO.validBalance({},function(code,errMsg){
				if(code){
					f.submit();
				}else{
					PW.page.Util.dialog.alert('<h1>'+errMsg+'</h1>',function(){
						//当用户持豆余额不足时跳转到充值页面
						window.location.href = that.opts.rechargeBalanceUrl;
					});
				}
			});
			return false;	
		}
	});
	return validBalance;
},{
	requires:['core','page/common/util']
});
/*********************将页面导航页面操作加入到页面****************************/
KISSY.add('valid/index',function(S){
	function index(){
		this._init();
	}
	S.augment(index,{
		_init: function(){
			PW.page.Index();
		}
	});
	return index;

},{
	requires: ['core','page/index']
});