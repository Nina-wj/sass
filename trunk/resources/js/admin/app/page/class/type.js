/*-----------------------------------------------------------------------------
* @Description:     对于班级类型操作部分
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     对于班级类型操作部分
* --------------------------------------------------------------------------*/
KISSY.add('page/class/type',function(S,ClassIO){
	var DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
    el = {
        //Form表单
        formHandle:'#J_formHandle',
        //添加类型表单
        addForm:'.J_addform',
        //表格内容显示区域
    	pageTbable:'#J_pageTbable',
    	//添加按钮
    	addBtn: '#J_addBtn',
    	//加输入框
    	addInput: '#J_addInput',
    	//添加面板
    	addPanel:'.class-type-add',
        //班级类型
        classType:'.J_classtype',
        //修改标签
        editA:'.J_editA',
        //删除标签
        delA:'.J_delA'
    },
    ADD_TEMP = '<tr data-class-id="&{id}">'+
    		 '<td class="J_classtype">&{name}</td>'+
    		 '<td class="operation">'+
			 '<a href="#" class="J_editA">修改</a>'+
			 '<span>|</span>'+
			 '<a href="#" class="J_delA">删除</a>'+
			 '</td>'+
			 '</tr>';
    MOD_TEMP = '<tr data-class-id="&{id}">'+
               '<td><input class="newText J_classtype" data-valid-rule="length(1,20)" data-valid-tip="|输入类型名称错误" id="editInput" type="text" value="&{name}"></td>'+
               '<td class="operation">'+
               '<button type="button" id="saveBtn">提交</button>'+
               '</td>'+
               '</tr>',
   CLASS_ID_ATTR='data-class-id',
   TIP={
    checkInput:'请检查输入',
    checkBeforeSubmit:'请提交后再做其他修改',
    delSuccess:'删除成功',
    addSuccess:'添加成功',
    modSuccess:'修改成功'
   }
   var ClassType = function(){
        //form表单验证
        this._addValid;
        this._modValid;
        this._init();
    };
    S.augment(ClassType,{
    	_init:function(){
            this._addValid = PW.mod.Defender(el.addForm,{theme:'inline'});
            this._modValid = PW.mod.Defender(el.formHandle,{theme:'inline'});
    		this._addEvtDispatcher();
    	},
    	_addEvtDispatcher:function(){
    		var
                that = this;
            delegate(el.addPanel, 'click', el.addBtn, that._addHandler, that);
            delegate(el.pageTbable, 'click', el.editA, that._modHandler, that);
            delegate(el.pageTbable, 'click', el.delA, that._rmHandler, that);
    	},
        /**
         * 添加名称操作
         * @param {event} evt [对于添加按钮点击进行操作]
         */
    	_addHandler:function(evt){
            var 
                that = this,
                inputVal = DOM.val(el.addInput);
               // dishType = DOM.val(el.dishType);
            that._addValid.getValidResult(function(validRs){
                if(!validRs){
                    PW.dialog.alert(TIP.checkInput);
                    return ;
                }

                ClassIO.addClassType({banJiTypeName: inputVal},function(rs){
                    if(rs.code == '0'){
                        that._appendContainer(rs.data.id,inputVal);
                        DOM.val(el.addInput,'');
                        PW.dialog.alert(TIP.addSuccess);
                    }else{
                        PW.dialog.alert(rs.errMsg);
                    }
                });
            });
		},
        /**
         * 修改名称操作
         * @param  {event} evt [点击修改按钮对相应名称进行修改]
         * 并且监听提交按钮点击事件
         */
        _modHandler:function(evt){
            var that = this,
                submitBtn = query('.newText',el.pageTbable);
                if(submitBtn.length == 0){
                    var 
                        t = evt.target,
                        tr = get(t).parentNode.parentNode,
                        name = $(tr).children(el.classType).html(),
                        nameDOM = query(el.classType,tr),
                        editVal = DOM.html(nameDOM),
                        id = DOM.attr(tr,CLASS_ID_ATTR),
                        editHtml = Juicer(MOD_TEMP,{id:id,name:name}),
                    editDOM = DOM.create(editHtml);
                    DOM.replace(tr,editHtml);
                    delegate(el.pageTbable, 'click', '#saveBtn', that._saveEditHandler, that);
                    //验证修改框表单
                    that._modValid.refresh();
                }else{
                    PW.dialog.alert(TIP.checkBeforeSubmit);
                }
        },
        /**
         * 移除名称操作
         * @param  {event} evt [点击移除按钮对相应名称进行移除]
         */
        _rmHandler:function(evt){
            var 
                that = this,
                t = evt.target,
                tr = get(t).parentNode.parentNode,
                id = DOM.attr(tr,CLASS_ID_ATTR);
            ClassIO.delClassType({banJiTypeId: id},function(code,rs){
                if(code){
                    DOM.remove(tr);
                    PW.dialog.alert(TIP.delSuccess);
                }else{
                    PW.dialog.alert(rs);
                }
            });
        },
        /**
         * 修改名称点击提交按钮后对信息进行保存
         * @param  {event} evt [点击提交按钮对相应名称进行保存并显示]
         */
        _saveEditHandler:function(evt){
             var 
                that = this,
                t = evt.target,
                tr = get(t).parentNode.parentNode,
                name = query(el.classType,tr),
                nameVal = DOM.val(name);
                id = DOM.attr(tr,CLASS_ID_ATTR);
            that._modValid.validAll();
            that._modValid.getValidResult(function(rs){
                if(!rs){
                    PW.dialog.alert(TIP.checkInput);
                    return ;
                }
                ClassIO.modClassType({banJiTypeId: id,banJiTypeName:nameVal},function(code,rs){
                    if(code == true){
                        addHtml = Juicer(ADD_TEMP,{id:id,name:nameVal}),
                        trDOM = DOM.create(addHtml);
                        DOM.replace(tr,trDOM);
                        PW.dialog.alert(TIP.modSuccess);
                    }else{
                        PW.dialog.alert(rs);
                    }
                });
            });
        },
        /**
         * 添加新节点
         * @param  {int} id   [名称id]
         * @param  {string} name [名称]
         */
        _appendContainer:function(id,name){
            var 
                addHtml = Juicer(ADD_TEMP,{id:id,name:name}),
                trDOM = DOM.create(addHtml);
            DOM.append(trDOM, el.pageTbable);
        }
    });
	PW.namespace('page.Class.Type');
    PW.page.Class.Type = function(){
        return new ClassType();
    }
},{
	requires:['io/class','core','mod/juicer','mod/dialog','mod/ext','mod/defender']
});