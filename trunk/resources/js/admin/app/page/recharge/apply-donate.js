/*-----------------------------------------------------------------------------
* @Description:     报班学员送豆修改操作
* @Version:         1.0.0
* @author:          kt(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     报班学员送豆修改操作
* --------------------------------------------------------------------------*/
KISSY.add('page/recharge/apply-donate',function(S,ApplyDonate){
	PW.namespace('page.Recharge.ApplyDonate');
	PW.page.Recharge.ApplyDonate = function(){
		return new ApplyDonate();
	}
},{
	requires:['apply/donate']
});

KISSY.add('apply/donate',function(S,RechargeIO){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            form:'form',
            //操作面板
        	operateHolder:'.operation',
        	//修改按钮
        	modBtn: '.J_mod',
        	//题目名称
        	name:'.J_name',
        	//报班送豆数量
        	applyNum:'.J_apply-num',
            //评分送豆数量
            scoreNum:'.J_score-num'
        },
        GROUP_ATTR='data-recharge-id',
        TIP = {
            mod_fail:'修改操作失败',
            mod_success:'修改操作成功',
            mod_error:'修改操作已存在'
        },
        MOD_QUESTIONNAME_TEMP='<tr data-recharge-id="&{id}">'+
        					  '<td class="J_name">&{name}</td>'+
                              '<td class="J_apply-num"><input type="text" class="newText J_name" data-valid-rule="notNull & isNumber" data-valid-tip="|豆数不可为空" value="&{applyNum}"/></td>'+
							  '<td class="J_score-num"><input type="text" class="newText J_name" data-valid-rule="notNull & isNumber" data-valid-tip="|豆数不可为空" value="&{scoreNum}"/></td>'+
							  '<td class="operation">'+
							  '<button class="save-btn">提交</button>'+
							  '</td></tr>',
		SAVE_QUESTIONNAME_TEMP='<tr data-recharge-id="&{id}">'+
        					  '<td class="J_name">&{name}</td>'+
                              '<td class="J_apply-num">&{applyNum}</td>'+
							  '<td class="J_score-num">&{scoreNum}</td>'+
							  '<td class="operation">'+
							  '<a href="#" class="J_mod">修改</a>'+
							  '</td></tr>';
    var ApplyDonate = function(){
        this._formValid;
    	this._init();
    }
    S.augment(ApplyDonate,{
    	_init:function(){
            this._formValid = PW.mod.Defender(el.form,{theme:'inline'});
    		this._addEvtHandler();
    	},
    	_addEvtHandler:function(){
    		var
    			that = this;
    		delegate(el.form,'click',el.modBtn, that._modNameHanlder,that);
    	},
        /**
         * 修改送豆数量，将报班送豆数量和评价送豆数量改为修改框
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
                    applyNum = $(tr).children(el.applyNum).html(),
                    scoreNum = $(tr).children(el.scoreNum).html(),
                    replaceTr = Juicer(MOD_QUESTIONNAME_TEMP,{id:id,name:name,applyNum:applyNum,scoreNum:scoreNum});
                DOM.replace(tr,replaceTr);
                that._formValid.refresh();
                delegate(el.operateHolder,'click','.save-btn',that._saveNameHandler, that);
            }else{
                PW.dialog.alert(TIP.mod_error);
            }
    	},
    	/**
         * 保存修改信息函数
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
    	_saveNameHandler:function(evt){
    		var
    			that = this,
    			target = evt.target,
    			tr = DOM.parent(target,'tr'),
    			id = DOM.attr(tr,GROUP_ATTR),
                applyNumDOM = DOM.get(el.applyNum+' input',tr),
                scoreNumDOM = DOM.get(el.scoreNum+' input',tr),
                applyNum = DOM.val(applyNumDOM),
                scoreNum = DOM.val(scoreNumDOM),
                name = $(tr).children(el.name).html();
            //表单验证
            that._formValid.validAll();
            that._formValid.getValidResult(function(validRs){
                if(!validRs){
                    PW.dialog.alert(TIP.mod_fail);
                    return ;
                }else{
                    that._modQuestion(name,id,applyNum,scoreNum,tr);
                }
            });   		
    	},
        /**
         * 与后台交互信息修改信息
         * @param  {[type]} name     [description]
         * @param  {[type]} id       [description]
         * @param  {[type]} applyNum [description]
         * @param  {[type]} scoreNum [description]
         * @param  {[type]} tr       [description]
         * @return {[type]}          [description]
         */
        _modQuestion:function(name,id,applyNum,scoreNum,tr){
            var
                that = this;
            RechargeIO.balanceByApply({id:id,balance:applyNum,scoreBalance:scoreNum},function(code,errMsg){
                if(code == true){
                    //that._renderQuestionHandler(SAVE_QUESTIONNAME_TEMP,tr);
                    replaceTr = Juicer(SAVE_QUESTIONNAME_TEMP,{id:id,name:name,applyNum:applyNum,scoreNum:scoreNum});
                    DOM.replace(tr,replaceTr);
                    PW.dialog.alert(TIP.mod_success);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        }
    });
    return ApplyDonate;
},{
	requires:['io/recharge','core','mod/ext','mod/juicer','mod/dialog','mod/defender']
});