/*-----------------------------------------------------------------------------
* @Description:     前台历年真题答案页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.19
* ==NOTES:=============================================
* v1.0.0(2014.03.19):
*     前台历年真题答案页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/real-answer',function(S,realAnswer){
	PW.namespace('page.realAnswer');
	PW.page.realAnswer = function(param){
		new realAnswer(param);
	}
},{
	requires:['realAnswer/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('realAnswer/manage',function(S,ExamIO){
	function realAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(realAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.realGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.realGetOneAnswer,
				//提交纠错
				submitError: ExamIO.realSubmitError
			}
			PW.page.common.GroupAnswer(this.opts,this.ExamIO);
		}
	});

	return realAnswer;
},{
	requires:['io/exam','core','page/common/group-answer']
});