/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/knowledge-exercise',function(S,knowledgeExercise){
	PW.namespace('page.knowledgeExercise');
	PW.page.knowledgeExercise = function(param){
		new knowledgeExercise(param);
	}
},{
	requires:['knowledgeExercise/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('knowledgeExercise/manage',function(S,ExamIO){
	function knowledgeExercise(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(knowledgeExercise,{
		init:function(){
			this.ExamIO = {
				validQuestion: ExamIO.validKnowledgeExercisQuestion,
				getOneQuestion: ExamIO.getKnowledgeExercisOneQuestion
			}
			PW.page.common.ExamTest(this.opts,this.ExamIO);
		}
	});

	return knowledgeExercise;
},{
	requires:['io/exam','core','page/common/exam-test']
});