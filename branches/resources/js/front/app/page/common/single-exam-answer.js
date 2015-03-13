/*-----------------------------------------------------------------------------
* @Description:     前台单项测试查看答案页面操作公共部分
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.20
* ==NOTES:=============================================
* v1.0.0(2014.03.20):
*     前台单项测试查看答案页面操作公共部分
* --------------------------------------------------------------------------*/
KISSY.add('page/common/single-exam-answer',function(S,ExamManage,error,click,index){
	PW.namespace('page.common.SingleAnswer');
	PW.page.common.SingleAnswer = function(param, IO){
		new ExamManage(param, IO);
		new error(param, IO);
		new click(param);
		new index();
	}
},{
	requires:['singleExamAnswer/getAndNum','singleExamAnswer/error','singleExamAnswer/click','singleExamAnswer/index']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('singleExamAnswer/getAndNum',function(S,Juicer){
	var
		DOM = S.DOM, on = S.Event.on, $ = S.all,IO = S.Event.IO, delegate = S.Event.delegate,
		el = {
			questionId:'.J_questionId',//指向当前题目的题号
			questionHolder:'.J_questionContent',//指向问题html的holder
			//选中的题目范围
			focusRangeTrigger:'.page-gray',
			//总题目数目
			questionNum:'.J_examnum',
			//单项题数展示模块
			singleNumHolder:'.single-page',
			//题目组范围展示模块
			rangeNumHolder:'.group-page',
			//当前题号
			currentNum: '.J_currentNum',
			//下一题
			nextTrigger: '.J_next',
			//上一题
			prevTrigger: '.J_prev',
			//考题详细模块
			examInfoHolder:'.J_examInfo'
		},
		CLASS_TYPE={
			//当前答题样式
			focus: 'page-gray',
			//正确答题样式
			rightMark: 'page-red',
			//标记题目样式
			errorMark: 'page-green',
			//灰色按钮
			grayBtn:'btn-gray',
			//蓝色按钮
			blueBtn: 'btn-blue'
		},
		SINGLE_ID_HTML = 'data-single-id',
		RANGE_START = 'data-start-id',
		RANGE_END = 'data-end-id',
		//初始单项题目数字
		INIT_QUESTION_NUM = 1,
		//题目号组题目范围数字
		QUESTION_RANGE_NUM = 20,
		//大题数html
		QUESTION_NUM_RANGE_HTML ='<a href="javaScript:;" data-end-id="&{endId}" data-start-id="&{startId}">&{questionRange}</a>',
		QUESTION_NUM_SINGLE_HTML= '<a href="javaScript:;" data-single-id="&{questionSingle}">&{questionSingle}</a>',
		QUESTION_HTML = '<div class="J_examInfo" style="float:left;width:100%;">'+
						'<input type="hidden" value="&{questionId}" class="J_questionId" />'+
            			'<table class="exam-table">'+
                		'<thead><tr>'+
                        '<th colspan ="2">&{sourceMessage}<a href="#" class="J_errorBtn">题目纠错</a></th>'+
                    	'</tr>'+
                		'</tr></thead>'+
                		'<tbody>'+
                    	'<tr class="exam-content">'+
                        '<td>题目</td>'+
                        '<td>'+
                        '<div>&{questionContent}</div>'+
                        '</td>'+
                    	'</tr>'+
                    	'<tr class="exam-options">'+
                        '<td>选项</td>'+
                        '<td>'+
                        '<ol>'+
                        '{@each questionOptions as q,index}'+
			            '<li data="holder" {@if userAnswer == index} class="checked" {@/if} >'+
			            '<input type="radio" name="option" {@if userAnswer == index} checked {@/if} value="&{index}" data="holder"/>'+
			            '<label>&{q}</label>'+
			            '</li>'+
			            '{@/each}'+
                        '</ol>'+
                        '</td>'+
                    	'</tr>'+
                    	'<tr class="exam-answer">'+
                        '<td>正确答案</td>'+
                        '<td>&{rightAnswer}</td>'+
                    	'</tr>'+
                    	'<tr class="exam-analysis">'+
                        '<td>答案解析</td>'+
                        '<td><div>&{questionAnalysis }</div></td>'+
                    	'</tr>'+
                		'</tbody></table>'+
            			'<div class="exam-btn">'+
                		'<button class="btn btn-blue btn-short J_prev">上一题</button>'+
                		'<button class="btn btn-blue btn-short J_next">下一题</button>'+
            			'</div>'+
        				'</div>';
	function ExamManage(param,IO){
		this.opts = param;
		this.ExamIO = IO;
		//是否提交标识
		this._hasSubmit;
		this.init();
	}

	S.augment(ExamManage,{
		init:function(){
			//初始化题数设置
			this._initExamNum();
			//获取第一题题目答案
			this._getQuestionAnswer(INIT_QUESTION_NUM);
			this._addEventListener();
			
		},
		/**
		 * [_addEventListener description]
		 */
		_addEventListener:function(){
			var
				that = this;
			//点击题数组重新设置单题数
			delegate(el.rangeNumHolder,'click','a',function(evt){
				that._resetRangeHtml(evt);
			});
			//点击单题数触发事件
			delegate(el.singleNumHolder,'click','a',function(evt){
				that._getSingleQuestion(evt);
			});
			//获取下一题
			delegate(document, 'click',el.nextTrigger, function(evt){
				that._getNextQuestion(evt);
			});
			//获取上一题
			delegate(document, 'click', el.prevTrigger, function(evt){
				that._getPrevQuestion(evt);
			});
		},
		/**
		 * 获取下一题
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		_getNextQuestion: function(evt){
			var
				that = this,
				currentStr = DOM.val(el.currentNum),
				currentIndex = parseInt(currentStr),
				rangeEndStr = $(el.rangeNumHolder).children(el.focusRangeTrigger).attr(RANGE_END),
				rangeEnd = parseInt(rangeEndStr),
				nextIndex = currentIndex + 1;
			that._getQuestionAnswer(nextIndex);
			//如果获取下一题时题目数为这一组题目的最后一个，则重绘题目信息
			if(currentIndex == rangeEnd){
				that._createSingleHtml(nextIndex, nextIndex + QUESTION_RANGE_NUM - 1);
				that._questionNumCss(nextIndex);
			}
		},
		/**
		 * 获取上一题
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		_getPrevQuestion: function(evt){
			var
				that = this,
				currentStr = DOM.val(el.currentNum),
				currentIndex = parseInt(currentStr),
				rangeStartStr = $(el.rangeNumHolder).children(el.focusRangeTrigger).attr(RANGE_START),
				rangeStart = parseInt(rangeStartStr),
				prevIndex = currentIndex - 1;
			that._getQuestionAnswer(prevIndex);
			//如果获取下一题时题目数为这一组题目的最后一个，则重绘题目信息
			if(currentIndex == rangeStart){
				that._createSingleHtml(prevIndex - QUESTION_RANGE_NUM + 1, prevIndex);
				that._questionNumCss(prevIndex);
			}
		},
		/**
		 * [_getQuestion 获取试题]
		 * @return {[type]} [description]
		 */
		_getQuestionAnswer:function(index){
			var
				that = this,
				answer,
				data = {questionId: index};
			that.ExamIO.getOneAnswer(data,function(rs){
				if(rs.code == 0){
					answer = rs.data.userAnswer;
					//如果存在用户答案
					if(answer != undefined){
						rs.data.userAnswer = answer.charCodeAt(0) - 65;
					}
					DOM.remove(el.examInfoHolder);
					that._renderQuestion(rs.data);
					//设置获取题目按钮的操作
					that._setBtnHandler(index);
					//设置当前单项题答案样式
					that._focusSingleCss(index);
					DOM.val(el.currentNum, index);
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
		},
		/**
		 * 点击重新设置单题数
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		_resetRangeHtml: function(evt){
			var
				that = this,
				target = evt.target,
				startId = DOM.attr(target, RANGE_START),
				endId = DOM.attr(target, RANGE_END);
			DOM.removeClass(el.rangeNumHolder + ' a', CLASS_TYPE.focus);
			DOM.addClass(target, CLASS_TYPE.focus);
			that._createSingleHtml(parseInt(startId), parseInt(endId));
		},
		/**
		 * 根据当前题目设置上一题下一题以及提交按钮的操作
		 * @param {[type]} qid [description]
		 */
		_setBtnHandler: function(qid){
			var
				that = this,
				totalNum = DOM.val(el.questionNum);
			if(qid == 1){
				that._abledNextBtn();
				that._disabledPrevBtn();
				
			}else if(qid == totalNum){
				that._abledPrevBtn();
				that._disabledNextBtn();
			}else{
				that._abledPrevBtn();
				that._abledNextBtn();
			}
		},
		/**
		 * 点击题号获取题目信息
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		_getSingleQuestion: function(evt){
			var
				that = this,
				target = evt.target,
				questionNum = DOM.attr(target, SINGLE_ID_HTML);
			that._getQuestionAnswer(questionNum);
		},
		/**
		 * 初始化题数设置模块
		 * @return {[type]} [description]
		 */
		_initExamNum:function(){
			var
				that = this,
				questionNum = DOM.val(el.questionNum),
				startIndex = INIT_QUESTION_NUM,
				endIndex;
			if(parseInt(questionNum / QUESTION_RANGE_NUM) == 0){
				endIndex = questionNum % QUESTION_RANGE_NUM;
			}else{
				endIndex = INIT_QUESTION_NUM + QUESTION_RANGE_NUM - 1;
			}
			that._createSingleHtml(startIndex, endIndex);
			that._createRangeHtml(questionNum);
			that._questionNumCss(INIT_QUESTION_NUM);
		},
		/**
		 * 创建单项题数模块
		 * @param  {[type]} firstNum [description]
		 * @return {[type]}          [description]
		 */
		_createSingleHtml: function(firstNum, endNum){
			var
				that = this,
				num,
				singleHtml = '',
				singleId = 0;
			for(num = 0;num <=(endNum - firstNum); num++){
				singleId = firstNum + num;
				singleHtml = singleHtml + Juicer(QUESTION_NUM_SINGLE_HTML, {questionSingle: singleId});
			}
			$(el.singleNumHolder).empty();
			$(el.singleNumHolder).append(singleHtml);
		},
		/**
		 * 创建题目组范围模块
		 * @param  {[type]} totalNum [description]
		 * @return {[type]}          [description]
		 */
		_createRangeHtml: function(totalNum){
			var
				that = this,
				RangeNum,
				remainderNum = 0,
				num,
				rangeNumHtml='',
				rangeStr='';
			if(totalNum % QUESTION_RANGE_NUM == 0){
				RangeNum = parseInt(totalNum/QUESTION_RANGE_NUM);
			}else{
				RangeNum = parseInt(totalNum/QUESTION_RANGE_NUM);
				//剩余范围数目
				remainderNum = totalNum % QUESTION_RANGE_NUM;
			}
			for(num = 0; num < RangeNum; num++){
				var firstNum,
					endNum;
				firstNum = num * QUESTION_RANGE_NUM + 1;
				endNum = (num + 1) * QUESTION_RANGE_NUM;
				rangeStr = firstNum + '-' + endNum;
				rangeNumHtml = rangeNumHtml + Juicer(QUESTION_NUM_RANGE_HTML,{questionRange: rangeStr, startId: firstNum, endId: endNum});
			}
			if(remainderNum != 0){
				var firstNum,
					endNum;
				firstNum = RangeNum * QUESTION_RANGE_NUM + 1;
				endNum = firstNum + remainderNum - 1;
				rangeStr = firstNum + '-' + endNum;
				rangeNumHtml = rangeNumHtml + Juicer(QUESTION_NUM_RANGE_HTML,{questionRange: rangeStr, startId: firstNum, endId: endNum});
			}
			$(el.rangeNumHolder).empty();
			$(el.rangeNumHolder).append(rangeNumHtml);
		},
		/**
		 * 初始化题目样式
		 * 包括题目组样式和单题号样式
		 * @return {[type]} [description]
		 */
		_questionNumCss: function(index){
			var
				that = this;
			that._focusSingleCss(index);
			that._focusRangeCss(index);
			//添加单项试题标示的样式
			that._markSingleCss();
		},
		/**
		 * 标示单项试题的各个样式
		 * @return {[type]} [description]
		 */
		_markSingleCss:function(){
			var
				that = this,
				rangeA = DOM.get(el.focusRangeTrigger, el.rangeNumHolder),
				startId = DOM.attr(rangeA, RANGE_START),
				endId = DOM.attr(rangeA, RANGE_END);
			that.ExamIO.getAnswerIndexInfo({startNum: startId, endNum:endId}, function(rs){
				if(rs.code == 0){
					//为正确题目添加样式
					S.each(rs.data.rList, function(item){
						that._rightSingleCss(item);
					});
					//为错误题目添加样式
					S.each(rs.data.wList, function(item){
						that._errorSingleCss(item);
					});
				}
			});
		},
		/**
		 * 当前选中单题号样式
		 * @param  {[type]} qid [description]
		 * @return {[type]}     [description]
		 */
		_focusSingleCss: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				DOM.removeClass(item, CLASS_TYPE.focus);
				if(singleId == qid){
					// DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.focus);
				}
			});
		},
		/**
		 * 打错题目单题号样式
		 * @param  {[type]} qid [description]
		 * @return {[type]}     [description]
		 */
		_errorSingleCss: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				if(singleId == qid){
					DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.errorMark);
				}
			});
		},
		/**
		 * 添加答对题题目样式
		 * @param  {[type]} qid [description]
		 * @return {[type]}     [description]
		 */
		_rightSingleCss: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				if(singleId == qid){
					DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.rightMark);
				}
			});
		},
		/**
		 * 选中当前题目所在范围样式
		 * @return {[type]} [description]
		 */
		_focusRangeCss: function(qid){
			var
				that = this,
				ranges = DOM.query(el.rangeNumHolder+' a'),
				startId, endId;
			S.each(ranges, function(item){
				startId = DOM.attr(item, RANGE_START);
				endId = DOM.attr(item, RANGE_END);
				DOM.removeClass(item, CLASS_TYPE.focus);
				if(startId <= qid && endId >= qid){
					// DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.focus);	
				}
			});
		},
		/**
		 * 获取下一题按钮可用
		 * @return {[type]} [description]
		 */
		_abledNextBtn: function(){
			DOM.replaceClass(el.nextTrigger,CLASS_TYPE.grayBtn,CLASS_TYPE.blueBtn);
			DOM.removeAttr(el.nextTrigger,'disabled','disabled');
		},
		/**
		 * 获取下一题按钮不可用
		 * @return {[type]} [description]
		 */
		_disabledNextBtn: function(){
			DOM.replaceClass(el.nextTrigger,CLASS_TYPE.blueBtn,CLASS_TYPE.grayBtn);
			DOM.attr(el.nextTrigger,'disabled','disabled');
		},
		/**
		 * 获取上一题按钮可用
		 * @return {[type]} [description]
		 */
		_abledPrevBtn: function(){
			DOM.replaceClass(el.prevTrigger,CLASS_TYPE.grayBtn,CLASS_TYPE.blueBtn);
			DOM.removeAttr(el.prevTrigger,'disabled','disabled');
		},
		/**
		 * 获取上一题按钮不可用
		 * @return {[type]} [description]
		 */
		_disabledPrevBtn: function(){
			DOM.replaceClass(el.prevTrigger,CLASS_TYPE.blueBtn,CLASS_TYPE.grayBtn);
			DOM.attr(el.prevTrigger,'disabled','disabled');
		}
	});

	return ExamManage;
},{
	requires:['mod/juicer','io/exam','core','page/common/util']
});
/*--------------------------------退出------------------------------*/
KISSY.add('singleExamAnswer/error',function(S){
	var
		DOM = S.DOM, delegate = S.Event.delegate, $ = S.all,
		el = {
			//指向结束答题按钮,
			errorBtn:'.J_errorBtn',
			//当前题号
			currentNum: '.J_currentNum',
			//纠错表单指向
			errorForm: '.J_errorForm'
		};

	function exit(param, IO){
		this.opts = param;
		this.ExamIO = IO;
		this.init();
	}

	S.augment(exit,{
		init:function(){
			this._addEventListener();
		},
		_addEventListener:function(){
			var
				that = this;
			/*点击纠错按钮*/
			delegate(document,'click',el.errorBtn,function(){
				that._openErrorDialog();
			});
		},
		/**
		 * [_openErrorDialog 打开纠错对话框]
		 * @return {[type]} [description]
		 */
		_openErrorDialog:function(){
			var
				that = this,
				questionIndex = $(el.currentNum).val(),
				tip = '<form class="J_errorForm"><textarea name="description" class="error-text"></textarea><input name="questionId" type="hidden" value="'+questionIndex+'"></form>',
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
			that.ExamIO.submitError(data,function(rs){
				if(rs.code != 0){
					PW.page.Util.dialog.alert('<h1>'+rs.errMsg+'</h1>');
				}
			});
		},
	});

	return exit;
},{
	requires:['core','page/common/util']
});
/*--------------------------------点击非白色地方报错------------------------------*/
KISSY.add('singleExamAnswer/click',function(S){
	var
		$ = S.all, DOM = S.DOM, on = S.Event.on,
		el = {
			contentHolder:'.J_content',//指向答题的白色区域,
			focusHolder:'.wrappar'
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
			if($(evt.target).parent(el.focusHolder) != null){
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
KISSY.add('singleExamAnswer/index',function(S){
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
