/*-----------------------------------------------------------------------------
* @Description:     充值计费的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-19
* ==NOTES:=============================================
* v1.0.0(2013-12-19):
*     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/recharge',function(S){
	var
        rechargeConnector = PW.conn.recharge;
    var RechargeIO = {
    	/**
    	 * 按题扣豆修改操作
    	 * @return {[type]} [description]
    	 */
    	balanceByQuestion:function(data ,callback){
    		var
    			thisConn = rechargeConnector.balanceByQuestion;
    		thisConn.send(data,function(rs){
    			callback(rs.code == '0', rs.errMsg);
    		});
    	},
        /**
         * 推荐人送豆修改操作
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        balanceByReferrer:function(data ,callback){
            var
                thisConn = rechargeConnector.balanceByReferrer;
            thisConn.send(data,function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 充值送豆修改操作
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        balanceByRecharge:function(data ,callback){
            var
                thisConn = rechargeConnector.balanceByRecharge;
            thisConn.send(data,function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        },
        /**
         * 报班送豆修改操作
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        balanceByApply:function(data ,callback){
            var
                thisConn = rechargeConnector.balanceByApply;
            thisConn.send(data,function(rs){
                callback(rs.code == '0', rs.errMsg);
            });
        }
    }
    PW.namespace('io.RechargeIO')
    PW.io.Recharge = RechargeIO;
    return RechargeIO;
},{
	requires:['conn/core']
});