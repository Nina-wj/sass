/*-----------------------------------------------------------------------------
* @Description:     给公务员前台常用的工具函数
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014-01-10
* ==NOTES:=============================================
* v1.0.0(2014-01-10):
*     初始生成，目前主要是针对dialog部分
* v1.0.1(2014-02-27):
*     添加了当手动关闭弹出层时，返回data说明：
*     code = 3 手动关闭弹出层
* ---------------------------------------------------------------------------*/

KISSY.add('page/common/util', function(S){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        Dialog = PW.mod.Dialog,
    Util = {
        //提示信息提示框
        dialog: {
            alert: function(msg, fn){
                return Dialog.alert(msg, fn ,{
                    width:500,
                    height:150
                })
            },
            //信息处理提示框
            manage:function(url,width,height,closeCallback){
               Dialog.open({
                    width:width,
                    height:height,
                    maskColor:'#000000',
                    theme:'b',
                    title: '公考学院',
                    contentFrame:  url,
                    afterClose: function(e, me){
                        var data = PW.dialog.getData(me.id);
                        //手动关闭弹出层时返回为data没空，设置code为2
                        if(data == null){
                            data = {code:3};
                        }
                        closeCallback(data);
                    }
                }); 
            },
            //确认提示框
            confirm: function(msg, btnTip, okCallback){
               currentEl = msg;
                Dialog.open({
                    width: 600,
                    height:100,
                    title: '公考学院',
                    content: currentEl,
                    footer:{
                        btns:[{
                            text: btnTip,
                            clickHandler: function(ev, me){
                                var rs = okCallback();
                                if(rs == true){
                                    me.close();
                                }
                               }
                            }]
                        }
                    });
                }
            }   
        };

    PW.namespace('page.Util');
    PW.page.Util = Util;
    return Util;
},{
    requires:[
        'mod/dialog'
    ]
})



