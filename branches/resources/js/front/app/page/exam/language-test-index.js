/*-----------------------------------------------------------------------------
* @Description:     前台言语理解开始答题页面操作
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.17
* ==NOTES:=============================================
* v1.0.0(2014.03.17):
*     前台言语理解开始答题页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/language-test-index',function(S,languageIndex){
	PW.namespace('page.languageIndex');
	PW.page.languageIndex = function(param){
		new languageIndex(param);
	}
},{
	requires:['languageIndex/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('languageIndex/manage',function(S,ExamIO){
	function languageIndex(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(languageIndex,{
		init:function(){
			this.ExamIO = {
				validBalance: ExamIO.languageValidBalance
			}
			PW.page.common.validBalance(this.opts,this.ExamIO);
		}
	});

	return languageIndex;
},{
	requires:['io/exam','core','page/common/valid-test-balance']
});