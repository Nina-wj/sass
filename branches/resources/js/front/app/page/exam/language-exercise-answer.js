/*-----------------------------------------------------------------------------
* @Description:     前台言语理解获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台言语理解获取答案页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/language-exercise-answer',function(S,languageExerciseAnswer){
	PW.namespace('page.languageExerciseAnswer');
	PW.page.languageExerciseAnswer = function(param){
		new languageExerciseAnswer(param);
	}
},{
	requires:['languageExerciseAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('languageExerciseAnswer/manage',function(S, ExamIO){
	function languageExerciseAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(languageExerciseAnswer,{
		init:function(){
			this.ExamIO = {
				getOneAnswer: ExamIO.getLanguageExercisOneAnswer,
				submitError: ExamIO.submitLanguageExercisError
			}
			PW.page.common.ExamAnswer(this.opts,this.ExamIO);
		}
	});

	return languageExerciseAnswer;
},{
	requires:['io/exam','core','page/common/exam-answer']
});
