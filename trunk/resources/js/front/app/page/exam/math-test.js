/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/math-test',function(S,mathTest){
	PW.namespace('page.mathTest');
	PW.page.mathTest = function(param){
		new mathTest(param);
	}
},{
	requires:['mathTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('mathTest/manage',function(S,ExamIO){
	function mathTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(mathTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.validMathTestQuestion,
				//获取题目请求
				getOneQuestion: ExamIO.getMathTestOneQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.mathTestGetFinishQuestion
			}
			PW.page.common.SingleExamTest(this.opts,this.ExamIO);
		}
	});

	return mathTest;
},{
	requires:['io/exam','core','page/common/single-exam-test']
});