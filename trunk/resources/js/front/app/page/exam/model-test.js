/*-----------------------------------------------------------------------------
* @Description:     前台模拟题测试页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.19
* ==NOTES:=============================================
* v1.0.0(2014.03.19):
*     前台模拟题测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/model-test',function(S,modelTest){
	PW.namespace('page.modelTest');
	PW.page.modelTest = function(param){
		new modelTest(param);
	}
},{
	requires:['modelTest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('modelTest/manage',function(S,ExamIO){
	function modelTest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(modelTest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.modelValidSubmit,
				//获取题目请求
				getOneQuestion: ExamIO.modelGetQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.modelGetFinishQuestion,
				//保存最后一题请求
				saveLastQuestion: ExamIO.modelSaveLastQuestion
			}
			PW.page.common.GroupTest(this.opts,this.ExamIO);
		}
	});

	return modelTest;
},{
	requires:['io/exam','core','page/common/group-test']
});