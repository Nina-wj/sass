/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.  19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/data-test-answer',function(S,dataTestAnswer){
	PW.namespace('page.dataTestAnswer');
	PW.page.dataTestAnswer = function(param){
		new dataTestAnswer(param);
	}
},{
	requires:['dataTestAnswer/manage']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('dataTestAnswer/manage',function(S, ExamIO){
	function dataTestAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(dataTestAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.dataGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.getDataTestOneAnswer,
				//提交纠错
				submitError: ExamIO.submitDataTestError
			}
			PW.page.common.SingleAnswer(this.opts,this.ExamIO);
		}
	});

	return dataTestAnswer;
},{
	requires:['io/exam','core','page/common/single-exam-answer']
});
