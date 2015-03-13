/*-----------------------------------------------------------------------------
* @Description:     前台答错题操作页面
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.05.06
* ==NOTES:=============================================
* v1.0.0(2014.05.06):
*     前台答错题操作页面
* --------------------------------------------------------------------------*/
KISSY.add('page/study/error-set',function(S, ErrorSet){
	PW.namespace('page.ErrorSet');
	PW.page.ErrorSet = function(){
		return new ErrorSet()
	}
},{
	requires:['errSet/core']
});
KISSY.add('errSet/core', function(S){
	var
        DOM = S.DOM, get = DOM.get, query = DOM.query, delegate = S.Event.delegate,
        el={
            //数据渲染指向
            dataRender: '.J_dataRender',
            //分页指向
            paginationel: '.J_pageRender'
        },
        setPagination = PW.conn.study.getErrorSetPagination;
    function ErrorSet(){
    	this._init();
    	this._pagination;
    }
    S.augment(ErrorSet,{
    	_init: function(){
    		//初始化nav操作
    		PW.page.Index();
    		this._initPagination();
    	},
    	_initPagination: function(){
    		this._pagination = PW.pagination({
				juicerRender: 'tpl',
                dataRender: el.dataRender,
				renderTo: el.paginationel,
                pageSize: 10,
                url: setPagination.getConnPrefix() + setPagination.url,
                extraParam:{
                    pageSize: 10
                },
                configUrl: function(url, page ,me, prevData){
                    return '' + url +'?page='+ page;
                }
    		});
    	}
    });
    return ErrorSet;
},{
	requires:['core','conn/core','mod/pagination','page/index']
})