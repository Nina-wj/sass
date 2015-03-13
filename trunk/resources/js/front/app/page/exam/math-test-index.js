/*-----------------------------------------------------------------------------
* @Description:     前台综合测试开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台综合测试开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/math-test-index',function(S,mathIndex){
	PW.namespace('page.mathIndex');
	PW.page.mathIndex = function(param){
		new mathIndex(param);
	}
},{
	requires:['mathIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('mathIndex/manage',function(S,ExamIO){
	function mathIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(mathIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.mathValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return mathIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});