/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/language-test',function(S,languageTest){
	PW.namespace('page.languageTest');
	PW.page.languageTest = function(param){
		new languageTest(param);
	}
},{
	requires:['languageTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('languageTest/manage',function(S,ExamIO){
	function languageTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(languageTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.validLanguageTestQuestion,
				//获取题目请求
				getOneQuestion: ExamIO.getLanguageTestOneQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.languageTestGetFinishQuestion
			}
			PW.page.common.SingleExamTest(this.opts,this.ExamIO);
		}
	});

	return languageTest;
},{
	requires:['io/exam','core','page/common/single-exam-test']
});