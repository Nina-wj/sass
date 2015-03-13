/*-----------------------------------------------------------------------------
* @Description:     充值送豆管理页面的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014-03-11
* ==NOTES:=============================================
* v1.0.0(2014-03-11):
*     初始生成
* ---------------------------------------------------------------------------*/


KISSY.add('io/balance', function(S){
    var
        balanceConnector = PW.conn.balance;
    BalanceIO = {
       /**
        * 获取充值后总豆数
        * @param  {[type]}   data     [description]
        * @param  {Function} callback [description]
        * @return {[type]}            [description]
        */
        getTotalBalance: function(data, callback){
            var
                thisConn = balanceConnector.getTotalBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
        * 用豆兑换月数
        * @param  {[type]}   data     [description]
        * @param  {Function} callback [description]
        * @return {[type]}            [description]
        */
        balanceChangeMonth: function(data, callback){
            var
                thisConn = balanceConnector.balanceChangeMonth;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 提交充值换豆
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        balanceRecharge: function(data, callback){
        	var
            	thisConn = balanceConnector.balanceRecharge;
	        thisConn.send(data, function(rs){
	            callback(rs.code == '0',rs.errMsg);
	        });
        },
        /**
         * 获取用户剩余豆数
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getUserBalance: function(data, callback){
            var
                thisConn = balanceConnector.getUserBalance;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        }
    };
    PW.namespace('io.Balance')
    PW.io.Balance = BalanceIO;
    return BalanceIO;
},{
    requires:['conn/core']
});