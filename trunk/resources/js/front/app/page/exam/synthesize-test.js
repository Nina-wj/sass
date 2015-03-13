/*-----------------------------------------------------------------------------
* @Description:     前台学习综合测试页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.06
* ==NOTES:=============================================
* v1.0.0(2014.03.06):
*     前台学习综合测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/synthesize-test',function(S,synThest){
	PW.namespace('page.synThest');
	PW.page.synThest = function(param){
		new synThest(param);
	}
},{
	requires:['synThest/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('synThest/manage',function(S,ExamIO){
	function synThest(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(synThest,{
		init:function(){
			this.ExamIO = {
				//提交用户所选答案请求
				validQuestion: ExamIO.synthesizeTestValidSubmit,
				//获取题目请求
				getOneQuestion: ExamIO.synthesizeTestGetQuestion,
				//获取某一区间内已完成题号
				getFinishQuestion: ExamIO.synThestTestGetFinishQuestion,
				//保存最后一题请求
				saveLastQuestion: ExamIO.synSaveLastQuestion
			}
			PW.page.common.GroupTest(this.opts,this.ExamIO);
		}
	});

	return synThest;
},{
	requires:['io/exam','core','page/common/group-test']
});