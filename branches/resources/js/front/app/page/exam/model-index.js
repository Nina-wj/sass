/*-----------------------------------------------------------------------------
* @Description:     前台模拟题开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.19
* ==NOTES:=============================================
* v1.0.0(2014.03.19):
*     前台模拟题开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/model-index',function(S,modelIndex){
	PW.namespace('page.modelIndex');
	PW.page.modelIndex = function(param){
		new modelIndex(param);
	}
},{
	requires:['modelIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('modelIndex/manage',function(S,ExamIO){
	function modelIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(modelIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.modelValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return modelIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});