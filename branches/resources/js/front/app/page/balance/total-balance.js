/*-----------------------------------------------------------------------------
* @Description:     前台总学习豆页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.18
* ==NOTES:=============================================
* v1.0.0(2014.01.18):
*     前台总学习豆页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/balance/total-balance',function(S,click){
	PW.namespace('page.totalBalance');
	PW.page.totalBalance = function(param){
		return new click(param);
	}
},{
	requires:['totalBalance/click']
});
/*--------------------------------点击总学习豆------------------------------*/
KISSY.add('totalBalance/click',function(S){
	var
		DOM = S.DOM, on = S.Event.on, $ = S.all,
		el = {
			totalNumBtn:'#J_totalNum',//指向总豆数按钮
			beanInfoHolder:'.J_beanInfo',//指向学习豆信息
			btn:'button'//指向页面中的按钮
		};

	function click(){
		this.init();
	}

	S.augment(click,{
		init:function(){
			this._addEventListener();
		},
		_addEventListener:function(){
			var
				that = this;
			/*点击总豆数*/
			on(el.totalNumBtn,'click',function(){
				if(DOM.css(el.beanInfoHolder,'display') == 'none'){
					//当学习豆信息隐藏时执行
					that._showBeanInfo(this);
					that._hideBtn(this);
				}else{
					//当学习豆信息显示时执行
					that._hideBeanInfo(this);
					that._showBtn(this);
				}
			});
		},
		/**
    	 * 显示学习豆信息
    	 * @param {[type]} [btn] [当前点击的按钮]
    	 */
    	_showBeanInfo:function(btn){
    		var
    			that = this;
    		$(btn).addClass('show');	
    		$(el.beanInfoHolder).show();
    	},
    	/**
    	 * 隐藏按钮
    	 * @param {[type]} [btn] [当前点击的按钮]
    	 */
    	_hideBtn:function(btn){
    		var
    			that = this;
    		$(el.btn).hide();	
    	},
    	/**
    	 * 隐藏学习豆信息
    	 * @param {[type]} [btn] [当前点击的按钮]
    	 */
    	_hideBeanInfo:function(btn){
    		var
    			that = this;
    		$(btn).removeClass('show');	
    		$(el.beanInfoHolder).hide();
    	},
    	/**
    	 * 显示按钮
    	 * @param {[type]} [btn] [当前点击的按钮]
    	 */
    	_showBtn:function(btn){
    		var
    			that = this;
    		$(el.btn).show();	
    	}
	});

	return click;
},{
	requires:['core']
});