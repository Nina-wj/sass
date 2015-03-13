/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/data-exercise-answer',function(S,dataExerciseAnswer){
	PW.namespace('page.dataExerciseAnswer');
	PW.page.dataExerciseAnswer = function(param){
		new dataExerciseAnswer(param);
	}
},{
	requires:['dataExerciseAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('dataExerciseAnswer/manage',function(S, ExamIO){
	function dataExerciseAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(dataExerciseAnswer,{
		init:function(){
			this.ExamIO = {
				getOneAnswer: ExamIO.getDataExercisOneAnswer,
				submitError: ExamIO.submitDataExercisError
			}
			PW.page.common.ExamAnswer(this.opts,this.ExamIO);
		}
	});

	return dataExerciseAnswer;
},{
	requires:['io/exam','core','page/common/exam-answer']
});
