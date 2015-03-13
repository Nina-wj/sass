/*-----------------------------------------------------------------------------
* @Description:     推荐人送豆页面
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.9.29
* ==NOTES:=============================================
* v1.0.0(2013.9.29):
*     初始生成，推荐人送豆页面
* ---------------------------------------------------------------------------*/
KISSY.add('page/recharge/referrer-donate',function(S,RechargeIO){
	var DOM = S.DOM, 
		ModBalance = PW.page.Common.ModBalance;
	var RefererDonate = function(){
		this._init();
	};
	S.augment(RefererDonate, {
		_init:function(){
			//修改送豆数量公共操作
			ModBalance(RechargeIO.balanceByReferrer);
		}
	});
	PW.namespace('page.Recharge.RefererDonate');
    PW.page.Recharge.RefererDonate = function(){
        return new RefererDonate();
    }
},{
	requires:['io/recharge','core','page/common/mod-balance']
});