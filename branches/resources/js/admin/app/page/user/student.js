/*-----------------------------------------------------------------------------
* @Description:     会员操作页面
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2014.01.03
* ==NOTES:=============================================
* v1.0.0(2013.9.29):
*     初始生成，会员操作页面
* ---------------------------------------------------------------------------*/
KISSY.add('page/user/student',function(S,UserIO){
	var DOM = S.DOM, 
		UserManage = PW.page.Common.UserManage;
	var Student= function(){
		this._init();
	};
	S.augment(Student, {
		_init:function(){
			//向common层传值，delIO，setStateIO, resetPwdIO一定要一样后面的是UserIO层传过来的属性
			UserManage({
				delIO:UserIO.delStudent,
				unLockStateIO: UserIO.unLockStuState,
				lockStateIO:UserIO.lockStuState,
				resetPwdIO:UserIO.resetStudentPwd
			});
		}
	});
	PW.namespace('page.User.Student');
    PW.page.User.Student = function(){
        return new Student();
    }
},{
	requires:['io/user','core','page/common/user-manage']
});