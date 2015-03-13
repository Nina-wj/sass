/*-----------------------------------------------------------------------------
* @Description:     用户管理的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014-01-03
* ==NOTES:=============================================
* v1.0.0(2014-01-03):
*     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/user',function(S){
	var
        userConnector = PW.conn.uesr;
    var UserIO = {
    	/**
    	 * 教师删除操作
    	 * @return {[type]} [description]
    	 */
    	delTeacher:function(data ,callback){
    		var
    			thisConn = userConnector.delTeacher;
    		thisConn.send({teacherId:data.id},function(rs){
    			callback(rs.code == '0', rs.errMsg);
    		});
    	},
        /**
         * 解冻教师状态
         * @return {[type]} [description]
         */
        unLockTeacherState:function(data ,callback){
            var
                thisConn = userConnector.unLockTeacherState;
            thisConn.send({teacherId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 冻结教师状态
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        lockTeacherState:function(data, callback){
             var
                thisConn = userConnector.lockTeacherState;
            thisConn.send({teacherId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 重置教师密码
         * @return {[type]}            [description]
         */
        resetTeacherPwd:function(data ,callback){
            var
                thisConn = userConnector.resetTeacherPwd;
            thisConn.send({teacherId:data.id, newPassword:data.newPassword}, function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 会员删除操作
         * @return {[type]} [description]
         */
        delStudent:function(data ,callback){
            var
                thisConn = userConnector.delStudent;
            thisConn.send({studentId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 解冻学生状态
         * @return {[type]} [description]
         */
        unLockStuState:function(data ,callback){
            var
                thisConn = userConnector.unLockStuState;
            thisConn.send({studentId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 冻结学生状态
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        lockStuState: function(data, callback){
            var
                thisConn = userConnector.lockStuState;
            thisConn.send({studentId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 重置会员密码
         * @return {[type]}            [description]
         */
        resetStudentPwd:function(data ,callback){
            var
                thisConn = userConnector.resetStudentPwd;
            thisConn.send({studentId:data.id, newPassword:data.newPassword}, function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 管理员删除操作
         * @return {[type]} [description]
         */
        delAdmin:function(data ,callback){
            var
                thisConn = userConnector.delAdmin;
            thisConn.send({adminId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 解冻管理员状态
         * @return {[type]} [description]
         */
        unLockAdminState:function(data ,callback){
            var
                thisConn = userConnector.unLockAdminState;
            thisConn.send({adminId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 冻结管理员状态
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        lockAdminState:function(data, callback){
             var
                thisConn = userConnector.lockAdminState;
            thisConn.send({adminId:data.id},function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 重置管理员密码
         * @return {[type]}            [description]
         */
        resetAdminPwd:function(data ,callback){
            var
                thisConn = userConnector.resetAdminPwd;
            thisConn.send({adminId:data.id, newPassword:data.newPassword}, function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        }
    }
    PW.namespace('io.UserIO')
    PW.io.User = UserIO;
    return UserIO;
},{
	requires:['conn/core']
});