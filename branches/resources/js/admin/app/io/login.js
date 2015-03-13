/*-----------------------------------------------------------------------------
* @Description:     登陆页面的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-13
* ==NOTES:=============================================
* v1.0.0(2013-12-13):
*     初始生成
* ---------------------------------------------------------------------------*/


KISSY.add('io/login', function(S){
    var
        loginConnector = PW.conn.login;

    LoginIO = {
        /**
         * 登陆验证
         * @param {Obj}   data     data.tableId 餐台id，data.state 0-停用， 1代表恢复
         */
        getLogin: function(data, callback){
            var
                thisConn = loginConnector.loginManage;
            thisConn.send(data, function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 欢迎页面
         * @param  {[type]}   data     [与后台交互数据]
         * @param  {Function} callback [返回函数]
         * @return {[type]}            [description]
         */
        
        getMenu:function(data, callback){
            var
                thisConn = loginConnector.welcome;
            thisConn.send(data, function(rs){
                callback(rs.code == '0', rs.data, rs.errMsg);
            });
        }
    }
    PW.namespace('io.LoginIO')
    PW.io.Login = LoginIO;
    return LoginIO;
},{
    requires:[
        'conn/core'
    ]
});