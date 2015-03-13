/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/language-test-answer',function(S,languageTestAnswer){
	PW.namespace('page.languageTestAnswer');
	PW.page.languageTestAnswer = function(param){
		new languageTestAnswer(param);
	}
},{
	requires:['languageTestAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('languageTestAnswer/manage',function(S, ExamIO){
	function languageTestAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(languageTestAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.languageGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.getLanguageTestOneAnswer,
				//提交纠错
				submitError: ExamIO.submitLanguageTestError
			}
			PW.page.common.SingleAnswer(this.opts,this.ExamIO);
		}
	});

	return languageTestAnswer;
},{
	requires:['io/exam','core','page/common/single-exam-answer']
});
