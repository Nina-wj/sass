/*-----------------------------------------------------------------------------
* @Description:     前台历年真题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.19
* ==NOTES:=============================================
* v1.0.0(2014.03.19):
*     前台历年真题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/real-test',function(S,realTest){
	PW.namespace('page.realTest');
	PW.page.realTest = function(param){
		new realTest(param);
	}
},{
	requires:['realTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('realTest/manage',function(S,ExamIO){
	function realTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(realTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.realValidSubmit,
				//获取题目请求
				getOneQuestion: ExamIO.realGetQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.realGetFinishQuestion,
				//保存最后一题请求
				saveLastQuestion: ExamIO.realSaveLastQuestion
			}
			PW.page.common.GroupTest(this.opts,this.ExamIO);
		}
	});

	return realTest;
},{
	requires:['io/exam','core','page/common/group-test']
});