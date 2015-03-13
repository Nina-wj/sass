/*-----------------------------------------------------------------------------
* @Description:     正常题目管理操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.01.05
* ==NOTES:=============================================
* v1.0.0(2014.01.05):
*     正常题目管理操作
* --------------------------------------------------------------------------*/
KISSY.add('page/question/normal',function(S,NormalQuestion){
	PW.namespace('page.Question.Normal');
	PW.page.Question.Normal = function(param){
		return new NormalQuestion(param);
	}
},{
	requires:['normalQuestion/manage']
});

KISSY.add('normalQuestion/manage',function(S,QuestionIO,ModNormalQuestion){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.Query,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        //初始化分页
        initPagingConn = PW.conn.question.getNormalPagnation,
        //搜索后分页
        resetPaingConn = PW.conn.question.resetPagination,
        //点击搜索树后的分页
        clickPagingConn = PW.conn.question.updataNormalPagination,
        el={
            form:'form',
            //操作面板
        	operateHolder:'.operation',
        	//搜索输入框
        	seachInput: '#J_searchInput',
            //搜索方式
            searchType:'#J_searchType',
            //分页指向
            pagination:'#J_pagination',
            //数据指向
            dataRender:'#J_questionRender'
        },
        GROUP_ATTR='data-group-id',
        TIP = {
            mod_fail:'修改操作失败',
            mod_success:'修改操作成功',
            del_success:'删除操作失败',
            mod_error:'修改操作已存在'
        },
        //题型树渲染节点
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
        DIALOG_SETTING={
            width: 200,
            height: 50,
            title:'删除套题',
            topLayer:0
        };
    var NormalQuestion = function(param){
        this.opts = param;
        //题目树
        this._tree;
        //正常题目分页
        this._pagination;
        //编辑题目
        this.ModNormalQuestion;
    	this._init();
    }
    S.augment(NormalQuestion,{
    	_init:function(){
            this.ModNormalQuestion = new ModNormalQuestion(this.opts);
            //初始化题型树
            this._initSettingTree();
            this._initPagination();
    		this._addEvtHandler();
    	},
    	_addEvtHandler:function(){
    		var
    			that = this;
            on(el.seachInput,'keyup',that._searchHandler,that);
    	},
        /**
         * 初始化正常题目题目树
         * @return {[type]} [description]
         */
        _initSettingTree:function(){
            var
                that = this;
            QuestionIO.getNormalQuestionTree({},function(code,data,errMsg){
                if(code == true){
                    that._renderTree(data);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        },
        /**
         * 初始化分页
         * questionType为0
         * @return {[type]} [description]
         */
        _initPagination:function(){
            var 
                that = this;
            that._getPagination(0,initPagingConn);
        },
        /**
         * 渲染题目树
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _renderTree:function(data){
            var
                that = this,
                resetData = that._resetData(data),
                //resetJson = $.parseJSON(resetData),
                treeSettings;
                treeSettings = {
                    settings:{
                        callback: {
                           onClick:function(evt, treeId, treeNode){
                                that._getPaginationByClick(treeNode.id,clickPagingConn);
                            },  
                        },
                    },
                    zNodes :resetData
                };
           //that._resetData(data);
           that._tree = PW.tree(S.mix(TREE_SETTINGS,treeSettings,true,undefined,true));
        },
        /**
         * 重新设置数据
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _resetData:function(data){
            S.each(data,function(item,index){
                item.name = item.name +'(' +item.num+')'; 
            });
            return data;
        },
        /**
         * 搜索操作
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _searchHandler:function(evt){
            var
                that = this;
            clearTimeout(that._timeId);
            that._timeId = setTimeout(that._resetPagination, 1000);
        },
        /**
         * 重新获取题目树
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _resetPagination:function(evt){
            var
                that = this,
                searchName = DOM.val(el.seachInput),
                searchType = DOM.val(el.searchType);
            that._pagination = PW.pagination({
                renderTo: el.pagination,
                dataRender: el.dataRender,
                juicerRender: 'tpl',
                pageSize: 10,
                url:resetPaingConn.getConnPrefix() + resetPaingConn.url,
                extraParam: {
                    Id :searchType,
                    content:searchName,
                    pageSize:10
                },
                configUrl: function(url, page ,me, prevData){
                    return '' + url +'?page='+ page;
                }
            });
        },
        /**
         * 根据点击搜索树进行分页操作
         * @param id
         * @param paginationConn
         */
        _getPaginationByClick: function(id,paginationConn){
        	var
	            that = this;
	        that._pagination = PW.pagination({
	            renderTo: el.pagination,
	            dataRender: el.dataRender,
	            juicerRender: 'tpl',
	            pageSize: 10,
	            url:paginationConn.getConnPrefix() + paginationConn.url,
	            extraParam: {
	            	questionTypeId :id,
	                pageSize:10
	            },
	            configUrl: function(url, page ,me, prevData){
	                return '' + url +'?page='+ page;
	            }
	        });
        },
        /**
         * 点击题目树的节点获取分页信息
         * @param  {[type]} evt      [description]
         * @param  {[type]} treeId   [description]
         * @param  {[type]} treeNode [description]
         * @return {[type]}          [description]
         */
        _zTreeOnClick:function(evt, treeId, treeNode){
            var
                that = this,
                id = treeNode.id;
            that._getPagination(id,initPagingConn);
        },
        /**
         * 分页操作
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _getPagination:function(id, setPagingConn){
            var
                that = this;
            that._pagination = PW.pagination({
                renderTo: el.pagination,
                dataRender: el.dataRender,
                juicerRender: 'tpl',
                pageSize: 10,
                url:setPagingConn.getConnPrefix() + setPagingConn.url,
                extraParam: {
                    questionTypeId :id,
                    pageSize:10
                },
                configUrl: function(url, page ,me, prevData){
                    return '' + url +'?page='+ page;
                }
            });
        }
    });
    return NormalQuestion;
},{
	requires:['io/question','normalQuestion/mod','conn/core','core','mod/pagination','mod/tree','mod/dialog','mod/defender','thirdparty/jquery']
});
//题目编辑操作
KISSY.add('normalQuestion/mod',function(S,QuestionIO){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,Juicer = PW.juicer,
        on = S.Event.on, delegate = S.Event.delegate,Upload = PW.mod.Upload,
        uploadBatchConn = PW.conn.question.batchNormalQuestion,
        el={
            //修改按钮
            modBtn:'.J_modA',
            //废弃按钮
            discardBtn:'.J_discardA',
            //渲染题目holder
            questionHolder:'#J_questionRender',
            //导入按钮
            importBtn:'#J_uploadBatch'
        },
        //废弃对话框设置
        DISCARD_DIALOG_SETTING = {
            width: 200,
            height: 50,
            title:'废弃题目',
            topLayer:0
        },
        //修改题目设置
        MOD_DIALOG_SETTING = {
            width: 600,
            height: 400,
            title:'修改题目',
            topLayer:0
        },
        MOD_TR_HTML = '<tr data-question-id="&{questionId}">'+
						'<td>&{questionSource}</td>'+
						'<td>&{sourceMessage}</td>'+
						'<td>&{questionContent}</td>'+
						'<td>&{difficulty}</td>'+
						'<td>&{doneNum}</td>'+
						'<td>&{questionInputTime}</td>'+
						'<td class="operation">'+
						'<a href="#" class="J_modA">修改</a>'+
						'<a href="#" class="J_discardA">废弃</a>'+
						'</td>'+
						'</tr>',
        //题目id属性
        NORMAL_QUESTION_ATTR='data-question-id',
        TIP={
            recard_success:'废弃题目操作成功',
            mod_success:'修改题目操作成功',
            upload_sucess:'上传成功',
            upload_fail:'上传失败，请重新上传'
        };
    var ModNormalQuestion = function(param){
        this.opts = param;
        //批量上传文件
        this.batchUpLoad;
        this._init();
    }
    S.augment(ModNormalQuestion,{
        _init:function(){
        	//批量上传初始化
            this._batchUpLoad();
            this._addEvtHandler();
        },
        _addEvtHandler:function(){
            var
                that = this;
            delegate(el.questionHolder,'click',el.modBtn,that._modQuestionHandler,that);
            delegate(el.questionHolder,'click',el.discardBtn,that._discardHandler,that);
        },
        /**
         * 点击修改弹出修改对话框
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _modQuestionHandler:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                replaceTr,
                id = DOM.attr(tr,NORMAL_QUESTION_ATTR),
                settings = S.merge(MOD_DIALOG_SETTING, {
                    contentFrame:  that.opts.modUrl + '/' + id,
                    afterClose: function(e, me){
                        var data = PW.dialog.getData(me.id),
                            item = data.code;
                        replaceTr = Juicer(MOD_TR_HTML,{questionId:item.questionId,questionSource:item.questionSource,sourceMessage:item.sourceMessage,questionContent:item.questionContent,difficulty:item.difficulty,doneNum:item.doneNum,questionInputTime:item.questionInputTime});
                        DOM.replace(tr,replaceTr);
                    }
                });
            that._modDialog = PW.dialog.open(settings);
        },
        /**
         * 点击废除弹出询问对话框
         * 询问是否废弃该题目
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _discardHandler:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,NORMAL_QUESTION_ATTR),
                settings = S.merge(DISCARD_DIALOG_SETTING, {
                    content: '<p style="padding-left:10px">是否此废弃题目？</p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    that._discardQuestion(id,tr);
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
         * 废弃题目操作
         * @param  {[type]} id [description]
         * @param  {[type]} tr [description]
         * @return {[type]}    [description]
         */
        _discardQuestion:function(id, tr){
            var
                that = this;
            QuestionIO.discardQuestion({id:id,stateId:1}, function(code,errMsg){
                if(code == true){
                    DOM.remove(tr);
                    PW.dialog.alert(TIP.recard_success);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        },
        /**
         * 批量上传
         * @return {[type]} [description]
         */
        _batchUpLoad: function(){
            var
                that = this,
				errMsgStr = "",
                setting;
            setting = {
                upload:{
                    url: uploadBatchConn.getConnPrefix() + uploadBatchConn.url,  
                    type: 'post'
                },
                file: {
                	postName: 'myfiles',
                    typeLimit: '*.*',
                    sizeLimit: '10mb'
                },
                button: {
                    text: '批量导入名称',
                    cursor: 'hand',
                    renderTo: el.importBtn
                },
                events:{
                    uploadError: function(rs){
                    	alert(TIP.upload_fail);
                    },
                    uploadSuccess: function(uploadData,rs){
                    	if(rs.code == 0){
                    		alert(TIP.upload_sucess);
                    	}else{
							S.each(rs.errMsg,function(item,index){
								errMsgStr = errMsgStr + item;
							});
                     		alert(errMsgStr);
                    	}
                    	
                    },
                    uploadComplete: null
                },
            }
            that.batchUpLoad = Upload.init(setting);
        }
    });
    return ModNormalQuestion;
},{
    requires:['io/question','core','mod/dialog','mod/upload','conn/core','mod/juicer']
});