/*-----------------------------------------------------------------------------
* @Description:     前台综合测试开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台综合测试开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/knowledge-test-index',function(S,knlgIndex){
	PW.namespace('page.knlgIndex');
	PW.page.knlgIndex = function(param){
		new knlgIndex(param);
	}
},{
	requires:['knlgIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('knlgIndex/manage',function(S,ExamIO){
	function knlgIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(knlgIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.knlgValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return knlgIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});