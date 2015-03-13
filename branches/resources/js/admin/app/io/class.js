/*-----------------------------------------------------------------------------
* @Description:     班级管理页面的io
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013-12-19
* ==NOTES:=============================================
* v1.0.0(2013-12-19):
*     初始生成
* ---------------------------------------------------------------------------*/


KISSY.add('io/class', function(S){
    var
        classConnector = PW.conn.class;

    ClassIO = {
        /**
         * 添加班级类型
         * @param {Obj}   data     data.banJiTypeName 班级类型名称
         */
        addClassType: function(data, callback){
            var
                thisConn = classConnector.addClassType;
            thisConn.send(data, function(rs){
                callback(rs);
            });
        },
        /**
         * 修改班级类型
         * @param {Obj}   data     data.banJiTypeName 班级类型名称 data.banJiTypeId 班级类型id 
         */
        modClassType:function(data, callback){
            var
                thisConn = classConnector.modClassType;
            thisConn.send(data, function(rs){
                callback(rs.code == '0', rs.data, rs.errMsg);
            });
        },
        /**
         * 删除班级类型
         * @param {Obj}   data      data.banJiTypeId 班级类型id 
         */
        delClassType:function(data, callback){
            var
                thisConn = classConnector.delClassType;
            thisConn.send(data, function(rs){
                callback(rs.code == '0', rs.data, rs.errMsg);
            });
        },
        /**
         * 教师库中检索教师名称
         * @param  {[type]}   data     [教师名称]
         * @param  {Function} callback [description]
         */
        searchTeacher:function(data, callback){
            var
                thisConn = classConnector.searchTeacher;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * 提交班级添加
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitAddClass:function(data, callback){
             var
                thisConn = classConnector.submitClass;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * 查看教师评分
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        showClassInfo:function(data, callback){
            var
                thisConn = classConnector.showClassInfo;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.data,rs.errMsg);
            });
        },
        /**
         * 删除班级管理信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delClassInfo:function(data, callback){
            var
                thisConn = classConnector.delClassInfo;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        },
        /**
         * 修改班级管理信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modClassInfo:function(data, callback){
            var
                thisConn = classConnector.modClassInfo;
            thisConn.send(data, function(rs){
                callback(rs.code == '0',rs.errMsg);
            });
        }
    }
    PW.namespace('io.ClassIO')
    PW.io.Class = ClassIO;
    return ClassIO;
},{
    requires:[
        'conn/core'
    ]
});