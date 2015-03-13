/*-----------------------------------------------------------------------------
* @Description:     前台历年真题开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.19
* ==NOTES:=============================================
* v1.0.0(2014.03.19):
*     前台历年真题开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/real-index',function(S,realIndex){
	PW.namespace('page.realIndex');
	PW.page.realIndex = function(param){
		new realIndex(param);
	}
},{
	requires:['realIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('realIndex/manage',function(S,ExamIO){
	function realIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(realIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.realValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return realIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});