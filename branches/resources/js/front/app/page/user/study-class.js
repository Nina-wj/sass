/*-----------------------------------------------------------------------------
* @Description:     user学员天地
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.01.16
* ==NOTES:=============================================
* v1.0.0(2014.01.16)
* --------------------------------------------------------------------------*/
KISSY.add('page/user/study-class',function(S,StudyClass){
	PW.namespace('page.User.StudyClass')
	PW.page.User.StudyClass = function(){
		return new StudyClass();
	}
},{
	requires:['study/class']
});
KISSY.add('study/class',function(S,UserIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,IO = S.Event.IO,
        Juicer = Juicer = PW.juicer,
        on = S.Event.on, delegate = S.Event.delegate,
    	el={
            //需要验证的表单
            form:'form',
            //查看
            check:'.check',
            //评分
            grade:'.grade',
            //查看
            check:'.check',
            //查看模块
            checkHolder:'.J_view',
            //学生id
            studentId:'.J_studentId',
            tableEl:'.wrapper-table',
            //提交教师评分form
            scoreForm:'#J_socreTeacher',
            scoreHolder:'.score',
            //提交教师评分
            scoreSubmit:'.J_submitScore',
            //教师信息holder
            teacherHolder:'.J_scoreHolder',
            //教师评分部分
            teacherScoreTd:'#J_viewTable'
    	},
        CLASS_ID_ATTR='data-class-id',
        TIP={
            hasScored:'已评分',
            notScored:'未评分'
        },
        SCORE_TEACHER_TEMP='<label>&{name}</label>'+
                            '<input type="hidden" value="&{id}" name="teacherIds" />'+
                            '<select name="scoreNums">'+
                            '<option value="1">1分</option>'+
                            '<option value="2">2分</option>'+
                            '<option value="3">3分</option>'+
                            '<option value="4">4分</option>'+
                            '<option value="5">5分</option>'+
                            '<option value="6">6分</option>'+
                            '<option value="7">7分</option>'+
                            '<option value="8">8分</option>'+
                            '<option value="9">9分</option>'+
                            '<option value="10">10分</option>'+
                            '</select>',
       CHECK_TEACHER_SCORE='<tr>'+
                            '<td>&{name}</td>'+
                            '<td>&{score}</td>'+
                            '<td>&{num}</td>'+
                            '</tr>' ;                           
    var StudyClass = function(){
    	this._init();
    };
    S.augment(StudyClass,{
    	_init:function(){
            this._target;
    		this._addEvntHandler();
    	},
    	_addEvntHandler:function(){
    		var
    			that = this;
    		// on(el.grade,'mouseover',that._overGrade,that);
    		// on(el.grade,'mouseout',that._outGrade,that);
            //点击页面其他部分去掉页面上评分和查看评分的窗口 
            on(document,'click',function(e){
                var target = e.target,
                    gradeHolder = DOM.parent(target,el.scoreHolder),
                    checkHolder = DOM.parent(target,el.checkHolder);
                if(DOM.hasClass(target,'grade')){
                    that._clickGrade(e);
                }else if(DOM.hasClass(target,'check')){
                    that._clickCheck(e);
                }else if(gradeHolder != null || checkHolder != null||DOM.hasClass(target,'score')||DOM.hasClass(target,'view')){
                    //do Nothing
                }
                else{
                    that._freshClassState();
                }
            });
            on(el.scoreSubmit,'click',function(){
                if(that._target != null){
                    that._submitScore(that._target)
                }
            },that);
    	},
    	_overGrade:function(evt){
    		var
    			that = this,
    			target = evt.target;
    			// overImg = '<img style="position:absolute;top:0;left:0;" id="J_overImg" src="http://servant.pandawork.net/resources/img/servant/hand.png" />',
			overImgEl = DOM.css(target,'z-index','-100');
    		// DOM.append(overImgEl,target);
    	},
    	_outGrade:function(evt){
    		var
    			that = this,
    			target = evt.target;
			overImgEl = DOM.css(target,'z-index','0');
    	},
        /**
         * 点击评分，显示评分界面
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
    	_clickGrade:function(evt){
    		var
    			that = this,
    			target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,CLASS_ID_ATTR),
                height = DOM.height(target),
    			top = $(target).offset().top,
				left = $(target).offset().left;
            that._freshClassState();
            if(!DOM.hasClass(target,'hasScored')){
                //渲染教师信息
                that._renderTeacher(id);
                DOM.addClass(target,'scoretd');
                DOM.show(el.scoreHolder);
                DOM.css(el.scoreHolder,{top:top+height+'px',left:left+'px'});
                that._target = target;
            }
            
    	},
        /**
         * 渲染教师名称到评分模块
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        _renderTeacher:function(id){
            var
                that = this;
            DOM.empty(el.teacherHolder);
            UserIO.getTeacherInfo({banJiId:id},function(code, data, errMsg){
                if(code){
                    var teachers = '<input type="hidden" value="'+id+'" name="banJiId" />',
                        teachersEl;
                    S.each(data.teacherList,function(item, index){
                        teachers = teachers + Juicer(SCORE_TEACHER_TEMP,{id:item.teacherId,name:item.teacherName});
                    });
                teachersEl = DOM.create(teachers);
                DOM.append(teachersEl,el.teacherHolder);
                }
            });
        },
        /**
         * 提交学生评分
         * @return {[type]} [description]
         */
        _submitScore:function(obj){
            var
                that = this,
                form = get(el.scoreForm),
                studentId = DOM.val(el.studentId),
                data = DOM.serialize(form);
           UserIO.submitScore({banJiId:data.banJiId,scoreNums:data.scoreNums,teacherIds:data.teacherIds},function(code,errMsg){
                if(code){
                    DOM.hide(el.scoreHolder);
                    DOM.removeClass(obj,'scoretd');
                    DOM.html(obj,TIP.hasScored);
                    DOM.addClass(obj,'hasScored');
                }else{
                    PW.page.Util.dialog.alert('<h1>'+errMsg+'</h1>');
                }
            }); 
        },
        /**
         * 渲染教师评分结果窗口
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _clickCheck:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,CLASS_ID_ATTR),
                top = $(target).offset().top,
                left = $(target).offset().left;
            
            that._freshClassState();
            //渲染教师信息
            that._renderCheckTeacher(id);
            // DOM.removeClass(el.check,'scoretd');
            DOM.addClass(target,'scoretd');
            DOM.show(el.checkHolder);
            DOM.css(el.checkHolder,{top:top+35+'px',left:left+'px'});
        },
        /**
         * 渲染获取教师信息
         */
        
        _renderCheckTeacher:function(id){
            var
                that = this,
                studentId = DOM.val(el.studentId)
            DOM.empty(el.teacherScoreTd);
            UserIO.checkTeacherScore({banJiId:id},function(code, data, errMsg){
                if(code){
                    var teachers = '',
                        teachersEl;
                    S.each(data.teacherScoreDtoList,function(item, index){
                        teachers = teachers + Juicer(CHECK_TEACHER_SCORE,{score:item.score,name:item.teacherName,num:item.joinScoreStudents});
                    });
                teachersEl = DOM.create(teachers);
                DOM.append(teachersEl,el.teacherScoreTd);
                }
            });

        },
        /**
         * 重新刷新班级页面状态
         * @return {[type]} [description]
         */
        _freshClassState:function(){
            var
                that = this;
            //隐藏查看界面
            DOM.hide(el.checkHolder);
             //隐藏评分界面
            DOM.hide(el.scoreHolder);
            DOM.removeClass(el.check,'scoretd');
            DOM.removeClass(el.grade,'scoretd');
        }
    });
    return StudyClass;
},{
	requires:['io/user','core','mod/ext','mod/juicer','page/common/util']
})