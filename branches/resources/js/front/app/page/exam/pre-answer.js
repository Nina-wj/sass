/*-----------------------------------------------------------------------------
* @Description:     前台学习测试获取答案页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/pre-answer',function(S,get,exit,click,index){
	PW.namespace('page.preAnswer');
	PW.page.preAnswer = function(param){
		new get(param);
		new exit(param);
		new click(param);
		new index();
	}
},{
	requires:['preAnswer/get','preAnswer/exit','preAnswer/click','preAnswer/index']
});
/*--------------------------------获取答案------------------------------*/
KISSY.add('preAnswer/get',function(S,ExamIO){
	var
		DOM = S.DOM, on = S.Event.on, $ = S.all,IO = S.Event.IO, delegate = S.Event.delegate,
		Juicer = S.juicer,
		el = {
			questionId:'.J_questionId',//指向当前题目的题号
			answer:'.J_answer',//指向当前题目的答案
			questionHolder:'.J_questionContent',//指向问题html的holder
			nextBtn:'.J_nextBtn',//指向下一题按钮
			errorBtn:'.J_errorBtn',//指向纠错按钮
			errorForm:'.J_errorForm'//指向纠错的表单
		},
		ANSWER_HTML = '<div class="content J_content" data="holder">'
				            +'<table class="exam-table" data="holder">'
				                +'<thead data="holder">'
				                    +'<tr data="holder">'
				                        +'<th colspan ="2" data="holder">'
				                            +'&{sourceMessage}'
				                            +'<a href="javaScript:;" data="holder" class="J_errorBtn">题目纠错</a>'
				                        +'</th>'
				                    +'</tr>'
				                +'</thead>'
				                +'<tbody data="holder">'
				                    +'<tr class="exam-content" data="holder">'
				                        +'<td data="holder">题目</td>'
				                        +'<td data="holder">'
				                            +'<div data="holder">&{questionContent}</div>'
				                        +'</td>'
				                    +'</tr>'
				                    +'<tr class="exam-options" data="holder">'
				                        +'<td data="holder">选项</td>'
				                        +'<td data="holder">'
				                            +'<ol data="holder">'
				                            	+'{@each questionOptions as q, index}'
				                                +'<li data="holder" {@if userAnswer == index} class="checked" {@/if} >'
				                                    +'<input type="radio" name="option" {@if userAnswer == index} checked {@/if} value="&{index}" data="holder"/>'
				                                    +'<label for="A" data="holder">&{q}</label>'
				                                +'</li>'
				                                +'{@/each}'
				                            +'</ol>'
				                        +'</td>'
				                    +'</tr>'
				                    +'<tr class="exam-answer" data="holder">'
				                        +'<td data="holder">正确答案</td>'
				                        +'<td data="holder">&{questionAnswer}</td>'
				                    +'</tr>'
				                    +'<tr class="exam-analysis" data="holder">'
				                        +'<td data="holder">答案解析</td>'
				                        +'<td data="holder">'
				                           +'<div data="holder">&{questionAnalysis}</div>'
				                        +'</td>'
				                    +'</tr>'
				                +'</tbody>'
				            +'</table>'
				            +'<div class="exam-widget clearfix" data="holder">'
				                +'<a href="javaScript:;" class="exit-exam J_exitBtn" data="holder">结束答题</a>'
				                +'<span data="holder">难度系数：&{difficulty}</span>'
				            +'</div>'
				            +'<div class="exam-btn" data="holder">'
				                +'<button class="btn btn-blue J_nextBtn" data="holder">下一题</button>'
				            +'</div>'
				        +'</div>';

	function get(param){
		this.opts = param;
		this.init();
	}

	S.augment(get,{
		init:function(){
			this._getAnswer();
			this._addEventListener();
		},
		/**
		 * [_addEventListener description]
		 */
		_addEventListener:function(){
			var
				that = this;
			/*点击下一题按钮*/
			delegate(document,'click',el.nextBtn,function(){
				that._getNextQuestion();
			});
			/*点击纠错按钮*/
			delegate(document,'click',el.errorBtn,function(){
				that._openErrorDialog();
			});
		},
		/**
		 * [_getNextQuestion 获取下一题]
		 * @return {[type]} [description]
		 */
		_getNextQuestion:function(){
			var 
				questionId = $(el.questionId).val(),
				answer = $(el.answer).val();
			window.location.href = this.opts.nextUrl;
		},
		/**
		 * [_openErrorDialog 打开纠错对话框]
		 * @return {[type]} [description]
		 */
		_openErrorDialog:function(){
			var
				that = this,flag,
				questionId = $(el.questionId).val(),
				tip = '<form class="J_errorForm"><textarea name="description" class="error-text"></textarea><input name="questionId" type="hidden" value="'+questionId+'"></form>',
	    		btnTest = '提交纠错';
    		PW.page.Util.dialog.confirm(tip,btnTest,function(){
    			that._submitError();
    			return true;
    		});
		},
		/**
		 * [_submitError 提交纠错]
		 * @return {[type]} [description]
		 */
		_submitError:function(){
			var
				that = this,
				data = DOM.serialize(el.errorForm);
			ExamIO.preTestSubmitError(data,function(rs){
				if(rs.code != 0){
					PW.page.Util.dialog.alert('<h1>'+rs.errMsg+'</h1>');
				}
			});
		},
		/**
		 * [_getAnswer 获取答案]
		 * @return {[type]} [description]
		 */
		_getAnswer:function(){
			var
				that = this,
				questionId = $(el.questionId).val(),
				answer = $(el.answer).val(),
				data = {questionId:questionId};
			ExamIO.preTestGetOneAnswer(data,function(rs){
				if(rs.code == 0){
					rs.data.userAnswer = answer.charCodeAt(0) - 65;;
					that._renderAnswer(rs.data);
				}else{
					PW.page.Util.dialog.alert('<h1>'+rs.errMsg+'</h1>');
				}
			});
		},
		/**
		 * [_renderAnswer 渲染答案的详细信息]
		 * @param {[type]} [data] [返回的答案信息]
		 * @return {[type]} [description]
		 */
		_renderAnswer:function(data){
			var
				that = this,
				answerHtml = that._createHtml(data);
			$(el.questionHolder).append(answerHtml);
		},
		/**
		 * [_createHtml 生成答案的html]
		 * @param  {[type]} data [返回的答案的信息]
		 * @return {[type]}      [生成的html]
		 */
		_createHtml:function(data){
			var
				html = Juicer(ANSWER_HTML,data);
			return html;
		}
	});

	return get;
},{
	requires:['io/exam','mod/juicer','core','mod/dialog']
});
/*--------------------------------退出------------------------------*/
KISSY.add('preAnswer/exit',function(S){
	var
		DOM = S.DOM, delegate = S.Event.delegate, $ = S.all,
		el = {
			exitBtn:'.J_exitBtn'//指向结束答题按钮
		};

	function exit(param){
		this.opts = param;
		this.init();
	}

	S.augment(exit,{
		init:function(){
			this._addEventListener();
		},
		_addEventListener:function(){
			var
				that = this;
			delegate(document,'click',el.exitBtn,function(){
				that._openTip();
			});
		},
		/**
    	 * 显示提示信息
    	 */
    	_openTip:function(){
    		var
    			that = this,
    			tip = '<h1>确定要退出本次答题？</h1><p>学习豆会在答题提交后扣除</p><p>此操作对您的学习豆无任何影响</p>',
    			btnTest = '确认退出';
    		PW.page.Util.dialog.confirm(tip,btnTest,function(){
    			window.location.href = that.opts.exitUrl;
    		});
    	}
	});

	return exit;
},{
	requires:['core','page/common/util']
});
/*--------------------------------点击非白色地方报错------------------------------*/
KISSY.add('preAnswer/click',function(S){
	var
		$ = S.all, DOM = S.DOM, on = S.Event.on,
		el = {
			contentHolder:'.J_content'//指向答题的白色区域
		};

	function click(param){
		this.opts = param;
		this.init();
	}

	S.augment(click,{
		init:function(){
			this._addEventListener();
		},
		_addEventListener:function(){
			var
				that = this;
			on('body','click',function(evt){
				that._valid(evt);
			});
		},
		/**
		 * [_valid ]判断点击的部分是不是白色区域
		 * @param {[type]} [evt] [当前点击的部分]
		 */
		_valid:function(evt){
			var
				that = this;
			if($(evt.target).attr('data') == "holder"){
				that._hideTip();
			}else{
				that._showTip();
			}
		},
		/**
		 * [_showTip 显示红色边框]
		 * @return {[type]} [description]
		 */
		_showTip:function(){
			$(el.contentHolder).addClass('content-tip');
		},
		/**
		 * [_hideTip 隐藏红色边框]
		 * @return {[type]} [description]
		 */
		_hideTip:function(){
			$(el.contentHolder).removeClass('content-tip');
		}
	});

	return click;
},{
	requires:['core']
});
/*********************将页面导航页面操作加入到页面****************************/
KISSY.add('preAnswer/index',function(S){
	function index(){
		this._init();
	}
	S.augment(index,{
		_init: function(){
			PW.page.Index();
		}
	});
	return index;

},{
	requires: ['core','page/index']
});
