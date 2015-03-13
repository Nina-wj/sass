/*-----------------------------------------------------------------------------
* @Description:     前台学习测试页面操作
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014.01.19
* ==NOTES:=============================================
* v1.0.0(2014.01.19):
*     前台学习测试页面操作
* --------------------------------------------------------------------------*/
KISSY.add('page/exam/pre-test',function(S,get,exit,click, index){
	PW.namespace('page.preTest');
	PW.page.preTest = function(param){
		new get(param);
		new exit(param);
		new click(param);
		new index();
	}
},{
	requires:['preExamTest/get','preExamTest/exit','preExamTest/click','preExamTest/index']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('preExamTest/get',function(S,Juicer,ExamIO){
	var
		DOM = S.DOM, on = S.Event.on, $ = S.all,IO = S.Event.IO, delegate = S.Event.delegate,
		el = {
			questionId:'.J_questionId',//指向当前题目的题号
			answer:'.J_answer',//指向当前题目的答案
			questionHolder:'.J_questionContent',//指向问题html的holder
			submitBtn:'.J_submitBtn'//指向提交按钮
		},
		QUESTION_HTML = '<div class="content J_content" data="holder">'
							+'<input name="questionId" type="hidden" class="J_questionId" value="&{questionId}">'
			                +'<table class="exam-table" data="holder">'
			                    +'<thead data="holder">'
			                        +'<tr data="holder">'
			                            +'<th colspan ="2" data="holder">&{sourceMessage}</th>'
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
			                                	+'{@each questionOptions as q,index}'
			                                    +'<li data="holder">'
			                                        +'<input type="radio" value="&{index}" name="option" data="holder"/>'
			                                        +'<label for="A">&{q}</label>'
			                                    +'</li>'
			                                    +'{@/each}'
			                                +'</ol>'
			                            +'</td>'
			                        +'</tr>'
			                    +'</tbody>'
			                +'</table>'
			                +'<div class="exam-widget clearfix" data="holder">'
			                    +'<a href="javaScript:;" class="exit-exam J_exitBtn" data="holder">结束答题</a>'
			                    +'<span data="holder">难度系数：&{difficulty}</span>'
			                +'</div>'
			                +'<div class="exam-btn" data="holder">'
			                    +'<button class="btn btn-blue J_submitBtn" data="holder" type="button">提交</button>'
			                +'</div>'
			            +'</div>';

	function get(param){
		this.opts = param;
		this.init();
	}

	S.augment(get,{
		init:function(){
			this._getQuestion();
			this._addEventListener();
		},
		/**
		 * [_addEventListener description]
		 */
		_addEventListener:function(){
			var
				that = this;
			delegate(document,'click',el.submitBtn,function(){
				that._validQuestion();
			});
		},
		/**
		 * [_validQuestion 检查用户余额和是否做完试题]
		 * @return {[type]} [description]
		 */
		_validQuestion:function(){
			var
				that = this,
				questionId = $(el.questionId).val(),
				data = {questionId:questionId},
				answerStr = $("input[name='option']:checked").val(),
				answerVal,
				answer;
			if(answerStr != undefined){
				answerVal = parseInt(answerStr) + 65;
				answer = String.fromCharCode(answerVal);
				window.location.href = that.opts.submitUrl + '/'+ answer + '/' + questionId;
			}else{
				PW.page.Util.dialog.alert('<h1>答案不可以为空</h1>');
			}	
			
		},
		/**
		 * [_getQuestion 获取试题]
		 * @return {[type]} [description]
		 */
		_getQuestion:function(){
			var
				that = this,
				questionId = $(el.questionId).val(),
				answer = $(el.answer).val(),
				data = {questionId:questionId};
			ExamIO.preTestGetOneQuestion(data,function(rs){
				if(rs.code == 0){
					that._renderQuestion(rs.data);
				}else{
					PW.page.Util.dialog.alert('<h1>'+rs.errMsg+'</h1>');
				}
			});
		},
		/**
		 * [_renderQuestion 渲染题目的详细信息]
		 * @param {[type]} [data] [返回的问题信息]
		 * @return {[type]} [description]
		 */
		_renderQuestion:function(data){
			var
				that = this,
				questionHtml = that._createHtml(data);
			$(el.questionHolder).append(questionHtml);
		},
		/**
		 * [_createHtml 生成问题的html]
		 * @param  {[type]} data [返回的问题的信息]
		 * @return {[type]}      [生成的html]
		 */
		_createHtml:function(data){
			var
				html = Juicer(QUESTION_HTML,data);
			return html;
		}
	});

	return get;
},{
	requires:['mod/juicer','io/exam','core','page/common/util']
});
/*--------------------------------退出------------------------------*/
KISSY.add('preExamTest/exit',function(S){
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
KISSY.add('preExamTest/click',function(S){
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
KISSY.add('preExamTest/index',function(S){
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