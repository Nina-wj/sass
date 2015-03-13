/*-----------------------------------------------------------------------------
* @Description:     前台综合测试答案页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.14
* ==NOTES:=============================================
* v1.0.0(2014.03.14):
*     前台综合测试答案页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/synthesize-answer',function(S,synAnswer){
	PW.namespace('page.synAnswer');
	PW.page.synAnswer = function(param){
		new synAnswer(param);
	}
},{
	requires:['synAnswer/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('synAnswer/manage',function(S,ExamIO){
	function synAnswer(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(synAnswer,{
		init:function(){
			this.ExamIO = {
				//获取某题目区间答题状况请求
				getAnswerIndexInfo: ExamIO.synthsizeGetAnswerIndexInfo,
				//获取题目答案信息请求
				getOneAnswer: ExamIO.synthesizeGetOneAnswer,
				//提交纠错
				submitError: ExamIO.synthesizeSubmitError
			}
			PW.page.common.GroupAnswer(this.opts,this.ExamIO);
		}
	});

	return synAnswer;
},{
	requires:['io/exam','core','page/common/group-answer']
});