/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/logic-test',function(S,logicTest){
	PW.namespace('page.logicTest');
	PW.page.logicTest = function(param){
		new logicTest(param);
	}
},{
	requires:['logicTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('logicTest/manage',function(S,ExamIO){
	function logicTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(logicTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.validLogicTestQuestion,
				//获取题目请求
				getOneQuestion: ExamIO.getLogicTestOneQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.logicTestGetFinishQuestion
			}
			PW.page.common.SingleExamTest(this.opts,this.ExamIO);
		}
	});

	return logicTest;
},{
	requires:['io/exam','core','page/common/single-exam-test']
});