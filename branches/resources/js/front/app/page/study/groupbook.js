/*-----------------------------------------------------------------------------
* @Description:     前台套题本操作页面
* @Version:         1.0.0
* @author:          wangjing(12846632460@qq.com)
* @date             2014.03.06
* ==NOTES:=============================================
* v1.0.0(2014.03.06):
*     前台套题本操作页面
* --------------------------------------------------------------------------*/
KISSY.add('page/study/groupbook',function(S,GroupBook){
	PW.namespace('page.study.groupbook');
	PW.page.study.groupbook = function(param){
		new GroupBook(param);
	}
},{
	requires:['group/manage']
});
KISSY.add('group/manage',function(S){
	var
		$ = S.all, DOM = S.DOM, on = S.Event.on,
		el={
			//分页数据指向
			dataRender: '.J_renderdata',
			//分页页数指向
			paginationel: '#J_pagination',
			//套题本类型
			questionType: '.J_questionType'
		},
		setPaging = PW.conn.study;
	function GroupBook(param){
		this.opts = param;
		this._pagination;
		this.init();
	};
	S.augment(GroupBook,{
		init:function(){
			this._addEvtListener();
		},
		_addEvtListener: function(){
			var
				that = this;
			on(el.questionType, 'change', function(){
				that._getPagination();
			});
		},
		/**
		 * 获取错题本分页信息
		 * 根据不同的所选类别的不同请求不同路径
		 * @return {[type]} [description]
		 */
		_getPagination: function(){
			var
				that = this,
				questionType = DOM.val(el.questionType),
				setPagingConn,
				url,
				data;
			if(questionType == 2){
				setPagingConn = setPaging.getAllGroupbookPagination;
                url = setPagingConn.getConnPrefix() + setPagingConn.url;
                that._pagination = PW.pagination({
	                juicerRender: 'tpl',
	                dataRender: el.dataRender,
					renderTo: el.paginationel,
	                pageSize: 10,
	                url: url,
	                configUrl: function(url, page ,me, prevData){
	                    return '' + url +'/'+ page;
	                }
			});
			}else{
				setPagingConn = setPaging.getSingleGroupBookPagination;
				url = setPagingConn.getConnPrefix() + setPagingConn.url;
				data = {
					questionSourceId: questionType
				};
				that._pagination = PW.pagination({
	                juicerRender: 'tpl',
	                dataRender: el.dataRender,
					renderTo: el.paginationel,
	                pageSize: 10,
	                url: url,
	                extraParam: data,
	                configUrl: function(url, page ,me, prevData){
	                    return '' + url +'/'+ page;
	                }
				});
			}
		}
	});

	return GroupBook;
},{
	requires:['core','conn/core','mod/pagination']
});