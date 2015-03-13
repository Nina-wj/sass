/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/knowledge-test-answer',function(S,knowledgeTestAnswer){
	PW.namespace('page.knowledgeTestAnswer');
	PW.page.knowledgeTestAnswer = function(param){
		new knowledgeTestAnswer(param);
	}
},{
	requires:['knowledgeTestAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('knowledgeTestAnswer/manage',function(S, ExamIO){
	function knowledgeTestAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(knowledgeTestAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.knlgGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.knlgTestGetOneAnswer,
				//提交纠错
				submitError: ExamIO.submitKnlgTestError
			};
			PW.page.common.SingleAnswer(this.opts,this.ExamIO);
		}
	});

	return knowledgeTestAnswer;
},{
	requires:['io/exam','core','page/common/single-exam-answer']
});
