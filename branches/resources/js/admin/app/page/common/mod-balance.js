/*-----------------------------------------------------------------------------
* @Description:     扣豆修改公共部分管理操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.19
* ==NOTES:=============================================
* v1.0.0(2013.12.19):
*     扣豆修改公共部分管理操作
* --------------------------------------------------------------------------*/
KISSY.add('page/common/mod-balance',function(S,ModBalance){
	PW.namespace('page.Common.ModBalance');
	PW.page.Common.ModBalance = function(param){
		return new ModBalance(param);
	}
},{
	requires:['mod/balance']
});

KISSY.add('mod/balance',function(S){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            form:'.J_table-mod-form',
            //操作面板
        	operateHolder:'.operation',
        	//修改按钮
        	modBtn: '.J_mod',
        	//题目名称
        	name:'.J_name',
        	//题目数量
        	num:'.J_num'
        },
        GROUP_ATTR='data-recharge-id',
        TIP = {
            mod_fail:'修改操作失败',
            mod_success:'修改操作成功',
            mod_error:'修改操作已存在'
        },
        MOD_QUESTIONNAME_TEMP='<tr data-recharge-id="&{id}">'+
        					  '<td class="J_name">&{name}</td>'+
							  '<td class="J_num"><input type="text" class="newText J_name" data-valid-rule="notNull & isNumber" data-valid-tip="|豆数只能为数字" value="&{num}"/></td>'+
							  '<td class="operation">'+
							  '<button type="submit" class="save-btn">提交</button>'+
							  '</td></tr>',
		SAVE_QUESTIONNAME_TEMP='<tr data-recharge-id="&{id}">'+
        					  '<td class="J_name">&{name}</td>'+
							  '<td class="J_num">&{num}</td>'+
							  '<td class="operation">'+
							  '<a href="#" class="J_mod">修改</a>'+
							  '</td></tr>';
    var ModBalance = function(param){
    	this.modIO = param;
        this._formValid;
    	this._init();
    }
    S.augment(ModBalance,{
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
                    num = $(tr).children(el.num).html(),
                    replaceTr = Juicer(MOD_QUESTIONNAME_TEMP,{id:id,name:name,num:num});
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
                numDOM = DOM.get(el.num+' input',tr),
                num = DOM.val(numDOM),
                name = $(tr).children(el.name).html();
            //表单验证
            that._formValid.validAll();
            that._formValid.getValidResult(function(validRs){
                if(!validRs){
                    PW.dialog.alert(TIP.mod_fail);
                    return ;
                }else{
                    that._modQuestion(name,id,num,tr);
                }
            });
    		
    	},
        /**
         * 与后台交互信息修改信息
         * @param  {[type]} name      [description]
         * @param  {[type]} id        [description]
         * @param  {[type]} num       [description]
         * @return {[type]}           [description]
         */
        _modQuestion:function(name,id,num,tr){
            var
                that = this;
            that.modIO({id:id,balance:num},function(code,errMsg){
                if(code == true){
                    //that._renderQuestionHandler(SAVE_QUESTIONNAME_TEMP,tr);
                    replaceTr = Juicer(SAVE_QUESTIONNAME_TEMP,{id:id,name:name,num:num});
                    DOM.replace(tr,replaceTr);
                    PW.dialog.alert(TIP.mod_success);
                }else{
                    PW.dialog.alert(errMsg);
                }

            });
        }
    });
    return ModBalance;
},{
	requires:['core','mod/ext','mod/juicer','mod/dialog','mod/defender']
});