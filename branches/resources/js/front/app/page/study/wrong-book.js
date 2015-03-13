
/*-----------------------------------------------------------------------------
* @Description:     首页操作
* @Version:         1.0.0
* @author:          kongt(1284663246@qq.com)
* @date             2014.01.14
* ==NOTES:=============================================
* v1.0.0(2014.01.14):
*     首页操作
* --------------------------------------------------------------------------*/
KISSY.add('page/study/wrong-book',function(S,wrongBook){
	PW.namespace('page.study.wrongBook');
	PW.page.study.wrongBook = function(){
		return new wrongBook();
	}
},{
	requires:['wrongBook/search']
});
KISSY.add('wrongBook/search',function(S){
    var
        $ = S.all, DOM = S.DOM, on = S.Event.on,
        el={
            //分页数据指向
            dataRender: '.J_renderdata',
            //分页页数指向
            paginationel: '#J_pagination',
            //套题本类型
            questionType: '.J_questionType',
            //搜索题
            searchBtn:'.search-btn',
            firstChoice:'.J_first-choice',
            secondChoice:'.J_second-choice',
            firstDown:'.first-down',
            secondDown:'.second-down'
        },
        setPaging = PW.conn.study;
    function wrongBook(param){
        this.opts = param;
        this._pagination;
        this.init();
    };
    S.augment(wrongBook,{
        init:function(){
            this._addEvtListener();
        },
        _addEvtListener: function(){
            var
                that = this;  
            on(el.firstChoice,'click',that._getFirstShow,that);
            on(el.secondChoice,'click',that._getSecondShow,that);              
            on(el.searchBtn,'click',that._getPagination,that);
        },
         _getFirstShow:function(){
            var 
                that = this;
            DOM.toggle(el.firstDown);
            DOM.addClass('.J_first-choice','.source');
            DOM.addClass('.J_first-down','.down-img');
            on(el.firstDown,'click',that._getFirstVal,that);
            DOM.hide('.second-down');
            DOM.removeClass('.J_second-choice','.source');
            DOM.removeClass('.J_second-down','.down-img');
        },
        _getSecondShow:function(){
            var 
                that = this;
            DOM.toggle(el.secondDown);
            DOM.addClass('.J_second-choice','.source');
            DOM.addClass('.J_second-down','.down-img');
            on(el.secondDown,'click',that._getSecondVal,that);
            DOM.hide('.first-down');  
            DOM.removeClass('.J_first-choice','.source');
            DOM.removeClass('.J_first-down','.down-img');         
        },
        _getFirstVal:function(evt){
            var 
                that = this,
                target = evt.target,
                liContent=DOM.html(target),
                label=DOM.children('.J_first-choice','label'),
                dataFirst=DOM.attr(target,'data-resource-id');   
            DOM.attr('.J_first-choice','data-valid',dataFirst);
            DOM.hide(el.firstDown);
            DOM.removeClass('.J_first-choice','.source');
            DOM.removeClass('.J_first-down','.down-img');
            DOM.html(label,liContent);
        },  
        _getSecondVal:function(evt){
            var 
                that = this,               
                target = evt.target,
                liContent=DOM.html(target),
                label=DOM.children('.J_second-choice','label'),
                dataSecond=DOM.attr(target,'data-question-id');
            DOM.attr('.J_second-choice','data-question-valid',dataSecond);
            DOM.hide(el.secondDown);
            DOM.removeClass('.J_second-choice','.source');
            DOM.removeClass('.J_second-down','.down-img');
            DOM.html(label,liContent);
        },
        /**
         * 获取错题本分页信息
         * 根据不同的所选类别的不同请求不同路径
         * @return {[type]} [description]
         */
        _getPagination: function(){
            var
                that = this,
                firstData=DOM.attr('.J_first-choice','data-valid'),          
                secondData=DOM.attr('.J_second-choice','data-question-valid'),
                setPagingConn,
                url,
                data;                    
            setPagingConn = setPaging.getWrongBookPagination;
            url = setPagingConn.getConnPrefix() + setPagingConn.url;
            that._pagination = PW.pagination({
                juicerRender: 'tpl',
                dataRender: el.dataRender,
                renderTo: el.paginationel,
                pageSize: 10,
                url: url,
                extraParam: {
                    sourceId:firstData,
                    questionType:secondData,
                    pageSize:10
                },
                configUrl: function(url, page ,me, prevData){
                    // return '' + url +'/'+ page;
                    return '' + url +'?page='+ page;
                }
            });       
        },
    });
    return wrongBook;
},{
    requires:['core','conn/core','mod/pagination']
});