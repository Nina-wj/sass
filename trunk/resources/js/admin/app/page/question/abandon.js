/*-----------------------------------------------------------------------------
* @Description:     废弃题目操作
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.12.24
* ==NOTES:=============================================
* v1.0.0(2013.12.24):
*     废弃题目操作
* --------------------------------------------------------------------------*/
KISSY.add('page/question/abandon',function(S,QuestionAbandon){
	PW.namespace('page.Question.Abandon');
	PW.page.Question.Abandon = function(param){
		return new QuestionAbandon(param);
	}
},{
	requires:['abandon/manage']
});
KISSY.add('abandon/manage',function(S,QuestionIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        delegate = S.Event.delegate,
        setPagingConn = PW.conn.question.getAbandonQuestionPagination,
        el={
            dataRender:'#J_dataRender',
            //操作面板
        	operateHolder:'.operation',
        	//恢复按钮
        	recoverBtn: '.J_recover',
        	//删除按钮
        	delBtn:'.J_del',
            //分页holder
            pagination:'#J_pagination'
        },
        GROUP_ATTR='data-group-id',
        TIP = {
            recover_success:'恢复操作成功',
            del_success:'删除操作成功',
        },
        DIALOG_SETTING_RECOVER={
            width: 200,
            height: 50,
            title:'恢复废弃题目',
            topLayer:0
        },
        DIALOG_SETTING_DEL={
            width: 200,
            height: 50,
            title:'删除废弃题目',
            topLayer:0
        };
    var QuestionAbandon = function(param){
    	this.opts = param;
    	this._init();
    }
    S.augment(QuestionAbandon,{
    	_init:function(){		
            this._initPaginition();
            this._addEvtHandler();
    	},
       /**
        * 初始化分页
        * @return {[type]} [description]
        */
        _initPaginition:function(){
            var
                that = this;
            that._pagination = PW.pagination({
                renderTo: el.pagination,
                juicerRender: 'tpl',
                dataRender: el.dataRender,
                pageSize: 10,
                url:setPagingConn.getConnPrefix() + setPagingConn.url,
                extraParam: {
                    pageSize:10
                },
                configUrl: function(url, page ,me, prevData){
                    return '' + url +'?page='+ page;
                }
            });
        },
        /**
         * 恢复和删除操作
         */
    	_addEvtHandler:function(){
    		var
    			that = this;
    		delegate(el.dataRender,'click',el.recoverBtn, that._recoverQuestionHanlder,that);
    		delegate(el.dataRender,'click',el.delBtn, that._delQuestionHanlder,that);
    	},
         /**
         * 恢复废弃题目，弹出对话框是否恢复废弃题目
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _recoverQuestionHanlder:function(evt){
            var 
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,GROUP_ATTR),
                settings = S.merge(DIALOG_SETTING_RECOVER, {
                    content: '<p style="padding-left:10px">是否恢复此废弃题目？</p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    that._recoverQuestion(id,tr);
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
        _recoverQuestion:function(id,tr){
            var 
                that = this;
            QuestionIO.recoverAbandonName({questionId:id,abandonSign:that.opts.abandonSign},function(code,errMsg){
                if(code == true){
                    DOM.remove(tr);
                    PW.dialog.alert(TIP.recover_success);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        },
        /**
         * 删除废弃题目，弹出对话框是否删除废弃题目
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _delQuestionHanlder:function(evt){
            var 
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,GROUP_ATTR),
                settings = S.merge(DIALOG_SETTING_DEL, {
                    content: '<p style="padding-left:10px">是否删除此废弃题目？</p>',
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
            QuestionIO.delAbandonName({questionId:id},function(code,errMsg){
                if(code == true){
                    DOM.remove(tr);
                    PW.dialog.alert(TIP.del_success);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        },
    });
    return QuestionAbandon;
},{
	requires:['io/question','core','mod/dialog','mod/pagination','conn/core']
});