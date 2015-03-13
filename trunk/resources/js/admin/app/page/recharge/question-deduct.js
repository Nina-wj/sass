/*-----------------------------------------------------------------------------
* @Description:     按题扣豆页面
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.9.29
* ==NOTES:=============================================
* v1.0.0(2013.9.29):
*     初始生成，按题扣豆页面
* ---------------------------------------------------------------------------*/
KISSY.add('page/recharge/question-deduct',function(S,RechargeIO){
	var DOM = S.DOM, 
		ModBalance = PW.page.Common.ModBalance;
	var questionDeduct = function(){
		this._init();
	};
	S.augment(questionDeduct, {
		_init:function(){
			//修改送豆数量公共操作
			ModBalance(RechargeIO.balanceByQuestion);
		}
	});
	PW.namespace('page.Recharge.questionDeduct');
    PW.page.Recharge.questionDeduct = function(){
        return new questionDeduct();
    }
},{
	requires:['io/recharge','core','page/common/mod-balance']
});