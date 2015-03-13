/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/logic-exercise',function(S,logicExercise){
	PW.namespace('page.logicExercise');
	PW.page.logicExercise = function(param){
		new logicExercise(param);
	}
},{
	requires:['logicExercise/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('logicExercise/manage',function(S,ExamIO){
	function logicExercise(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(logicExercise,{
		init:function(){
			this.ExamIO = {
				validQuestion: ExamIO.validLogicExercisQuestion,
				getOneQuestion: ExamIO.getLogicExercisOneQuestion
			}
			PW.page.common.ExamTest(this.opts,this.ExamIO);
		}
	});

	return logicExercise;
},{
	requires:['io/exam','core','page/common/exam-test']
});