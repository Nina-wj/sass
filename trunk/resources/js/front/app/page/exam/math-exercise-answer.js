/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/math-exercise-answer',function(S,mathExerciseAnswer){
	PW.namespace('page.mathExerciseAnswer');
	PW.page.mathExerciseAnswer = function(param){
		new mathExerciseAnswer(param);
	}
},{
	requires:['mathExerciseAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('mathExerciseAnswer/manage',function(S, ExamIO){
	function mathExerciseAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(mathExerciseAnswer,{
		init:function(){
			this.ExamIO = {
				getOneAnswer: ExamIO.getMathExercisOneAnswer,
				submitError: ExamIO.submitMathExercisError
			}
			PW.page.common.ExamAnswer(this.opts,this.ExamIO);
		}
	});

	return mathExerciseAnswer;
},{
	requires:['io/exam','core','page/common/exam-answer']
});
