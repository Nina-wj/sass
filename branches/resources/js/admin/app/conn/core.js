/*-----------------------------------------------------------------------------
* @Description:     此为公务员后台测试版本
* @Version:         1.0.1
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.13
* ==NOTES:=============================================
* v1.0.0(2013.12.13):
* 		页面初始生成
* ---------------------------------------------------------------------------*/
KISSY.add(function(S){
	var
		//定义api数据
		apiData = {
			//首页外壳模块
			login: [
				['loginManage', 'admin/login/validateUsernameAndPassword', 'post', '登陆页面'],
				['welcome','admin/index/mainMenuJson','get','页面列表','正在获取信息']
			],
			//题库管理模块
			question:[
				['modQuestionName','admin/question/groupQuestionManager/&{ZhenTiOrMoNiId}/toUpdateGroupQuestion/&{groupQuestionId}','get','修改套题名称'],
				['delQuestionName','admin/question/groupQuestionManager/&{ZhenTiOrMoNiId}/deleteGroupQuestion/&{groupQuestionId}','get','删除套题名称'],
				['recoverAbandonName','admin/storage/abandonQuestion/recover','post','恢复废弃题目'],
				['delAbandonName','admin/storage/abandonQuestion/delete','post','删除废弃题目'],
				['showCorrectionQuestion','admin/storage/correctionQuestion/showCorrectionQuestion','get','显示废弃题信息'],
				['getAbandonQuestionPagination','admin/storage/abandonQuestion/showAllAbandonQuestion','get','分页显示废弃题目'],
				['rejectQuestion','admin/storage/correctionQuestion/reject','post','填写纠错题目废弃原因'],
				['modCurrentInfo','admin/storage/correctionQuestion/update','post','修改纠错题目信息'],
				['QuestionTypeTree','admin/questionType/showQuestionType','post','题库管理题型树'],
				['addQuestionType','admin/questionType/addQuestionType','post','增加题型树题型'],
				['modQuestionType','admin/questionType/renameQuestionType','post','修改题型树题型'],
				['delQuestionType','admin/questionType/deleteQuestionType','post','删除题型树题型'],
				['discardQuestion','admin/storage/normalQuestion/abandon','post','废弃正常题目'],
				['getNormalQuestionTree','admin/storage/normalQuestion/showQuestionType','post','获取正常题目题型树'],
				['resetPagination','admin/storage/normalQuestion/search','get','根据搜索条件获取正常题目'],
				['getNormalPagnation','admin/storage/normalQuestion/findQuestion','get','获取正常题目分页'],
				['updataNormalPagination','admin/storage/normalQuestion/findQuestion','get','点击题目树更新题目分页'],
				['batchNormalQuestion','admin/storage/normalQuestion/uploadExcel','post','题库批量导入试题']
			],
			class:[
				['addClassType','admin/banJi/banJiType/addBanJiType','get','添加班级类型'],
				['modClassType','admin/banJi/banJiType/modifyName','post','修改班级类型'],
				['delClassType','admin/banJi/banJiType/deleteBanJiType/&{banJiTypeId}','get','删除班级类型'],
				['searchTeacher','admin/banJi/banJi/teacherIsExist','post','搜索老师名称'],
				['submitClass','admin/banJi/banJi/submitAddBanJi','post','提交添加班级信息'],
				['getPagnition','admin/banJi/banJi','get','班级管理分页'],
				['showClassInfo','admin/banJi/banJi/displayTeacherScope/&{banJiId}','get','查看教师评分'],
				['delClassInfo','admin/banJi/banJi/deleteBanJi/&{banJiId}','get','删除班级'],
				['modClassInfo','admin/banJi/banJi/submitModifyBanJi','post','修改班级信息']
			],
			recharge:[
				['balanceByQuestion','admin/balance/oneQuestionBalance/submitOneQuestionBalance','post','修改每题扣豆数'],
				['balanceByReferrer','admin/balance/giveBalanceAndSourceId/recommendation/submitClass','post','修改推荐人送豆数'],
				['balanceByRecharge','admin/balance/reChargeForBalance/submitReChargeForBalance','post','修改充值送豆数'],
				['balanceByApply','admin/balance/banJiTypeBalance/submitBanJiTypeBalance','post','报班学员送豆数']
			],
			uesr:[
				['delTeacher','admin/user/deleteTeacher/&{teacherId}','get','删除教师'],
				['unLockTeacherState','admin/user/thawTeacher/&{teacherId}','get','教师状态修改为解冻'],
				['lockTeacherState','admin/user/addTeacherToBlackList/&{teacherId}','get', '冻结教师状态'],
				['resetTeacherPwd','admin/user/resetTeacherPassword/&{teacherId}/&{newPassword}','get','重置教师密码'],
				['delStudent','admin/user/deleteStudent/&{studentId}','get','删除会员'],
				['unLockStuState','admin/user/thawStudent/&{studentId}','get','会员状态修改为解冻'],
				['lockStuState', 'admin/user/addStudentToBlackList/&{studentId}','get','会员状态修改为冻结'],
				['resetStudentPwd','admin/user/resetStudentPassword/&{studentId}/&{newPassword}','get','重置会员密码'],
				['delAdmin','admin/user/deleteAdmin/&{adminId}','get','删除管理员'],
				['unLockAdminState','admin/user/thawAdmin/&{adminId}','get','解冻管理员状态'],
				['lockAdminState','admin/user/addAdminToBlackList/&{adminId}','get','冻结管理员状态'],
				['resetAdminPwd','admin/user/resetAdminPassword/&{adminId}/&{newPassword}','get','重置管理员密码']
			]
		};
	PW.conn = PW.mod.Connector(apiData);
},{
	requires:[
		'mod/connector'
	]
})

