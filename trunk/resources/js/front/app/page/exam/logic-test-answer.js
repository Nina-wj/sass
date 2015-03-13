/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/logic-test-answer',function(S,logicTestAnswer){
	PW.namespace('page.logicTestAnswer');
	PW.page.logicTestAnswer = function(param){
		new logicTestAnswer(param);
	}
},{
	requires:['logicTestAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('logicTestAnswer/manage',function(S, ExamIO){
	function logicTestAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(logicTestAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.logicGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.getLogicTestOneAnswer,
				//提交纠错
				submitError: ExamIO.submitLogicTestError
			}
			PW.page.common.SingleAnswer(this.opts,this.ExamIO);
		}
	});

	return logicTestAnswer;
},{
	requires:['io/exam','core','page/common/single-exam-answer']
});
