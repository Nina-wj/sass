/*-----------------------------------------------------------------------------
* @Description:     题型管理操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.24
* ==NOTES:=============================================
* v1.0.0(2013.12.24):
*     题型管理操作
* --------------------------------------------------------------------------*/
KISSY.add('page/question/type',function(S,QuestionType){
	PW.namespace('page.Question.Type');
	PW.page.Question.Type = function(){
		return new QuestionType();
	}
},{
	requires:['group/type']
});

KISSY.add('group/type',function(S,QuestionIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = jQuery,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            form:'form',
            //添加按钮
        	addBtn:'.J_add',
        	//修改按钮
        	modBtn: '.J_mod',
        	//删除按钮
        	delBtn:'.J_del'
        },
        TREE_CONTENT_ID='J_questionTypeTree',
        //题型树设置项
        TREE_SETTINGS = {
            queryName : '#' +TREE_CONTENT_ID,
            settings : {
                view: {
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            }
        },
        TIP = {
            mod_fail:'修改操作失败',
            mod_success:'修改操作成功',
            del_success:'删除操作失败',
            mod_error:'修改操作已存在'
        },
        //弹出框设置项
        DIALOG_SETTING={
            width: 200,
            height: 50,
            title:'添加题库类型',
            topLayer:0
        };
    var QuestionType = function(param){
    	this.opts = param;
        this._formValid;
    	this._init();
    }
    S.augment(QuestionType,{
    	_init:function(){
            this._initTreeSetting();
    	},
        /**
         * 初始化题目树设置
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
    	_initTreeSetting:function(){
    		var
    			that = this;
                // that._renderTree();
            QuestionIO.getQuestionTypeTree({},function(code,data,errMsg){
                if(code == true){
                    that._renderTree(data);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
    	},
        /**
         * 渲染目标数
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _renderTree:function(data){
            var
                that = this,
               treeSettings = {
                    settings : {
                        view: {
                            addHoverDom: function(treeId, treeNode){
                                that._addHoverDom(treeId, treeNode);
                            },
                            removeHoverDom: function(treeId, treeNode){
                                that._removeHoverDom(treeId, treeNode);
                            }
                        },
                        edit: {
                            enable: true,
                            editNameSelectAll: true,
                            removeTitle: "删除",
                            renameTitle: "重命名",
                            drag: {
                                isCopy: false,
                                isMove: false
                            }
                        },
                        callback: {
                            beforeEditName: function(treeId, treeNode){
                                that._beforeEditName(treeId, treeNode);
                                return false;
                            },
                            beforeRemove: function(treeId, treeNode){
                                that._beforeRemove(treeId, treeNode)
                                return false;
                            }
                        }
                    },
                    zNodes :data
                };
           that.tree = PW.tree(S.mix(TREE_SETTINGS,treeSettings,true,undefined,true));
        },
    	/**
    	 * 当hover树节点时，添加+按钮
    	 * @return {[type]}           [description]
    	 */
    	_addHoverDom:function(treeId, treeNode){
            var 
                that = this,
                node = $("#" + treeNode.tId + "_span"),
                addStr = "<span class='button add' id='addBtn_" + treeNode.id + "' title='添加' onfocus='this.blur();'></span>",
                addNode;

            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.id).length>0) return;
            addNode = $(addStr);
            node.append(addNode);

            addNode.on('click', function(evt){
                that._openAddDialog(treeNode);
            });
    	},
        /**
         * 移除hover事件
         * @return {[type]} [description]
         */
        _removeHoverDom:function(treeId, treeNode){
            $("#addBtn_"+treeNode.id).unbind().remove();
        },
        /**
         * 修改节点操作
         * @param  {[type]} treeId   [description]
         * @param  {[type]} treeNode [description]
         * @return {[type]}          [description]
         */
        _beforeEditName:function(treeId, treeNode){
            var 
                that = this;
            that._openModDialog(treeNode);
        },
        /**
         * 删除节点操作
         * @param  {[type]} treeId   [description]
         * @param  {[type]} treeNode [description]
         * @return {[type]}          [description]
         */
        _beforeRemove:function(treeId, treeNode){
            var 
                that = this,
                settings = S.merge(DIALOG_SETTING, {
                    content: '<p style="padding-left:10px">是否删除该节点？</p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    that._delQuestion(treeNode);
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
         * 打开添加对话框
         * @param  {[type]} treeNode [description]
         * @return {[type]}          [description]
         */
        _openAddDialog:function(treeNode){
            var
                that = this,
                settings = S.merge(DIALOG_SETTING, {
                    content: '<p style="padding-left:10px"><span>名称：</span><input type="text" class="newText J_name"></p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    var content = me.opts.content,
                                        name = $(content).find('.J_name').val();
                                    QuestionIO.addQuestionType({fatherId:treeNode.id,name:name},function(code,data,errMsg){
                                        if(code == true){
                                            that._addNode(treeNode, data.id, name, data.num);
                                            me.close();
                                        }else{
                                            PW.dialog.alert(errMsg);
                                        }
                                    });
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
         * 打开修改对话框
         * @param  {[type]} treeNode [description]
         * @return {[type]}          [description]
         */
        _openModDialog:function(treeNode){
             var
                that = this,
                settings = S.merge(DIALOG_SETTING, {
                    content: '<p style="padding-left:10px"><span>名称：</span><input type="text" class="newText J_name" value = "'+treeNode.tName+'"></p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    var content = me.opts.content,
                                        name = $(content).find('.J_name').val();
                                    QuestionIO.modQuestionType({id:treeNode.id,name:name},function(code,errMsg){
                                        if(code == true){
                                            treeNode.name = name;
                                            that.tree.updateNode(treeNode)
                                            me.close();
                                        }else{
                                            PW.dialog.alert(errMsg);
                                        }
                                    });
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
         * 渲染新节点
         * @return {[type]}           [description]
         */
        _addNode:function(treeNode, id, name ,num){
            var
                that = this;
            that.tree.addNodes(treeNode,{id:id,name:name,num:num});
        },
        /**
         * 删除题型操作
         * @return {[type]}     [description]
         */
        _delQuestion:function(treeNode){
            var
                that = this;
            QuestionIO.delQuestionType({id:treeNode.id},function(code, errMsg){
                if(code == true){
                    that.tree.removeNode(treeNode);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        }
    });
    return QuestionType;
},{
	requires:['io/question','thirdparty/jquery','core','mod/ext','mod/juicer','mod/dialog','mod/defender','mod/tree']
});