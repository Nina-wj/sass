/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/math-test-answer',function(S,mathTestAnswer){
	PW.namespace('page.mathTestAnswer');
	PW.page.mathTestAnswer = function(param){
		new mathTestAnswer(param);
	}
},{
	requires:['mathTestAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('mathTestAnswer/manage',function(S, ExamIO){
	function mathTestAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(mathTestAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.mathGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.getMathTestOneAnswer,
				//提交纠错
				submitError: ExamIO.submitMathTestError
			}
			PW.page.common.SingleAnswer(this.opts,this.ExamIO);
		}
	});

	return mathTestAnswer;
},{
	requires:['io/exam','core','page/common/single-exam-answer']
});
