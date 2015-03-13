/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/knowledge-test',function(S,knowledgeTest){
	PW.namespace('page.knowledgeTest');
	PW.page.knowledgeTest = function(param){
		new knowledgeTest(param);
	}
},{
	requires:['knowledgeTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('knowledgeTest/manage',function(S,ExamIO){
	function knowledgeTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(knowledgeTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.validknlgTestQuestion,
				//获取题目请求
				getOneQuestion: ExamIO.knlgTestOneQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.knlgTestGetFinishQuestion
			}
			PW.page.common.SingleExamTest(this.opts,this.ExamIO);
		}
	});

	return knowledgeTest;
},{
	requires:['io/exam','core','page/common/single-exam-test']
});