/*-----------------------------------------------------------------------------
* @Description:     题库管理页面的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-17
* ==NOTES:=============================================
* v1.0.0(2013-12-17):
*     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/question',function(S){
	var
        questionConnector = PW.conn.question;
    QuestionIO = {
    	/**
    	 * 修改套题名称
    	 * @return {[type]} [description]
    	 */
    	modQuestionName:function(data, callback){
    		var
                thisConn = questionConnector.modQuestionName;
            thisConn.send(data, function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
    	},
    	/**
    	 * 删除套题
    	 * @param  {[type]}   data     [套题id、套题类型id]
    	 * @param  {Function} callback [description]
    	 * @return {[type]}            [description]
    	 */
    	delQuestionName:function(data, callback){
    		var
    		 	thisConn = questionConnector.delQuestionName;
    		thisConn.send(data, function(rs){
    			callback(rs.code == '0',rs.errMsg);
    		});
    	},
        /**
         * 恢复废弃题目
         * @param  {[type]}   data     [废弃题目id]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        recoverAbandonName:function(data,callback){
            var
                thisConn = questionConnector.recoverAbandonName;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 删除废弃题目
         * @param  {[type]}   data     [废弃题目id]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delAbandonName:function(data,callback){
            var
                thisConn = questionConnector.delAbandonName;
            thisConn.send(data, function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 废弃题目原因操作
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        rejectQuestion:function(data, callback){
            var
                thisConn = questionConnector.rejectQuestion;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 修改纠正题目信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modCurrentInfo:function(data, callback){
           var
                thisConn = questionConnector.modCurrentInfo;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            }); 
        },
        /**
         * 获取题型树
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getQuestionTypeTree:function(data, callback){
            var
                thisConn = questionConnector.QuestionTypeTree;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });  
        },
        /**
         * 添加题库类型
         * @param {[type]}   data     [description]
         * @param {Function} callback [description]
         */
        addQuestionType:function(data, callback){
            var
                thisConn = questionConnector.addQuestionType;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * 修改题型库类型
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modQuestionType:function(data, callback){
            var
                thisConn = questionConnector.modQuestionType;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 删除题型库类型
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delQuestionType:function(data, callback){
           var
                thisConn = questionConnector.delQuestionType;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 废弃正常题目
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        discardQuestion:function(data, callback){
            var
                thisConn = questionConnector.discardQuestion;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 获取正常题目树
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getNormalQuestionTree:function(data, callback){
           var
                thisConn = questionConnector.getNormalQuestionTree;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            }); 
        },
        /**
         * 重新获取题目树
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        resetNormalQuestionTree:function(data, callback){
           var
                thisConn = questionConnector.resetNormalQuestionTree;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            }); 
        }
    }    
    PW.namespace('io.QuestionIO')
    PW.io.Question = QuestionIO;
    return QuestionIO;
},{
	requires:['conn/core']
});