/*-----------------------------------------------------------------------------
* @Description:     前台资料分析测试开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台资料分析测试开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/data-test-index',function(S,dataIndex){
	PW.namespace('page.dataIndex');
	PW.page.dataIndex = function(param){
		new dataIndex(param);
	}
},{
	requires:['dataIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('dataIndex/manage',function(S,ExamIO){
	function dataIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(dataIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.dataValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return dataIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});