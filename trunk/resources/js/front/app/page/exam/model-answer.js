/*-----------------------------------------------------------------------------
* @Description:     前台模拟题答案页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.19
* ==NOTES:=============================================
* v1.0.0(2014.03.19):
*     前台模拟题答案页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/model-answer',function(S,modelAnswer){
	PW.namespace('page.modelAnswer');
	PW.page.modelAnswer = function(param){
		new modelAnswer(param);
	}
},{
	requires:['modelAnswer/manage']
});

KISSY.add('modelAnswer/manage',function(S,ExamIO){
	function modelAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(modelAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.modelGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.modelGetOneAnswer,
				//提交纠错
				submitError: ExamIO.modelSubmitError
			}
			PW.page.common.GroupAnswer(this.opts,this.ExamIO);
		}
	});

	return modelAnswer;
},{
	requires:['io/exam','core','page/common/group-answer']
});