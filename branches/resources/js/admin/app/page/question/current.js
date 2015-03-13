/*-----------------------------------------------------------------------------
* @Description:     纠错题目管理操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.24
* ==NOTES:=============================================
* v1.0.0(2013.12.24):
*     纠错题目管理操作
* --------------------------------------------------------------------------*/
KISSY.add('page/question/current',function(S,QuestionCurrent){
	PW.namespace('page.Question.Current');
	PW.page.Question.Current = function(param){
		return new QuestionCurrent(param);
	}
},{
	requires:['group/current']
});

KISSY.add('group/current',function(S,QuestionIO,QuestionEdit){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        setPagingConn = PW.conn.question.showCorrectionQuestion,
        el={
            //纠错类型下拉框
            reviewTpye:'#J_reviewTpye',
            //数据渲染部分
            dataRender:'#J_dataRender',
            //分页holder
            pagination:'#J_pagination'
        },
        TIP = {
            reject_tip:'驳回理由',
            reject_success:'该题目已驳回成功',
            del_success:'删除操作失败',
            mod_error:'修改操作已存在'
        },
        DIALOG_SETTING={
            width: 200,
            height: 50,
            title:'删除套题',
            topLayer:0
        };
    var QuestionCurrent = function(param){
        this.opts = param;
        this._QuestionEdit = new QuestionEdit(param);
    	this._init();
    }
    S.augment(QuestionCurrent,{
    	_init:function(){
            this._initPaginition();
    		this._addEvtHandler();
    	},
    	_addEvtHandler:function(){
    		var
    			that = this;
    		on(el.reviewTpye,'change', that._reviewTypeHandler,that);
    	},
        /**
         * 初始化分页
         * @return {[type]} [description]
         */
        _initPaginition:function(){
            var
                that = this,
                reviewTpye = DOM.val(el.reviewTpye);
            that._pagnition(reviewTpye);
        },
        /**
         * 修改审核类型修改页面，并分页
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
    	_reviewTypeHandler:function(evt){
    		var
    			that = this,
    			 reviewState = DOM.val(el.reviewTpye);
            if(reviewState == 2){
                DOM.hide(el.activeTip);
            }else if(reviewState == 3){
                //DOM.html(TIp.reject_tip);
            }
            that._pagnition(reviewState);
    	},
    	/**
    	 * 信息分页操作
    	 * @param  {[type]} stateId [审核状态]
    	 * @return {[type]}           [description]
    	 */
    	_pagnition:function(stateId){
    		var
    			that = this;
			that._pagination = PW.pagination({
                renderTo: el.pagination,
                dataRender: el.dataRender,
                juicerRender: 'tpl',
                pageSize: 10,
                url:setPagingConn.getConnPrefix() + setPagingConn.url,
                extraParam: {
                    stateId :stateId,
                    pageSize:10
                },
                configUrl: function(url, page ,me, prevData){
                    return '' + url +'?page='+ page;
                }
            });
    	}
    });
    return QuestionCurrent;
},{
	requires:['conn/core','question/edit','core','mod/juicer','mod/dialog','mod/pagination']
});

/**
 * 纠错题目修改驳回处理
 */
KISSY.add('question/edit',function(S,QuestionIO){
     var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = jQuery,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            //数据holder
            dataHolder:'#J_dataRender',
            //删除按钮
            delBtn:'.J_delA',
            //修改按钮
            modBtn:'.J_modA',
            //上课人数
            num:'.J_num'
        },
        //班级id自定义属性
        QUESTION_ID_ATTR = 'data-question-id',
        //班级correctionId自定义属性
        CURRENCTION_ID_ATTR = 'data-correction-id',
        //删除提示框设置
        REJECT_DIALOG_SETTING={
            width: 250,
            height: 150,
            title:'驳回理由',
            topLayer:0
        },
        MOD_DIALOG_SETTING = {
            width: 600,
            height: 400,
            title:'修改纠正题目信息',
            topLayer:0
        },
        //提示信息
        TIP = {
            del_success_tip:'删除成功'
        };
    var QuestionEdit = function(param){
        this.opts = param;
        this._modDialog;
        this._init();
    }
    S.augment(QuestionEdit,{
        _init:function(){
            this._addEventHandler();
        },
        _addEventHandler:function(){
            var
                that = this;
            delegate(el.dataHolder,'click',el.delBtn,that._rejectHandler,that);
            delegate(el.dataHolder,'click',el.modBtn,that._modHandler,that);
        },
        /**
         * 点击修改按钮弹出框并显示新页
         * @return {[type]} [description]
         */
        _modHandler:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr, QUESTION_ID_ATTR),
                currenctionId = DOM.attr(tr, CURRENCTION_ID_ATTR),
                settings = S.mix(MOD_DIALOG_SETTING,{
                    contentFrame:  that.opts.modUrl+'/' + id + '/' + currenctionId,
                    afterClose: function(e, me){
                        var data = PW.dialog.getData(me.id);
                        if(data.code == true){
                            DOM.remove(tr);
                        }
                    }
                });
          that._modDialog =   PW.dialog.open(settings);
        },
        /**
         * 点击驳回操作后弹框填写驳回理由
         * @return {[type]} [description]
         */
        _rejectHandler:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                classId = DOM.attr(tr,QUESTION_ID_ATTR),
                settings = S.mix(REJECT_DIALOG_SETTING,{ 
                    content: '<p style="padding-left:10px">请填写驳回理由</p><textarea style="height: 104px;margin-left: 10px;width: 213px;" class="J_rejectInfo"></textarea>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                   var container = $(me.dlgEl);
                                    that._rejectQuestionManage(classId,container,tr);
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
         * 驳回题目操作
         * @param  {[type]} id [description]
         * @param  {[type]} tr [description]
         * @return {[type]}    [description]
         */
        _rejectQuestionManage:function(id,container,tr){
            var
                that = this,
                rejectInfo = $(container).find('.J_rejectInfo').val();
            QuestionIO.rejectQuestion({correctionId:id, rejectReason:rejectInfo, stateId: 3},function(code, errMsg){
                if(code ==true){
                    DOM.remove(tr);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        }
    });
        return QuestionEdit;
},{
    requires:['io/question','core','mod/dialog','thirdparty/jquery','mod/ext']
});
