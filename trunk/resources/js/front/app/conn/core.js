/*-----------------------------------------------------------------------------
* @Description:     此为公务员前台测试版本
* @Version:         1.0.1
* @author:          lijtao(1284663246@qq.com)
* @date             2014.01.15
* ==NOTES:=============================================
* v1.0.0(2014.01.15) :
* 		页面初始生成
* ---------------------------------------------------------------------------*/
KISSY.add(function(S){
	var
		//定义api数据
		apiData = {
			//首页外壳 模块 
			user:[
				['userPwd','front/user/submitModifyPassword','post','用户密码修改'],
				['getTeacherByClass','front/user/score/&{banJiId}','get','通过班级id获取到教师信息'],
				['submitScore','front/user/submitScore','post','提交学生评分'],
				['checkTeacherScore','front/user/viewTeacherScore/&{banJiId}','get','通过班级id获取教师评分']
			],
			login:[
				['mobile','front/login/registerValidate','post','验证电话号码合法性'],
				['submitStudent','front/login/register','post','提交学员注册信息'],
				['loginFormValid','front/login/validateUsernameAndPassword','post','登陆信息验证'],
				['getVerifyCode','front/login/send','get','获取验证码信息']
			],
			exam:[   
				['languageValidBalance','front/study/singleTest/languageUnderstand/firstCheck','post','言语理解测试答题开始验豆请求'],
				['languageTestGetFinishQuestion','front/study/singleTest/languageUnderstand/didList','post','获取言语理解测试某一区间内已完成题目列表'],
				['languageGetAnswerIndexInfo','front/study/singleTest/languageUnderstand/getRightAndWrongQuestionId','post','获取言语理解测试答案某一区间内答题情况'],                       
				['getLanguageTestOneQuestion','front/study/singleTest/languageUnderstand/next','post','获取言语理解测试下一题'],
				['validLanguageTestQuestion','front/study/singleTest/languageUnderstand/check','post','检查用户余额和是否做完言语理解测试试题'],
				['getLanguageTestOneAnswer','front/study/singleTest/languageUnderstand/checkAnswer','post','获取言语理解测试答案'],
				['submitLanguageTestError','front/study/singleTest/languageUnderstand/correct','post','提交言语理解测试纠错'],
			    ['dataValidBalance','front/study/singleTest/resourceAnalysis/firstCheck','post','获取资料分析答题开始验豆请求'],
			    ['dataTestGetFinishQuestion','front/study/singleTest/resourceAnalysis/didList','post','获取资料分析测试某一区间内已完成题目列表'],
				['dataGetAnswerIndexInfo','front/study/singleTest/resourceAnalysis/getRightAndWrongQuestionId','post','获取资料分析答题getDataTestOneAnswer某一区间内答题情况'],
				['getDataTestOneQuestion','front/study/singleTest/resourceAnalysis/next','post','获取资料分析测试下一题'],
				['validDataTestQuestion','front/study/singleTest/resourceAnalysis/check','post','检查用户余额和是否做完资料分析测试试题'],
				['getDataTestOneAnswer','front/study/singleTest/resourceAnalysis/checkAnswer','post','获取资料分析测试答案'],
				['submitDataTestError','front/study/singleTest/resourceAnalysis/correct','post','提交资料分析测试纠错'],
				['mathValidBalance','front/study/singleTest/numberRelation/firstCheck','post','获取数量关系答题开始验豆请求'],
			    ['mathTestGetFinishQuestion','front/study/singleTest/numberRelation/didList','post','获取数量关系测试某一区间内已完成题目列表'],
				['mathGetAnswerIndexInfo','front/study/singleTest/numberRelation/getRightAndWrongQuestionId','post','获取数量关系答题getDataTestOneAnswer某一区间内答题情况'],
				['getMathTestOneQuestion','front/study/singleTest/numberRelation/next','post','获取数量关系测试下一题'],
				['validMathTestQuestion','front/study/singleTest/numberRelation/check','post','检查用户余额和是否做完数量关系测试试题'],
				['getMathTestOneAnswer','front/study/singleTest/numberRelation/checkAnswer','post','获取数量关系测试答案'],
				['submitMathTestError','front/study/singleTest/numberRelation/correct','post','提交数量关系测试纠错'],
				['logicValidBalance','front/study/singleTest/judgeInference/firstCheck','post','获取判断推理答题开始验豆请求'],
			    ['logicTestGetFinishQuestion','front/study/singleTest/judgeInference/didList','post','获取判断推理测试某一区间内已完成题目列表'],
				['logicGetAnswerIndexInfo','front/study/singleTest/judgeInference/getRightAndWrongQuestionId','post','获取判断推理答题getDataTestOneAnswer某一区间内答题情况'],
				['getLogicTestOneQuestion','front/study/singleTest/judgeInference/next','post','获取判断推理测试下一题'],
				['validLogicTestQuestion','front/study/singleTest/judgeInference/check','post','检查用户余额和是否做完判断推理测试试题'],
				['getLogicTestOneAnswer','front/study/singleTest/judgeInference/checkAnswer','post','获取判断推理测试答案'],
				['submitLogicTestError','front/study/singleTest/judgeInference/correct','post','提交判断推理测试纠错'],
				['knlgValidBalance','front/study/singleTest/commonsenseJudge/firstCheck','post','常识判断测试答题开始验豆请求'],
				['knlgTestOneQuestion','front/study/singleTest/commonsenseJudge/next','post','获取常识判断测试下一题'],
				['validknlgTestQuestion','front/study/singleTest/commonsenseJudge/check','post','检查用户余额和是否做完常识判断测试试题'],
				['knlgTestGetFinishQuestion','front/study/singleTest/commonsenseJudge/didList','post','获取常识判断测试某一区间内已完成题目列表'],
				['knlgGetAnswerIndexInfo','front/study/singleTest/commonsenseJudge/getRightAndWrongQuestionId','post','获取常识判断测试答案某一区间内答题情况'],
				['knlgTestGetOneAnswer','front/study/singleTest/commonsenseJudge/checkAnswer','post','获取常识判断测试答案'],
				['submitKnlgTestError','front/study/singleTest/commonsenseJudge/correct','post','提交常识判断测试纠错'],
				//学前测试
				['preTestGetOneQuestion','front/study/proschoolTest/showQuestion','post','学前测试获取下一题'],
				['preTestGetOneAnswer','front/study/proschoolTest/submitQuestion','post','学前测试获取答案'],
				['preTestSubmitError','front/study/proschoolTest/correct','post','学前测试提交纠错'],
				//单项练习
				['languageValidBalance','front/study/singleTest/commonsenseJudge/firstCheck','post','言语理解测试答题开始验豆请求'],
				['getLanguageExercisOneQuestion','front/study/singlePractice/languageUnderstand/next','post','获取言语理解练习下一题'],
				['validLanguageExercisQuestion','front/study/singlePractice/languageUnderstand/check','get','检查用户余额和是否做完言语理解练习试题'],
				['getLanguageExercisOneAnswer','front/study/singlePractice/languageUnderstand/submitQuestion','post','获取言语理解练习答案'],
				['submitLanguageExercisError','front/study/singlePractice/languageUnderstand/correct','post','提交言语理解练习纠错'],
				['getDataExercisOneQuestion','front/study/singlePractice/resourceAnalysis/next','post','获取资料分析练习下一题'],
				['validDataExercisQuestion','front/study/singlePractice/resourceAnalysis/check','get','检查用户余额和是否做完资料分析练习试题'],
				['getDataExercisOneAnswer','front/study/singlePractice/resourceAnalysis/submitQuestion','post','获取资料分析练习答案'],
				['submitDataExercisError','front/study/singlePractice/resourceAnalysis/correct','post','提交资料分析练习纠错'],
				['getMathExercisOneQuestion','front/study/singlePractice/numberRelation/next','post','获取数量关系练习下一题'],
				['validMathExercisQuestion','front/study/singlePractice/numberRelation/check','get','检查用户余额和是否做完数量关系练习试题'],
				['getMathExercisOneAnswer','front/study/singlePractice/numberRelation/submitQuestion','post','获取数量关系练习答案'],
				['submitMathExercisError','front/study/singlePractice/numberRelation/correct','post','提交数量关系练习纠错'],
				['getLogicExercisOneQuestion','front/study/singlePractice/judgeInference/next','post','获取判断推理练习下一题'],
				['validLogicExercisQuestion','front/study/singlePractice/judgeInference/check','get','检查用户余额和是否做完判断推理练习试题'],
				['getLogicExercisOneAnswer','front/study/singlePractice/judgeInference/submitQuestion','post','获取判断推理练习答案'],
				['submitLogicExercisError','front/study/singlePractice/judgeInference/correct','post','提交判断推理练习纠错'],
				['getKnowledgeExercisOneQuestion','front/study/singlePractice/commonsenseJudge/next','post','获取常识判断练习下一题'],
				['validKnowledgeExercisQuestion','front/study/singlePractice/commonsenseJudge/check','get','检查用户余额和是否做完常识判断练习试题'],
				['getKnowledgeExercisOneAnswer','front/study/singlePractice/commonsenseJudge/submitQuestion','post','获取常识判断练习答案'],
				['submitKnowledgeExercisError','front/study/singlePractice/commonsenseJudge/correct','post','提交常识判断练习纠错'],
				//综合测试
				['synthesizeTestValidSubmit','front/groupQuestionTest/ComprehensiveTestController/sumbitAnswer','post','综合测试提交题目验证请求'],
				['synthesizeTestGetQuestion','front/groupQuestionTest/ComprehensiveTestController/saveAnswer/&{previousIndex}/&{nextIndex}/&{answer}','get','综合测试获取题目请求'],
				['synThestTestGetFinishQuestion','front/groupQuestionTest/ComprehensiveTestController/finishQuestionList/&{startNum}/&{endNum}','get','获取综合测试某一区间内已完成题号'],
				['synthesizeGetOneAnswer','front/groupQuestionTest/ComprehensiveTestController/showRightAnswer/&{index}','post','综合测试获取题目答案信息'],
				['synSaveLastQuestion','front/groupQuestionTest/ComprehensiveTestController/saveLastAnswer/&{answer}','get','保存综合测试最后一题请求'],
				['synthsizeGetAnswerIndexInfo','front/groupQuestionTest/ComprehensiveTestController/RListAndWList','get','综合测试获取答题信息情况'],
				['synthesizeSubmitError','front/groupQuestionTest/ComprehensiveTestController/IWannaCorrect/&{index}','post','综合测试提交纠错'],
				['synValidBalance','front/groupQuestionTest/ComprehensiveTestController/clickAnswerButton','get','综合测试开始答题验证用户持豆信息'],
				//模拟题
				['modelValidBalance','front/groupQuestionTest/ZhenTiOrMoNiTi/checkUserBalance','get','模拟题开始答题验证用户持豆信息'],
				['modelValidSubmit','front/groupQuestionTest/ZhenTiOrMoNiTi/sumbitAnswer','post','模拟题提交验证题目请求'],
				['modelGetQuestion','front/groupQuestionTest/ZhenTiOrMoNiTi/saveAnswer/&{previousIndex}/&{nextIndex}/&{answer}','post','模拟题测试获取题目请求'],
				['modelGetFinishQuestion','front/groupQuestionTest/ZhenTiOrMoNiTi/finishQuestionList/&{startNum}/&{endNum}','get','模拟题获取根据题目区间完成题目列表'],
				['modelSaveLastQuestion','front/groupQuestionTest/ZhenTiOrMoNiTi/saveLastAnswer/&{answer}','get','模拟题保存测试最后一题答案'],
				['modelGetAnswerIndexInfo','front/groupQuestionTest/ZhenTiOrMoNiTi/RListAndWList/&{startNum}/&{rightNum}','get','模拟题答案页获取某一区间内答题信息列表'],
				['modelGetOneAnswer','front/groupQuestionTest/ZhenTiOrMoNiTi/showRightAnswer/&{index}','post','模拟题获取答案请求'],
				['modelSubmitError','front/groupQuestionTest/ZhenTiOrMoNiTi/IWannaCorrect/&{index}','post','模拟题提交纠错'],
				//历年真题
				['realValidBalance','front/groupQuestionTest/ZhenTiOrMoNiTi/checkUserBalance','get','历年真题开始答题验证用户持豆信息'],
				['realValidSubmit','front/groupQuestionTest/ZhenTiOrMoNiTi/sumbitAnswer','post','历年真题提交验证题目请求'],
				['realGetQuestion','front/groupQuestionTest/ZhenTiOrMoNiTi/saveAnswer/&{previousIndex}/&{nextIndex}/&{answer}','post','历年真题测试获取题目请求'],
				['realGetFinishQuestion','front/groupQuestionTest/ZhenTiOrMoNiTi/finishQuestionList/&{startNum}/&{endNum}','get','历年真题获取根据题目区间完成题目列表'],
				['realSaveLastQuestion','ffront/groupQuestionTest/ZhenTiOrMoNiTi/saveLastAnswer/&{answer}','get','历年真题保存测试最后一题答案'],
				['realGetAnswerIndexInfo','front/groupQuestionTest/ZhenTiOrMoNiTi/RListAndWList/&{startNum}/&{rightNum}','get','历年真题答案页获取某一区间内答题信息列表'],
				['realGetOneAnswer','front/groupQuestionTest/ZhenTiOrMoNiTi/showRightAnswer/&{index}','post','历年真题获取答案请求'],
				['realSubmitError','front/groupQuestionTest/ZhenTiOrMoNiTi/IWannaCorrect/&{index}','post','历年真题提交纠错']
			],
			study:[
				['getAllGroupbookPagination','front/user/learnTrace/theGroupQuestionRecorder/allGroupQuestionRecord','get','获取套题本所有分类分页'],
				['getSingleGroupBookPagination','front/user/learnTrace/theGroupQuestionRecorder/singleGroupQuestionRecord','get','获取套题本单项分类分页'],
				['getCorrectGroupBookPagination','front/user/learnTrace/theRight/showQuestion','get','获取答对的题分类分页'],
				['getWrongBookPagination','front/user/learnTrace/theWrong/showQuestion','get','获取错题本的分类分页']
			],
			balance:[
				['getTotalBalance','front/balance/getBalance','post','发送充值月数获取总豆数'],
				['balanceChangeMonth','front/balance/exchange','post','用豆兑换月数'],
				['balanceRecharge','front/balance/gainBalance','post','充值提交操作'],
				['getUserBalance','front/login/getBalance','get','获取用户剩余豆数']
			]
		};
	PW.conn = PW.mod.Connector(apiData);
},{
	requires:['mod/connector']
})

