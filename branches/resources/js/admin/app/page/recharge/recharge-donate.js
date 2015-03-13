/*-----------------------------------------------------------------------------
* @Description:     充值送豆页面
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.9.29
* ==NOTES:=============================================
* v1.0.0(2013.9.29):
*     初始生成，充值送豆页面
* ---------------------------------------------------------------------------*/
KISSY.add('page/recharge/recharge-donate',function(S,RechargeIO){
	var DOM = S.DOM, 
		ModBalance = PW.page.Common.ModBalance,
		el ={
			addForm:'.J_addbalanceform'
		};
	var rechargeDonate = function(){
		//充值金额和送豆数量表单验证
		this._addFormvalid;
		this._init();
	};
	S.augment(rechargeDonate, {
		_init:function(){
			//修改送豆数量公共操作
			ModBalance(RechargeIO.balanceByRecharge);
			this._addFormvalid = PW.mod.Defender(el.addForm,{theme:'inline'});
		}
	});
	PW.namespace('page.Recharge.rechargeDonate');
    PW.page.Recharge.rechargeDonate = function(){
        return new rechargeDonate();
    }
},{
	requires:['io/recharge','core','page/common/mod-balance','mod/defender']
});