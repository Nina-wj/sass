
/*-----------------------------------------------------------------------------
* @Description:     班级管理添加页面操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     班级管理添加页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/class/add',function(S,ClassAdd){
	PW.namespace('page.Class.Add');
	PW.page.Class.Add = function(){
		return new ClassAdd();
	}
},{
	requires:['class/add']
});

KISSY.add('class/add', function(S,ClassIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.IO,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    	el={
    		//需要验证的表单
    		form:'form',
            //开始时间
            startTime:'#J_startTime',
            //结束时间
            endTime:'#J_endTime',
    		//提交按钮
    		submit:'#J_submitBtn',
    		//用户名
    		teacherHolder:'.teacher',
    		//老师删除按钮
    		delTeacher:'.teacher-del',
            //删除教师
            teacherBtn:'.teacher-btn',
            searchTeacher:'.teacher-input',
    		//教师输入框
    		teacherInput:'#J_teacherInp'
    	},
    	ADD_TEACHER_TEMP ='<p class="teacher-btn">'+
    					  '<input type="hidden" name="teacherIds" value="&{id}" />'+
						  '<span class="teacher-name">&{name}</span>'+
						  '<button type="button" class="teacher-del">×</button>'+
						  '</p>',
        CHOOSE_TEACHERLIST_TEMP = '<tr><td><input type="radio" name="userId" value="&{id}" /></td>'+
                                  '<td>&{name}</td>'+
                                  '<td>&{username}</td>'+
                                  '</tr>',
       DIALOG_SETTING = {
            width: 400,
            height: 150,
            title:'选择教师',
            topLayer:0
       },
       TIP={
            checkTeacher:'请检查输入',
            checkTeacherIds: '输入教师不可为空'
       };

    var ClassAdd = function(){
    	this._validForm;
    	this._init();
    }
    S.augment(ClassAdd,{
    	_init:function(){
            var
                that = this;
    		that._validForm = PW.mod.Defender(el.form,{theme:'pure',
                items:[
                    //可以为数字
                    {
                        queryName:el.startTime,
                        pattern: function(input,shell,form){
                            return (/^[0-9-]*$/.test(DOM.val(input)))&&!(this.test('isNull',DOM.val(input)));
                        },
                        tip:'请填写时间 | 时间填写有误',
                        showEvent:'focus',
                        vldEvent:'valuechange'
                    },
                    //可以为数字
                    {
                        queryName:el.endTime,
                        pattern: function(input,shell,form){
                            var
                                startTime = DOM.val(el.startTime),
                                endTime = DOM.val(input),
                                endTimeArr = [],
                                startArr = [],
                                flag;
                            if((/^[0-9-]*$/.test(endTime))&&!(this.test('isNull',endTime))){
                                if(startTime != '' && endTime != ''){
                                    startArr = startTime.split('-');
                                    endTimeArr = endTime.split('-');
                                    flag = that._isLate(startArr, endTimeArr);
                                }else{
                                    flag = true;
                                }
                            }else{
                                flag = false;
                            }
                            return  flag;
                        },
                        tip:'请填写时间 | 时间填写有误',
                        showEvent:'focus',
                        vldEvent:'valuechange'
                    }
                ]});
            that._initSetting();
    		that._addEventHandler();
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
            that._validForm.validAll();   
    		that._validForm.getValidResult(function(validRs){
                if(!validRs){
                    //PW.dialog.alert('请检查输入');
                    return false;
                }else{
                    var 
                        f = DOM.get(el.form),
                        data = DOM.serialize(f),
                        teacherIds = data.teacherIds;
                    if(teacherIds){
                        ClassIO.submitAddClass(data,function(code, errMsg){
                            if(code == true){
                                window.location.reload();
                            }else{
                                PW.dialog.alert(errMsg);
                            }
                        });
                    }else{
                         PW.dialog.alert(TIP.checkTeacherIds);
                    }
                }
            });
           return false;
    	},
    	/**
         * 添加教师操作
         * 当返回code = 0直接添加，code = 1无盖教师名称，code = 2 弹框选择教师
         * @param {[type]} evt [description]
         */
    	_addTeacherHandler:function(evt){
    		var
    			that = this;
    		if(evt.keyCode == 13){
             var  teacherName=DOM.val(el.teacherInput);
    			if(teacherName != ''){
    				ClassIO.searchTeacher({teacherName:teacherName},function(code,data,errMsg){
    					if(code == true){
                            var teacherList = data.teacherInfoList;
                            if(teacherList.length == 1){
                                that._renderTeacher(teacherList[0].teacherId, teacherName);
                            }else{
                                that._chooseTeacher(teacherName,teacherList);
                            }
    						
    					}else{
                           PW.dialog.alert(errMsg);
                        }
    				});
    			}else{
                    PW.dialog.alert(TIP.checkTeacher);
                }
                return false;
    		}
    	},
        /**
         * 删除教师
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _delTeacher:function(evt){
            var
                that = this,
                target = evt.target,
                teacherP = DOM.parent(target, el.teacherBtn);
            DOM.remove(teacherP);
        },
        _chooseTeacher:function(name, list){
            var
                that = this,
                renderList  = '',
                renderDOM,
                settings;
            S.each(list,function(item){
                renderList = renderList+Juicer(CHOOSE_TEACHERLIST_TEMP,{id:item.teacherId,name:name,username:item.teacherUserName});
            });
            renderDOM = DOM.create(renderList);
                settings = S.merge(DIALOG_SETTING, {
                    content: '<table class="common-table" style="width:90%;height:auto;"><tr><th></th><th>名称</th><th>用户名</th></tr><tbody id="J_teacherInfo">'+renderList+'</tbody></table>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    var teacherId = DOM.val('#J_teacherInfo input:checked');
                                    that._renderTeacher(teacherId,name);
                                    DOM.val(el.teacherInput,'');
                                    me.close();
                                }
                            },
                            {
                                bid:2,
                                text:'取消',
                                clickHandler: function(evt,me){
                                    me.close();
                                }
                            }
                        ]
                    }
                });
            PW.dialog.open(settings);
        },
        /**
         * ajax提交表单，提交成功后刷新页面，不成功提示信息
         * @return {[type]} [description]
         */
        // _submitClassInfo:function(evt){
        //     var 
        //         that = this,
        //         f = DOM.get(el.form);
        //     ClassIO.submitAddClass({DOM.serialize(f);},function(code, errMsg){
        //         if(code == true){
        //             //window.location.reload();
        //             var f = get(el.form);
        //             f.submit();
        //         }else{
        //             PW.dialog.alert(errMsg);
        //         }
        //     });
        //     return false;
        // },
        /**
         * 渲染教师
         * @return {[type]} [description]
         */
        _renderTeacher:function(id, name){
            var
                teacherDOM = Juicer(ADD_TEACHER_TEMP,{id:id,name:name}),
                teacher = DOM.create(teacherDOM);
            DOM.insertBefore(teacher,el.searchTeacher);

           // return teacherDOM;
        },
        /**
         * 判断结束时间是否大于开始时间
         * @param  {[type]}  startArr   [description]
         * @param  {[type]}  endTimeArr [description]
         * @return {Boolean}            [description]
         */
        _isLate: function(startArr, endTimeArr){
            var
                that = this,
                flag;
            for(var i=0; i<3;i++){
                startArr[i] = parseInt(startArr[i]);
                endTimeArr[i] = parseInt(endTimeArr[i]);
                if(startArr[i] == endTimeArr[i]){
                    continue;
                }else if(startArr[i] > endTimeArr[i]){
                    flag = false;
                    break;
                }else if(startArr[i] < endTimeArr[i]){
                    flag = true;
                    break;
                }
            }
            return flag;
        }
    });
    return ClassAdd;
},{
	requires:['io/class','core','mod/defender','mod/dialog','mod/juicer','mod/calendar']
})