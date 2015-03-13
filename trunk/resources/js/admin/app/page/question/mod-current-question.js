
/*-----------------------------------------------------------------------------
* @Description:     修改纠正中待审核题目页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.01.04
* ==NOTES:=============================================
* v1.0.0(2014.01.04):
*     修改纠正中待审核题目页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/question/mod-current-question',function(S,CurrentQuestionMod){
	PW.namespace('page.Question.ModCurrentQuestion');
	PW.page.Question.ModCurrentQuestion = function(){
		return new CurrentQuestionMod();
	}
},{
	requires:['currentquestion/mod']
});

KISSY.add('currentquestion/mod', function(S,QuestionIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    	el={
    		//需要验证的表单
    		form:'form',
    		//提交按钮
    		submit:'#J_submitBtn',
    		//用户名
    		teacherHolder:'.teacher'
    	},
       TIP={
            checkTeacher:'请检查输入'
       };

    var CurrentQuestionMod = function(){
    	this._validForm;
    	this._init();
    }
    S.augment(CurrentQuestionMod,{
    	_init:function(){
    		this._validForm = PW.mod.Defender(el.form,{theme:'pure'});
    		this._addEventHandler();
    	},
    	_addEventHandler:function(){
    		var 
    			that = this;
    		on(el.form,'submit',that._submitHandler,that);
    		delegate(el.teacherHolder,'click',el.delTeacher,that._delTeacher,that);
    		on(el.teacherInput,'keydown',that._addTeacherHandler, that);
    	},
    	/**
    	 * 表单提交验证用户信息
    	 * @return {[type]} [description]
    	 */
    	_submitHandler:function(evt){
    		var 
    			that = this;
    		that._validForm.getValidResult(function(validRs){
                if(!validRs){
                    //PW.dialog.alert('请检查输入');
                    return false;
                }else{
                    var 
                        classId = DOM.val(el.classId),
                        f = DOM.get(el.form),
                        data = DOM.serialize(f);
                    QuestionIO.modCurrentInfo(data,function(code, errMsg){
                        if(code == true){
                           PW.Dialog.setData({code:true});  
                           PW.Dialog.closeThis();
                        }else{
                            PW.dialog.alert(errMsg);
                        }
                    });
                    
                }
            });
           return false;
    	}
    });
    return CurrentQuestionMod;
},{
	requires:['io/question','core','mod/defender','mod/dialog']
})