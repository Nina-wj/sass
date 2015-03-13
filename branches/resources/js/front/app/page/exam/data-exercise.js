/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/data-exercise',function(S,dataExercise){
	PW.namespace('page.dataExercise');
	PW.page.dataExercise = function(param){
		new dataExercise(param);
	}
},{
	requires:['dataExercise/manage']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('dataExercise/manage',function(S,ExamIO){
	function dataExercise(param){
		this.opts = param;
		this.ExamIO;
		this.init();
	};
	S.augment(dataExercise,{
		init:function(){
			this.ExamIO = {
				validQuestion: ExamIO.validDataExercisQuestion,
				getOneQuestion: ExamIO.getDataExercisOneQuestion
			}
			PW.page.common.ExamTest(this.opts,this.ExamIO);
		}
	});

	return dataExercise;
},{
	requires:['io/exam','core','page/common/exam-test']
});
