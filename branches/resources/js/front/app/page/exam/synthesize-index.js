/*-----------------------------------------------------------------------------
* @Description:     前台综合测试开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台综合测试开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/synthesize-index',function(S,synIndex){
	PW.namespace('page.synIndex');
	PW.page.synIndex = function(param){
		new synIndex(param);
	}
},{
	requires:['synIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('synIndex/manage',function(S,ExamIO){
	function synIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(synIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.synValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return synIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});