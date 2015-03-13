/*-----------------------------------------------------------------------------
* @Description:     首页操作
* @Version:         1.0.0
* @author:          kongt(1284663246@qq.com)
* @date             2014.01.14
* ==NOTES:=============================================
* v1.0.0(2014.01.14):
*     首页操作
* --------------------------------------------------------------------------*/
KISSY.add('page/index',function(S,Index){
    PW.namespace('page.Index');
    PW.page.Index = function(){
        return new Index();
    }
},{
    requires:['index/nav']
});

KISSY.add('index/nav', function(S){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,
        el={
            crumb:'.crumb',
            liBg:'.libg'
        };
    var Index = function(){
        this._init();
    }
    S.augment(Index,{
        _init:function(){
            this._showNav();
            this._addEventHandler();
        },
        /**
         * 显示nav
         * @return {[type]} [description]
         */
        _showNav:function(){
            var 
                that = this,
                subNav = DOM.get('.sub-nav'),
                newSubNav = DOM.clone(subNav,true,true,true);
            DOM.prepend(newSubNav,'.crumb');
            DOM.show(newSubNav);
        },
        _addEventHandler:function(){
            var 
                that = this,
                mainNavA = DOM.query('a','.main-nav');
            on(mainNavA,'click',that._showSubNavHandler,that);          
        },
        /**
         *   一级菜单的显示样式
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _showSubNavHandler:function(evt){
            var 
                that = this,
                target = evt.target,
                li = DOM.parent(target,'li'),
                ul = DOM.query('ul',el.crumb),
                div = DOM.query('div',el.crumb),
                mainName=DOM.attr(li,'class'),
                subName='.sub-'+mainName,
                top = DOM.height(target)-9,
                left = DOM.width(target)/2-9,
                top = $(li).offset().top+top,
                left = $(li).offset().left+left,
                otherLi = DOM.siblings(li),
                otherA = DOM.query('a',otherLi),
                subNavLi = DOM.query('li',subName),
                subNavA = DOM.query('a',subNavLi);
            DOM.removeAttr(otherA,'style');
            DOM.show(el.liBg);
            $(el.liBg).offset({top:top,left:left});
            DOM.css(target,{backgroundColor:'#000'});
            DOM.hide(div);
            DOM.hide(ul);
            DOM.show(subName);
            on(subNavA,'mouseenter',that._hoverSubNavLi,that);
        },
        /**
         * 二级菜单的hover样式
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _hoverSubNavLi:function(evt){
            var 
                target = evt.target,
                li = DOM.parent(target,'li'),
                otherLi = DOM.siblings(li,'li'),
                otherA = DOM.query('a',otherLi),
                ul = DOM.parent(li,'ul'),
                otherUl = DOM.siblings(ul,'ul'),
                otherUlLi = DOM.query('li',otherUl),
                otherUlA = DOM.query('a',otherUlLi);
            DOM.removeClass(otherUlLi,'sub-li-bg');
            DOM.removeClass(otherUlA,'sub-a-bg');
            DOM.removeClass(otherLi,'sub-li-bg');
            DOM.removeClass(otherA,'sub-a-bg');
            DOM.addClass(target,'sub-a-bg');
            DOM.addClass(li,'sub-li-bg');
        }       
    });
    return Index;
},{
    requires:['core']
})