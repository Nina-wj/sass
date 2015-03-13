/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.  19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/data-test',function(S,dataTest){
	PW.namespace('page.dataTest');
	PW.page.dataTest = function(param){
		new dataTest(param);
	}
},{
	requires:['dataTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('dataTest/manage',function(S,ExamIO){
	function dataTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(dataTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.validDataTestQuestion,
				//获取题目请求
				getOneQuestion: ExamIO.getDataTestOneQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.dataTestGetFinishQuestion
			}
			PW.page.common.SingleExamTest(this.opts,this.ExamIO);
		}
	});

	return dataTest;
},{
	requires:['io/exam','core','page/common/single-exam-test']
});