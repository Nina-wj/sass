/*-----------------------------------------------------------------------------
* @Description:     班级管理页面的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-19
* ==NOTES:=============================================
* v1.0.0(2013-12-19):
*     初始生成
* ---------------------------------------------------------------------------*/


KISSY.add('io/user', function(S){
    var
        userConnector = PW.conn.user;

    UserIO = {
        /**
         * 修改用户密码
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        resetUserPwd: function(data, callback){
            var
                thisConn = userConnector.userPwd;
            thisConn.send(data, function(rs){
                callback(rs.code == 0, rs.errMsg);
            });
        },
        /**
         * 根据班级id获取教师信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getTeacherInfo:function(data, callback){
            var
                thisConn = userConnector.getTeacherByClass;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        submitScore:function(data, callback){
            var
                thisConn = userConnector.submitScore;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        checkTeacherScore:function(data, callback){
            var
                thisConn = userConnector.checkTeacherScore;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data, rs.errMsg);
            });  
        }
    };
    PW.namespace('io.User')
    PW.io.User = UserIO;
    return UserIO;
},{
    requires:['conn/core']
});