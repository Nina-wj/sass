/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/knowledge-exercise-answer',function(S,knowledgeExerciseAnswer){
	PW.namespace('page.knowledgeExerciseAnswer');
	PW.page.knowledgeExerciseAnswer = function(param){
		new knowledgeExerciseAnswer(param);
	}
},{
	requires:['knowledgeExerciseAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('knowledgeExerciseAnswer/manage',function(S, ExamIO){
	function knowledgeExerciseAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(knowledgeExerciseAnswer,{
		init:function(){
			this.ExamIO = {
				getOneAnswer: ExamIO.getKnowledgeExercisOneAnswer,
				submitError: ExamIO.submitKnowledgeExercisError
			}
			PW.page.common.ExamAnswer(this.opts,this.ExamIO);
		}
	});

	return knowledgeExerciseAnswer;
},{
	requires:['io/exam','core','page/common/exam-answer']
});
