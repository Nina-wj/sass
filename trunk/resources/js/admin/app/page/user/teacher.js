/*-----------------------------------------------------------------------------
* @Description:     教师操作页面
* @Version:         1.0.0
* @author:          wangjing (1284663246@qq.com)
* @date             2014.01.03
* ==NOTES:=============================================
* v1.0.0(2013.9.29):
*     初始生成，教师操作页面
* ---------------------------------------------------------------------------*/
KISSY.add('page/user/teacher',function(S,UserIO){
	var DOM = S.DOM, 
		UserManage = PW.page.Common.UserManage;
	var Teacher = function(){
		this._init();
	};
	S.augment(Teacher, {
		_init:function(){
			//向common层传值，delIO，setStateIO, resetPwdIO一定要一样后面的是UserIO层传过来的属性
			UserManage({
				delIO:UserIO.delTeacher,
				unLockStateIO:UserIO.unLockTeacherState,
				lockStateIO:UserIO.lockTeacherState,
				resetPwdIO:UserIO.resetTeacherPwd
			});
		}
	});
	PW.namespace('page.User.Teacher');
    PW.page.User.Teacher = function(){
        return new Teacher();
    }
},{
	requires:['io/user','core','page/common/user-manage']
});