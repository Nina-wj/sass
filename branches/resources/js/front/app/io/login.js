/*-----------------------------------------------------------------------------
* @Description:     班级管理页面的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-19
* ==NOTES:=============================================
* v1.0.0(2013-12-19):
*     初始生成
* ---------------------------------------------------------------------------*/


KISSY.add('io/login', function(S){
    var
        loginConnector = PW.conn.login;
    LoginIO = {
       /**
        * 验证手机号码的合法性
        * @param  {[type]}   data     [description]
        * @param  {Function} callback [description]
        * @return {[type]}            [description]
        */
        verifyMobile: function(data, callback){
            var
                thisConn = loginConnector.mobile;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * 提交学员注册信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitStudent: function(data, callback){
            var
                thisConn = loginConnector.submitStudent;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * 登陆信息验证
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        loginFormValid: function(data, callback){
            var
                thisConn = loginConnector.loginFormValid;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * [获取手机验证码]
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getVerifyCode: function(data, callback){
            var
                thisConn = loginConnector.getVerifyCode;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        }
    };
    PW.namespace('io.Login')
    PW.io.Login = LoginIO;
    return LoginIO;
},{
    requires:['conn/core']
});