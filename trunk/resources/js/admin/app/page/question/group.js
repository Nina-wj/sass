/*-----------------------------------------------------------------------------
* @Description:     套题管理操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.17
* ==NOTES:=============================================
* v1.0.0(2013.12.17):
*     套题管理操作
* --------------------------------------------------------------------------*/
KISSY.add('page/question/group',function(S,QuestionGroup){
	PW.namespace('page.Question.Group');
	PW.page.Question.Group = function(param){
		return new QuestionGroup(param);
	}
},{
	requires:['group/manage']
});

KISSY.add('group/manage',function(S,QuestionIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            form:'form',
            //操作面板
        	operateHolder:'.operation',
        	//修改按钮
        	modBtn: '.J_mod',
        	//删除按钮
        	delBtn:'.J_del',
        	//题目名称
        	name:'.J_name',
        	//题目数量
        	num:'.J_num',
            //推荐用时
            time:'.J_use-time',
        	//平均难度
        	level:'.J_level',
        	//做过人数
        	personNum:'.J_person-num'
        },
        GROUP_ATTR='data-group-id',
        TIP = {
            mod_fail:'修改操作失败',
            mod_success:'修改操作成功',
            del_success:'删除操作失败',
            mod_error:'修改操作已存在'
        },
        DIALOG_SETTING={
            width: 200,
            height: 50,
            title:'删除套题',
            topLayer:0
        },
        MOD_QUESTIONNAME_TEMP='<tr data-group-id="&{id}">'+
        					  '<td><input type="text" class="newText J_name" data-valid-rule="notNull" data-valid-tip="|套题名称不可为空" value="&{name}"/></td>'+
							  '<td class="J_num">&{num}</td>'+
							  '<td class="J_level">&{level}</td>'+
							  '<td class="J_person-num">&{personNum}</td>'+
                              '<td><input type="text" class="newText J_use-time" data-valid-rule="isNumber" data-valid-tip="|推荐用时为数字" value="&{time}"/></td>'+
							  '<td class="operation">'+
							  '<button class="save-btn">提交</button>'+
							  '</td></tr>',
		SAVE_QUESTIONNAME_TEMP='<tr data-group-id="&{id}">'+
        					  '<td class="J_name">&{name}</td>'+
							  '<td class="J_num">&{num}</td>'+
							  '<td class="J_level">&{level}</td>'+
							  '<td class="J_person-num">&{personNum}</td>'+
                              '<td class="J_use-time">&{time}</td>'+
							  '<td class="operation">'+
							  '<a href="#" class="J_mod">修改</a><a href="#" class="J_del">删除</a>'+
							  '</td></tr>';
    var QuestionGroup = function(param){
    	this.opts = param;
        this._formValid;
    	this._init();
    }
    S.augment(QuestionGroup,{
    	_init:function(){
            this._formValid = PW.mod.Defender(el.form,{theme:'inline'});
    		this._addEvtHandler();
    	},
    	_addEvtHandler:function(){
    		var
    			that = this;
    		delegate(el.form,'click',el.modBtn, that._modNameHanlder,that);
    		delegate(el.form,'click',el.delBtn, that._delQuestionHanlder,that);
    	},
        /**
         * 修改套题操作，将套题名称和推荐用时改为修改框
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
    	_modNameHanlder:function(evt){
    		var
    			that = this,
    			target = evt.target,
    			tr = DOM.parent(target,'tr'),
                searchBtn = query('.save-btn');
            if(searchBtn.length == 0){
                var
                    id = DOM.attr(tr,GROUP_ATTR),
                    name = $(tr).children(el.name).html(),
                    time = $(tr).children(el.time).html(),
                    num = $(tr).children(el.num).html(),
                    level = $(tr).children(el.level).html(),
                    personNum = $(tr).children(el.personNum).html(),
                    replaceTr = Juicer(MOD_QUESTIONNAME_TEMP,{id:id,name:name,num:num,time:time,level:level,personNum:personNum});
                DOM.replace(tr,replaceTr);
                that._formValid.refresh();
                delegate(el.operateHolder,'click','.save-btn',that._saveNameHandler, that);
            }else{
                PW.dialog.alert(TIP.mod_error);
            }
    	},
    	/**
    	 * 保存修改信息函数
    	 * @param  {[type]} num       [description]
    	 * @param  {[type]} level     [description]
    	 * @param  {[type]} personNum [description]
    	 * @return {[type]}           [description]
    	 */
    	_saveNameHandler:function(evt){
    		var
    			that = this,
    			target = evt.target,
    			tr = DOM.parent(target,'tr'),
    			id = DOM.attr(tr,GROUP_ATTR),
                nameDOM = DOM.get(el.name,tr),
                timeDOM = DOM.get(el.time,tr),
                name = DOM.val(nameDOM),
                time = DOM.val(timeDOM),
                num = $(tr).children(el.num).html(),
                level = $(tr).children(el.level).html(),
                personNum = $(tr).children(el.personNum).html();
            //表单验证
            that._formValid.validAll();
            that._formValid.getValidResult(function(validRs){
                if(!validRs){
                    PW.dialog.alert(TIP.mod_fail);
                    return ;
                }else{
                    that._modQuestion(name,id,time,num,level,personNum,tr);
                }
            });
    		
    	},
        /**
         * 与后台交互信息修改信息
         * @param  {[type]} name      [description]
         * @param  {[type]} id        [description]
         * @param  {[type]} time      [description]
         * @param  {[type]} num       [description]
         * @param  {[type]} level     [description]
         * @param  {[type]} personNum [description]
         * @return {[type]}           [description]
         */
        _modQuestion:function(name,id,time,num,level,personNum,tr){
            var
                that = this;
            QuestionIO.modQuestionName({groupQuestionName:name,groupQuestionId:id,recommendTime:time,ZhenTiOrMoNiId:that.opts.ZhenTiOrMoNiId},function(code,errMsg){
                if(code == true){
                    //that._renderQuestionHandler(SAVE_QUESTIONNAME_TEMP,tr);
                    replaceTr = Juicer(SAVE_QUESTIONNAME_TEMP,{id:id,name:name,time:time,num:num,level:level,personNum:personNum});
                    DOM.replace(tr,replaceTr);
                    PW.dialog.alert(TIP.mod_success);
                }else{
                    PW.dialog.alert(errMsg);
                }

            });
        },
        /**
         * 删除套题，弹出对话框是否删除套题
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _delQuestionHanlder:function(evt){
            var 
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,GROUP_ATTR),
                name = $(tr).children(el.name).html(),
                num = $(tr).children(el.num).html(),
                settings = S.merge(DIALOG_SETTING, {
                    content: '<p style="padding-left:10px">是否删除'+name+'整套'+num+'题？</p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    that._delQuestion(id,tr);
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
        _delQuestion:function(id,tr){
            var 
                that = this;
            QuestionIO.delQuestionName({groupQuestionId:id,ZhenTiOrMoNiId:that.opts.ZhenTiOrMoNiId},function(code,errMsg){
                if(code == true){
                    DOM.remove(tr);
                    PW.dialog.alert(TIP.mod_success);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        },
    	/**
    	 * 传入对象和对象模板，渲染对象
    	 * @param  {[type]} template [description]
    	 * @param  {[type]} tr       [description]
    	 * @return {[type]}          [description]
    	 */
    	_renderQuestionHandler:function(template,tr){
    		var
    			that = this,
    			id = DOM.attr(tr,GROUP_ATTR),
                nameDOM = DOM.get(el.name, tr),
                numDOM = DOM.get(el.num, tr),
                timeDOM = DOM.get(el.time, tr),
                levelDOM = DOM.get(el.level, tr),
                personNumDOM = DOM.get(el.personNum,tr),
    			name = $(tr).find(el.name).html(),
    			num = DOM.html(numDOM),
                time = DOM.html(timeDOM),
    			level = DOM.html(levelDOM),
    			personNum = DOM.html(personNumDOM),
    			replaceTr;
    		replaceTr = Juicer(template,{id:id,name:name,time:time,num:num,level:level,personNum:personNum});
			DOM.replace(tr,replaceTr);
    	}
    });
    return QuestionGroup;
},{
	requires:['io/question','core','mod/ext','mod/juicer','mod/dialog','mod/defender']
});