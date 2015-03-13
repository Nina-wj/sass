/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/math-exercise',function(S,mathExercise){
	PW.namespace('page.mathExercise');
	PW.page.mathExercise = function(param){
		new mathExercise(param);
	}
},{
	requires:['mathExercise/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('mathExercise/manage',function(S,ExamIO){
	function mathExercise(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(mathExercise,{
		init:function(){
			this.ExamIO = {
				validQuestion: ExamIO.validMathExercisQuestion,
				getOneQuestion: ExamIO.getMathExercisOneQuestion
			}
			PW.page.common.ExamTest(this.opts,this.ExamIO);
		}
	});

	return mathExercise;
},{
	requires:['io/exam','core','page/common/exam-test']
});