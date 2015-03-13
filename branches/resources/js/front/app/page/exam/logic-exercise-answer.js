/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/logic-exercise-answer',function(S,logicExerciseAnswer){
	PW.namespace('page.logicExerciseAnswer');
	PW.page.logicExerciseAnswer = function(param){
		new logicExerciseAnswer(param);
	}
},{
	requires:['logicExerciseAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('logicExerciseAnswer/manage',function(S, ExamIO){
	function logicExerciseAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(logicExerciseAnswer,{
		init:function(){
			this.ExamIO = {
				getOneAnswer: ExamIO.getLogicExercisOneAnswer,
				submitError: ExamIO.submitLogicExercisError
			}
			PW.page.common.ExamAnswer(this.opts,this.ExamIO);
		}
	});

	return logicExerciseAnswer;
},{
	requires:['io/exam','core','page/common/exam-answer']
});
