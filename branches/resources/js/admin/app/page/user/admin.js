/*-----------------------------------------------------------------------------
* @Description:     管理员操作页面
* @Version:         1.0.0
* @author:          kt (1284663246@qq.com)
* @date             2014.01.03
* ==NOTES:=============================================
* v1.0.0(2013.9.29):
*     初始生成，管理员操作页面
* ---------------------------------------------------------------------------*/
KISSY.add('page/user/admin',function(S,UserIO){
	var DOM = S.DOM, 
		UserManage = PW.page.Common.UserManage;
	var Admin = function(){
		this._init();
	};
	S.augment(Admin, {
		_init:function(){
			//向common层传值，delIO，setStateIO, resetPwdIO一定要一样后面的是UserIO层传过来的属性
			UserManage({
				delIO:UserIO.delAdmin,
				unLockStateIO:UserIO.unLockAdminState,
				lockStateIO:UserIO.lockAdminState,
				resetPwdIO:UserIO.resetAdminPwd
			});
		}
	});
	PW.namespace('page.User.Admin');
    PW.page.User.Admin = function(){
        return new Admin();
    }
},{
	requires:['io/user','core','page/common/user-manage']
});