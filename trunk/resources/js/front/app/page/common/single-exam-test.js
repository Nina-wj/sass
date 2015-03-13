/*-----------------------------------------------------------------------------
* @Description:     前台单项测试答题页面操作公共部分
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.03.20
* ==NOTES:=============================================
* v1.0.0(2014.03.20):
*     前台单项测试答题页面操作公共部分
* v1.0.1(2014.03.17):
* 	  修复了当总题目数小于20时，初始生成题目数和题目范围标签错误的问题	
* --------------------------------------------------------------------------*/
KISSY.add('page/common/single-exam-test',function(S,ExamManage,exit,click,timer,index){
	PW.namespace('page.common.SingleExamTest');
	PW.page.common.SingleExamTest = function(param,IO){
		new ExamManage(param,IO);
		new exit(param);
		new click(param);
		new timer(param);
		new index();
	}
},{
	requires:['SingleExamTest/getAndNum','SingleExamTest/exit','SingleExamTest/click','SingleExamTest/timer','SingleExamTest/index']
});
/*--------------------------------获取题目------------------------------*/
KISSY.add('SingleExamTest/getAndNum',function(S,Juicer){
	var
		DOM = S.DOM, on = S.Event.on, $ = S.all,IO = S.Event.IO, delegate = S.Event.delegate,
		el = {
			questionId:'.J_questionId',//指向当前题目的题号
			answer:'.J_answer',//指向当前题目的答案
			questionHolder:'.J_questionContent',//指向问题html的holder
			submitBtn:'.J_submitBtn',//指向提交按钮,
			//总题目数目
			questionNum:'.J_examnum',
			//单项题数展示模块
			singleNumHolder:'.single-page',
			//题目组范围展示模块
			rangeNumHolder:'.group-page',
			//当前题号
			currentNum: '.J_currentNum',
			//标记题目模块
			markHolder:'.exam-mark',
			//标记本题
			marked: '#mark',
			//下一题
			nextTrigger: '.J_next',
			//上一题
			prevTrigger: '.J_prev',
			//考题详细模块
			examInfoHolder:'.J_examInfo',
			//用户计时器
			userTimer: '.J_usetime'
		},
		CLASS_TYPE={
			//当前答题样式
			focus: 'page-gray',
			//完成答题样式
			finished: 'page-red',
			//标记题目样式
			mark: 'page-green',
			//灰色按钮
			grayBtn:'btn-gray',
			//蓝色按钮
			blueBtn: 'btn-blue',
			//警告未答题样式
			warm: 'page-warm'
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
            			'<table class="exam-table">'+
                		'<thead><tr>'+
                        '<th colspan ="2">&{questionSource}</th>'+
                    	'</tr></thead>'+
                		'<tbody>'+
                    	'<tr class="exam-content">'+
                        '<td>题目</td>'+
                        '<td>'+
                        '<div>&{sourceMessage}</div>'+
                        '</td>'+
                    	'</tr>'+
                    	'<tr class="exam-options">'+
                        '<td>选项</td>'+
                        '<td>'+
                        '<ol>'+
                        '{@each questionOptions as q,index}'+
			            '<li data="holder">'+
			            '<input type="radio" name="option" {@if userAnswer == index} checked {@/if} value="&{index}" data="holder"/>'+
			            '<label>&{q}</label>'+
			            '</li>'+
			            '{@/each}'+
                        '</ol>'+
                        '</td>'+
                    	'</tr>'+
                		'</tbody></table>'+
            			'<div class="exam-widget clearfix">'+
                		'<a href="#" class="exit-exam J_exitBtn">结束答题</a>'+
                		'<div class="other-widget">'+
                    	'<div class="exam-mark">'+
                        '<input type="checkbox" name="mark" id="mark"/>'+
                        '<label for="mark">标记本题（作答时存在不确定做标记待后续检查）</label>'+
                    	'</div>'+
                    	'<span>难度系数：&{difficulty}</span>'+
                		'</div>'+
            			'</div>'+
            			'<div class="exam-btn">'+
                		'<button class="btn btn-blue btn-short J_prev">上一题</button>'+
                		'<button class="btn btn-blue btn-short J_next">下一题</button>'+
                		'<button class="btn btn-blue btn-short J_submitBtn">提交</button>'+
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
			//标记题目的数组
			this._marked = [];
			//未完成的题目的数组
			this._unFinished = [];
			//是否提交标识，提交后更新为1
			this._hasSubmit = 0;
			this._getQuestion('-1', 1, '-1');
			//初始化题数设置
			this._initExamNum();
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
			//点击题数组重新设置单题数
			delegate(el.rangeNumHolder,'click','a',function(evt){
				that._resetRangeHtml(evt);
			});
			//点击单题数触发事件
			delegate(el.singleNumHolder,'click','a',function(evt){
				that._getSingleQuestion(evt);
			});
			//标记题目
			delegate(document, 'click', el.marked, function(evt){
				that._markQuestion(evt);
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
				answerStr = $("input[name='option']:checked").val(),
				answerVal,
				currentStr = DOM.val(el.currentNum),
				currentIndex = parseInt(currentStr),
				answer;
			if(answerStr == undefined){
				that._getQuestion(currentIndex,currentIndex+1,'-1');
				//如果该题目没有被标记，则标记为未答题目
				if(that._isMarkSingle(currentIndex) == 0){
					that._removeAllClass(currentIndex);
					//记录未完成题目数组
					that._unFinished.push(currentIndex);
				}
			}else{
				//获取选择的答案，并转换为大写字母
				answerVal = parseInt(answerStr) + 65;
				answer = String.fromCharCode(answerVal);
				that._getQuestion(currentIndex,currentIndex+1,answer);
				//如果当前题目不是标记题目，则修改为完成题目样式
				if(that._isMarkSingle(currentIndex) == 0){
					var unfinIndex = S.indexOf(currentIndex, that._unFinished);
					//如果该题不是第一次回答并选择了答案，则从未完成数组中删除该项
					if(unfinIndex != -1){
						that._unFinished.splice(unfinIndex, 1);
					}
					that._finishedSingleCss(currentIndex);
					//如果已经点击提交后，判断是否去掉红色标记
					if(that._hasSubmit == 1){
						that._warmUnFinished(that._unFinished);
					}
				}
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
				answerStr = $("input[name='option']:checked").val(),
				answerVal,
				currentStr = DOM.val(el.currentNum),
				currentIndex = parseInt(currentStr),
				answer;
			if(answerStr == undefined){
				that._getQuestion(currentIndex,currentIndex - 1,'-1');
				//如果该题目没有被标记，则标记为未答题目
				if(that._isMarkSingle(currentIndex) == 0){
					that._removeAllClass(currentIndex);
					//记录未完成题目数组
					that._unFinished.push(currentIndex);
				}
			}else{
				//获取选择的答案，并转换为大写字母
				answerVal = parseInt(answerStr) + 65;
				answer = String.fromCharCode(answerVal);
				that._getQuestion(currentIndex,currentIndex - 1,answer);
				//如果当前题目不是标记题目，则修改为完成题目样式
				if(that._isMarkSingle(currentIndex) == 0){
					var unfinIndex = S.indexOf(currentIndex, that._unFinished);
					//如果该题不是第一次回答并选择了答案，则从未完成数组中删除该项
					if(unfinIndex != -1){
						that._unFinished.splice(unfinIndex, 1);
					}
					that._finishedSingleCss(currentIndex);
					//如果已经点击提交后，判断是否去掉红色标记
					if(that._hasSubmit == 1){
						that._warmUnFinished(that._unFinished);
					}
				}
			}
		},
		/**
		 * 提交保存信息操作
		 * @return {[type]} [description]
		 */
		_saveLastQuestion: function(data){
			var
				that = this,
				userTimer = DOM.html(el.userTimer);
			that.ExamIO.validQuestion(data,function(rs){
				//提交成功后提示消费豆数并跳转页面
				if(rs.code == 0){
					PW.page.Util.dialog.alert('<h1>总共消费豆数为：'+rs.data.howMuchBalanceCounts+'个</h1>',function(){
						window.location.href = that.opts.submitUrl+'?time='+userTimer;
					});
				//当用户豆数不足时，提示信息并跳转到充值页面
				}else if(rs.code == 2){
					PW.page.Util.dialog.alert('<h1>'+rs.data.caution+'个</h1>',function(){
						window.location.href = that.opts.rechargeBalanceUrl;
					});
				//当用户未打完题目时，提示用户未答完题目信息
				}else if(rs.code == 3){
					that._warmUnFinished(rs.data.withoutAnsweredQuestionList);
					that._unFinished = rs.data.withoutAnsweredQuestionList;
				//提交错误提示错误信息
				}else{
					PW.page.Util.dialog.alert('<h1>'+rs.data.errMsg +'个</h1>');
				}
				//更新提交标识为1，标识已经提交过用户信息
				that._hasSubmit = 1;
			});
		},
		/**
		 * [_validQuestion 检查用户余额和是否做完试题]
		 * @return {[type]} [description]
		 */
		_validQuestion:function(){
			var
				that = this,
				answerStr = $("input[name='option']:checked").val(),
				answerVal,
				currentStr = DOM.val(el.currentNum),
				currentIndex = parseInt(currentStr),
				answer;
			//发送最后一题的答案
			if(answerStr == undefined){
				that._saveLastQuestion({answer: '-1', questionId:currentIndex});
				//如果该题目没有被标记，则标记为未答题目
				if(that._isMarkSingle(currentIndex) == 0){
					that._removeAllClass(currentIndex);
					//记录未完成题目数组
					that._unFinished.push(currentIndex);
				}
			}else{
				//获取选择的答案，并转换为大写字母
				answerVal = parseInt(answerStr) + 65;
				answer = String.fromCharCode(answerVal);
				that._saveLastQuestion({answer: answer, questionId:currentIndex});
				//如果当前题目不是标记题目，则修改为完成题目样式
				if(that._isMarkSingle(currentIndex) == 0){
					var unfinIndex = S.indexOf(currentIndex, that._unFinished);
					//如果该题不是第一次回答并选择了答案，则从未完成数组中删除该项
					if(unfinIndex != -1){
						that._unFinished.splice(unfinIndex, 1);
					}
					that._finishedSingleCss(currentIndex);
					//如果已经点击提交后，判断是否去掉红色标记
					if(that._hasSubmit == 1){
						that._warmUnFinished(that._unFinished);
					}
				}
			}
		},
		/**
		 * [_getQuestion 获取试题]
		 * @return {[type]} [description]
		 */
		_getQuestion:function(currentIndex, nextIndex, answerVal){
			var
				that = this,
				answer,
				data = {questionId: currentIndex,nextQuestionId: nextIndex, answer:answerVal};
			that.ExamIO.getOneQuestion(data,function(rs){
				if(rs.code == 0){
					answer = rs.data.userAnswer;
					//如果存在用户答案
					if(answer != undefined){
						rs.data.userAnswer = answer.charCodeAt(0) - 65;
					}
					DOM.remove(el.examInfoHolder);
					that._renderQuestion(rs.data);
					//设置获取题目按钮的操作
					that._setBtnHandler(nextIndex);
					if(currentIndex != 1000 && currentIndex != 0){
						that._focusSingleCss(nextIndex);
						// that._focusRangeCss(nextIndex);
						//将当前题号修改为nextIndex
						DOM.val(el.currentNum, nextIndex);
					}
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
		 * 提交时警告有未答题目
		 * @param  {[type]} data [伟大题目编号]
		 * @return {[type]}      [description]
		 */
		_warmUnFinished: function(data){
			var
				that = this,
				ranges = DOM.query(el.rangeNumHolder+' a'),
				startId, endId;
			S.each(ranges, function(item){
				startId = DOM.attr(item, RANGE_START);
				endId = DOM.attr(item, RANGE_END);
				DOM.removeClass(item, CLASS_TYPE.warm);
				S.each(data, function(singleItem){
					if(startId <= singleItem && endId >= singleItem){
						DOM.removeAttr(item, 'class');
						DOM.addClass(item, CLASS_TYPE.warm);	
					}
				});
			});
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
			if(qid == 0 || qid == 1){
				that._abledNextBtn();
				that._disabledPrevBtn();
				that._disabledsubmitBtn();
				
			}else if(qid == totalNum){
				that._abledPrevBtn();
				that._disabledNextBtn();
				that._abledSubmitBtn();
			}else{
				that._abledPrevBtn();
				that._abledNextBtn();
				that._disabledsubmitBtn();
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
				answerStr = $("input[name='option']:checked").val(),
				answerVal,
				currentStr = DOM.val(el.currentNum),
				currentIndex = parseInt(currentStr),
				answer,
				questionNum = DOM.attr(target, SINGLE_ID_HTML);
			DOM.val(el.currentNum, questionNum);
			DOM.removeClass(el.singleNumHolder + ' a', CLASS_TYPE.focus);
			DOM.addClass(target, CLASS_TYPE.focus);
			if(answerStr == undefined){
				that._getQuestion(currentIndex, questionNum,'-1');
				//如果该题目没有被标记，则标记为未答题目
				if(that._isMarkSingle(currentIndex) == 0){
					that._removeAllClass(currentIndex);
					//记录未完成题目数组
					that._unFinished.push(currentIndex);
				}
			}else{
				//获取选择的答案，并转换为大写字母
				answerVal = parseInt(answerStr) + 65;
				answer = String.fromCharCode(answerVal);
				that._getQuestion(currentIndex,questionNum,answer);
				//如果当前题目不是标记题目，则修改为完成题目样式
				if(that._isMarkSingle(currentIndex) == 0){
					var unfinIndex = S.indexOf(currentIndex, that._unFinished);
					//如果该题不是第一次回答并选择了答案，则从未完成数组中删除该项
					if(unfinIndex != -1){
						that._unFinished.splice(unfinIndex, 1);
					}
					//添加已完成样式
					that._finishedSingleCss(currentIndex);
					//如果已经点击提交后，判断是否去掉红色标记
					if(that._hasSubmit == 1){
						that._warmUnFinished(that._unFinished);
					}
				}
			}
		},
		/**
		 * 初始化题数设置模块
		 * @return {[type]} [description]
		 */
		_initExamNum:function(){
			var
				that = this,
				questionNum = DOM.val(el.questionNum),
				RangeNum,
				startIndex = INIT_QUESTION_NUM,
				endIndex;
			if(parseInt(questionNum / QUESTION_RANGE_NUM) == 0){
				endIndex = questionNum % QUESTION_RANGE_NUM;
			}else{
				endIndex = INIT_QUESTION_NUM + QUESTION_RANGE_NUM - 1;
			}
			that._createSingleHtml(startIndex, endIndex);
			that._createRangeHtml(questionNum);
			that._questionNumCss();
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
			//为创建的单项题目块添加标示信息
			that._addSingleIndicateHandler(firstNum, endNum);

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
		_questionNumCss: function(){
			var
				that = this;
			that._focusSingleCss(INIT_QUESTION_NUM);
			that._focusRangeCss(INIT_QUESTION_NUM);
		},
		/**
		 * 标示单项题号的样式信息
		 * @param {[type]} fNum [description]
		 * @param {[type]} eNum [description]
		 */
		_addSingleIndicateHandler: function(fNum, eNum){
			var
				that = this,
				currentIndex = DOM.val(el.currentNum);
			//标记已答题目样式
			that._addFinishedIndivate(fNum, eNum);
			//标示当前所答题目样式
			that._focusSingleCss(currentIndex);
			that._addMarkedIndivate();
		},
		/**
		 * 标示以答过题目，标记题目样式信息
		 * @param {[type]} fNum [description]
		 * @param {[type]} eNum [description]
		 */
		_addMarkedIndivate: function(){
			var 
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId = '';
			if(that._marked.length != 0){
				S.each(as, function(item){
					singleId = DOM.attr(item, SINGLE_ID_HTML);
					if(S.inArray(singleId, that._marked)){
						DOM.removeAttr(item, 'class');
						DOM.addClass(item, CLASS_TYPE.mark);
					}
				});
			}
		},
		/**
		 * 标示以答过题目，以答题目样式信息
		 * @param {[type]} fNum [description]
		 * @param {[type]} eNum [description]
		 */
		_addFinishedIndivate: function(fNum, eNum){
			var
				that = this;
			that.ExamIO.getFinishQuestion({startNum: fNum,endNum: eNum}, function(rs){
				if(rs.code == '0'){
					S.each(rs.data.finishQuestionList,function(item){
						that._finishedSingleCss(item);
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
				if(singleId == qid){
					DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.focus);
				}
			});
		},
		/**
		 * 当前标记单题号样式
		 * @param  {[type]} qid [description]
		 * @return {[type]}     [description]
		 */
		_markSingleCss: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				if(singleId == qid){
					DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.mark);
				}
			});
		},
		/**
		 * 添加完成题目样式
		 * @param  {[type]} qid [description]
		 * @return {[type]}     [description]
		 */
		_finishedSingleCss: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				if(singleId == qid){
					DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.finished);
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
				if(startId <= qid && endId >= qid){
					// DOM.removeAttr(item, 'class');
					DOM.addClass(item, CLASS_TYPE.focus);	
				}
			});
		},
		/**
		 * 当前题目是否被标记
		 * @param  {[type]}  qid [description]
		 * @return {Boolean}     [true为被标记，false为不被标记]
		 */
		_isMarkSingle: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId,
				ismark = 0;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				if(singleId == qid && DOM.hasClass(item, CLASS_TYPE.mark)){
					ismark = 1;
				}
			});
			return ismark;
		},
		/**
		 * 移除所有样式，变为未答题目
		 * @param  {[type]} qid [description]
		 * @return {[type]}     [description]
		 */
		_removeAllClass: function(qid){
			var
				that = this,
				as = DOM.query(el.singleNumHolder+' a'),
				singleId;
			S.each(as, function(item){
				singleId = DOM.attr(item, SINGLE_ID_HTML);
				if(singleId == qid){
					DOM.removeAttr(item, 'class');
				}
			});
		},
		/**
		 * 标识当前题目
		 * @param  {[type]} evt [description]
		 * @return {[type]}     [description]
		 */
		_markQuestion: function(evt){
			var
				that = this,
				target = evt.target,
				currentIndex = $(el.currentNum).val();
			if(DOM.get(target).checked){
				that._markSingleCss(currentIndex);
				that._marked.push(currentIndex);
			}else{
				//删除元素在数组中的位置
				var index = S.indexOf(currentIndex, that._marked);
				that._focusSingleCss(currentIndex);
				that._marked.splice(index, 1);
			}
		},
		/**
		 * 保存最后一题的题目请求
		 * @param  {[type]}   data     [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		_saveLastQuestionIO: function(data,callback){
			var
				that = this;
			that.ExamIO.saveLastQuestion(data,function(rs){
				callback(rs);
			})
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
		},
		/**
		 * 提交按钮可用
		 * @return {[type]} [description]
		 */
		_abledSubmitBtn: function(){
			DOM.replaceClass(el.submitBtn,CLASS_TYPE.grayBtn,CLASS_TYPE.blueBtn);
			DOM.removeAttr(el.submitBtn,'disabled','disabled');
		},
		/**
		 * 提交按钮不可用
		 * @return {[type]} [description]
		 */
		_disabledsubmitBtn: function(){
			DOM.replaceClass(el.submitBtn,CLASS_TYPE.blueBtn,CLASS_TYPE.grayBtn);
			DOM.attr(el.submitBtn,'disabled','disabled');
		}
	});

	return ExamManage;
},{
	requires:['mod/juicer','io/exam','core','page/common/util']
});
/*--------------------------------退出------------------------------*/
KISSY.add('SingleExamTest/exit',function(S){
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
KISSY.add('SingleExamTest/click',function(S){
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
/**************************答题计时器*****************************************/
KISSY.add('SingleExamTest/timer',function(S){
	var
		$ = S.all, DOM = S.DOM, on = S.Event.on,
		el = {
			//答题计时
			useTime:'.J_usetime'
		};
	function timer(param){
		this.opts = param;
		//答题用时计时
		this._timer;
		this._second;
		this._minute;
		this._hour;
		this.init();
	}
	S.augment(timer,{
		init:function(){
			this._second = 0;
			this._minute = 0;
			this._hour = 0;
			this._addEventListener();
		},
		_addEventListener: function(){
			var
				that = this;
			that._timer = setInterval(function(){
				that._showTimer();
			},1000); 
		},
		/**
		 * 显示答题用时时间
		 * @return {[type]} [description]
		 */
		_showTimer: function(){
			var 
				that = this,
				useTimer = '';
			that._second ++;
			if(that._second == 60 && that._minute < 60){
				that._minute ++;
				that._second = 0;
			}else if(that._minute == 60){
				that._hour ++;
				that._minute = 0;
			}
			useTimer = that._hour + '时' + that._minute + '分' + that._second + '秒';
			DOM.html(el.useTime, useTimer);
		}
	});
	return timer;
},{
	requires:['core']
});
/*********************将页面导航页面操作加入到页面****************************/
KISSY.add('SingleExamTest/index',function(S){
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