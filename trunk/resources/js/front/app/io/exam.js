/*-----------------------------------------------------------------------------
* @Description:     考试管理页面的io
* @Version:         1.0.0
* @author:          shenj(1073805310@qq.com)
* @date             2014-02-21
* ==NOTES:=============================================
* v1.0.0(2014-02-21):
*     初始生成
* ---------------------------------------------------------------------------*/


KISSY.add('io/exam', function(S){
    var
        examConnector = PW.conn.exam;

   ExamIO = {
        /**
         * 学前测试获取下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        preTestGetOneQuestion: function(data, callback){
            var
                thisConn = examConnector.preTestGetOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 学前测试获取答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        preTestGetOneAnswer: function(data, callback){
            var
                thisConn = examConnector.preTestGetOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 学前测试提交纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        preTestSubmitError:function(data,callback){
            var
                thisConn = examConnector.preTestSubmitError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 资料分析测试答题开始验豆请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        dataValidBalance: function(data, callback){
            var
                thisConn = examConnector.dataValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 获取资料分析下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getDataTestOneQuestion: function(data,callback){
            var
                thisConn = examConnector.getDataTestOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取资料分析检查用户余额和是否做完资料分析试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validDataTestQuestion: function(data, callback){
            var
                thisConn = examConnector.validDataTestQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取资料分析测试某一区间内已完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        dataTestGetFinishQuestion: function(data, callback){
            var
                thisConn = examConnector.dataTestGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },      
        /**
         * 获取资料分析答案某一区间内答题情况
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        dataGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.dataGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取资料分析答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getDataTestOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getDataTestOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交资料分析纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitDataTestError:function(data,callback){
            var
                thisConn = examConnector.submitDataTestError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 言语理解测试答题开始验豆请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        languageValidBalance: function(data, callback){
            var
                thisConn = examConnector.languageValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 获取言语理解下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLanguageTestOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getLanguageTestOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 是否做完言语理解试题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validLanguageTestQuestion: function(data, callback){
            var
                thisConn = examConnector.validLanguageTestQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取言语理解测试某一区间内已完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        languageTestGetFinishQuestion: function(data, callback){
            var
                thisConn = examConnector.languageTestGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取言语理解测试答案某一区间内答题情况
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        languageGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.languageGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取言语理解答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLanguageTestOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getLanguageTestOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交言语理解纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitLanguageTestError:function(data,callback){
            var
                thisConn = examConnector.submitLanguageTestError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 数量关系测试答题开始验豆请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        mathValidBalance: function(data, callback){
            var
                thisConn = examConnector.mathValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 获取数量关系下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getMathTestOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getMathTestOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完数量关系试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validMathTestQuestion: function(data, callback){
            var
                thisConn = examConnector.validMathTestQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取数量关系测试某一区间内已完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        mathTestGetFinishQuestion: function(data, callback){
            var
                thisConn = examConnector.mathTestGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取数量关系测试答案某一区间内答题情况
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        mathGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.languageGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取数量关系答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getMathTestOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getMathTestOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交数量关系纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitMathTestError:function(data,callback){
            var
                thisConn = examConnector.submitMathTestError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 判断推理测试答题开始验豆请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        logicValidBalance: function(data, callback){
            var
                thisConn = examConnector.logicValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 获取判断推理下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLogicTestOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getLogicTestOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完判断推理试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validLogicTestQuestion: function(data, callback){
            var
                thisConn = examConnector.validLogicTestQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取判断推理测试某一区间内已完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        logicTestGetFinishQuestion: function(data, callback){
            var
                thisConn = examConnector.languageTestGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取判断推理测试答案某一区间内答题情况
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        logicGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.languageGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取判断推理答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLogicTestOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getLogicTestOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交判断推理纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitLogicTestError:function(data,callback){
            var
                thisConn = examConnector.submitLogicTestError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 常识判断测试答题开始验豆请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        knlgValidBalance: function(data, callback){
            var
                thisConn = examConnector.knlgValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 获取常识判断下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        knlgTestOneQuestion: function(data, callback){
            var
                thisConn = examConnector.knlgTestOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完常识判断试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validknlgTestQuestion: function(data, callback){
            var
                thisConn = examConnector.validknlgTestQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取常识判断测试某一区间内已完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        knlgTestGetFinishQuestion: function(data, callback){
            var
                thisConn = examConnector.knlgTestGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取常识判断测试答案某一区间内答题情况
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        knlgGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.knlgGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取常识判断答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        knlgTestGetOneAnswer: function(data, callback){
            var
                thisConn = examConnector.knlgTestGetOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交常识判断纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitKnlgTestError:function(data,callback){
            var
                thisConn = examConnector.submitKnlgTestError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取资料分析下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getDataExercisOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getDataExercisOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完资料分析试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validDataExercisQuestion: function(data, callback){
            var
                thisConn = examConnector.validDataExercisQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取资料分析答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getDataExercisOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getDataExercisOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交资料分析纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitDataExercisError:function(data,callback){
            var
                thisConn = examConnector.submitDataExercisError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取言语理解下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLanguageExercisOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getLanguageExercisOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完言语理解试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validLanguageExercisQuestion: function(data, callback){
            var
                thisConn = examConnector.validLanguageExercisQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取言语理解答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLanguageExercisOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getLanguageExercisOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交言语理解纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitLanguageExercisError:function(data,callback){
            var
                thisConn = examConnector.submitLanguageExercisError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取数量关系下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getMathExercisOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getMathExercisOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完数量关系试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validMathExercisQuestion: function(data, callback){
            var
                thisConn = examConnector.validMathExercisQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取数量关系答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getMathExercisOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getMathExercisOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交数量关系纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitMathExercisError:function(data,callback){
            var
                thisConn = examConnector.submitMathExercisError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取判断推理下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLogicExercisOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getLogicExercisOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完判断推理试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validLogicExercisQuestion: function(data, callback){
            var
                thisConn = examConnector.validLogicExercisQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取判断推理答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getLogicExercisOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getLogicExercisOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交判断推理纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitLogicExercisError:function(data,callback){
            var
                thisConn = examConnector.submitLogicExercisError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 获取常识判断下一题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getKnowledgeExercisOneQuestion: function(data, callback){
            var
                thisConn = examConnector.getKnowledgeExercisOneQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [validQuestion 检查用户余额和是否做完常识判断试题]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validKnowledgeExercisQuestion: function(data, callback){
            var
                thisConn = examConnector.validKnowledgeExercisQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [getOneAnswer 获取常识判断答案]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getKnowledgeExercisOneAnswer: function(data, callback){
            var
                thisConn = examConnector.getKnowledgeExercisOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * [submitError 提交常识判断纠错]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitKnowledgeExercisError:function(data,callback){
            var
                thisConn = examConnector.submitKnowledgeExercisError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 综合测试提交验证题目请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synthesizeTestValidSubmit: function(data,callback){
            var
                thisConn = examConnector.synthesizeTestValidSubmit;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 综合测试获取题目请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synthesizeTestGetQuestion: function(data, callback){
           var
                thisConn = examConnector.synthesizeTestGetQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            }); 
        },
        /**
         * 获取综合测试某一区间内已完成题号
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synThestTestGetFinishQuestion: function(data, callback){
            var
                thisConn = examConnector.synThestTestGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            }); 
        },
        /**
         * 综合测试获取题目答案信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synthesizeGetOneAnswer: function(data, callback){
            var
                thisConn = examConnector.synthesizeGetOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 综合测试获取答题信息情况
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synthsizeGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.synthsizeGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 保存综合测试最后一题请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synSaveLastQuestion:function(data,callback){
            var
                thisConn = examConnector.synSaveLastQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 综合测试提交纠错请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synthesizeSubmitError: function(data, callback){
            var
                thisConn = examConnector.synthesizeSubmitError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 综合测试开始答题验证用户持豆信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        synValidBalance: function(data, callback){
            var
                thisConn = examConnector.synValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 模拟题获取根据题目区间完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelGetFinishQuestion: function(data,callback){
            var
                thisConn = examConnector.modelGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题保存测试最后一题答案
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelSaveLastQuestion:function(data, callback){
           var
                thisConn = examConnector.modelSaveLastQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            }); 
        },
        /**
         * 模拟题获取下一题试题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelGetQuestion: function(data, callback){
            var
                thisConn = examConnector.modelGetQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题提交验证题目请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelValidSubmit: function(data, callback){
            var
                thisConn = examConnector.modelValidSubmit;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题答案页获取某一区间内答题信息列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.modelGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题获取答案请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelGetOneAnswer: function(data,callback){
            var
                thisConn = examConnector.modelGetOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题提交纠错
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelSubmitError: function(data, callback){
             var
                thisConn = examConnector.modelSubmitError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题开始答题验证用户持豆信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modelValidBalance: function(data,callback){
            var
                thisConn = examConnector.modelValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 历年真题开始答题验证用户持豆信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realValidBalance: function(data, callback){
            var
                thisConn = examConnector.realValidBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 模拟题获取根据题目区间完成题目列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realGetFinishQuestion: function(data,callback){
            var
                thisConn = examConnector.realGetFinishQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题保存测试最后一题答案
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realSaveLastQuestion:function(data, callback){
           var
                thisConn = examConnector.realSaveLastQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            }); 
        },
        /**
         * 模拟题获取下一题试题
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realGetQuestion: function(data, callback){
            var
                thisConn = examConnector.realGetQuestion;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题提交验证题目请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realValidSubmit: function(data, callback){
            var
                thisConn = examConnector.realValidSubmit;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题答案页获取某一区间内答题信息列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realGetAnswerIndexInfo: function(data, callback){
            var
                thisConn = examConnector.realGetAnswerIndexInfo;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题获取答案请求
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realGetOneAnswer: function(data,callback){
            var
                thisConn = examConnector.realGetOneAnswer;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 模拟题提交纠错
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        realSubmitError: function(data, callback){
             var
                thisConn = examConnector.realSubmitError;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
    };
    PW.namespace('io.Exam');
    PW.io.Exam = ExamIO;
    return ExamIO;
},{
    requires:['conn/core']
});