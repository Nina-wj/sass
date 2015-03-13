/*-----------------------------------------------------------------------------
* @Description:     前台综合测试开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台综合测试开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/logic-test-index',function(S,logicIndex){
	PW.namespace('page.logicIndex');
	PW.page.logicIndex = function(param){
		new logicIndex(param);
	}
},{
	requires:['logicIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('logicIndex/manage',function(S,ExamIO){
	function logicIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(logicIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.logicValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return logicIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});