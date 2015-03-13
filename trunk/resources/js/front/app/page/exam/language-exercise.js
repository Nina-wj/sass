/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/language-exercise',function(S,languageExercise){
	PW.namespace('page.languageExercise');
	PW.page.languageExercise = function(param){
		new languageExercise(param);
	}
},{
	requires:['languageExercise/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('languageExercise/manage',function(S,ExamIO){
	function languageExercise(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(languageExercise,{
		init:function(){
			this.ExamIO = {
				validQuestion: ExamIO.validLanguageExercisQuestion,
				getOneQuestion: ExamIO.getLanguageExercisOneQuestion
			}
			PW.page.common.ExamTest(this.opts,this.ExamIO);
		}
	});

	return languageExercise;
},{
	requires:['io/exam','core','page/common/exam-test']
});