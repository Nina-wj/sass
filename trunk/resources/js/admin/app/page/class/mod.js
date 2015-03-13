
/*-----------------------------------------------------------------------------
* @Description:     班级管理修改页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     班级管理添加页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/class/mod',function(S,ClassMod){
	PW.namespace('page.Class.Mod');
	PW.page.Class.Mod = function(){
		return new ClassMod();
	}
},{
	requires:['class/mod']
});

KISSY.add('class/mod', function(S,ClassIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    	el={
    		//需要验证的表单
    		form:'form',
            //班级id
            classId:'.J_classid',
            //班级类型
            classType:'.J_classtype',
            //班级名称
            className:'.J_classname',
            //开始时间
            startTime:'#J_startTime',
            //结束时间
            endTime:'#J_endTime',
    		//提交按钮
    		submit:'#J_submitBtn',
    		//用户名
    		teacherHolder:'.teacher'
    	},
       TIP={
            checkTeacher:'请检查输入'
       };

    var ClassMod = function(){
    	this._validForm;
    	this._init();
    }
    S.augment(ClassMod,{
    	_init:function(){
    		this._validForm = PW.mod.Defender(el.form,{theme:'pure'});
            this._initSetting();
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
         * 页面初始化设置,时间控件
         * @return {[type]} [description]
         */
        _initSetting:function(){
            var
                that = this;
            PW.mod.Calendar.client({renderTo: el.startTime});
            PW.mod.Calendar.client({renderTo: el.endTime});
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
                    ClassIO.modClassInfo(data,function(code, errMsg){
                        if(code == true){
                            var classType = DOM.html(el.classType+' :selected');
                           PW.Dialog.setData({classId:classId,classType:classType,className:DOM.val(el.className),startTime:DOM.val(el.startTime),endTime:DOM.val(el.endTime)});  
                           PW.Dialog.closeThis();
                            //window.location.reload();
                        }else{
                            PW.dialog.alert(errMsg);
                        }
                    });
                    
                }
            });
           return false;
    	}
    });
    return ClassMod;
},{
	requires:['io/class','core','mod/defender','mod/dialog','mod/juicer','mod/calendar']
})