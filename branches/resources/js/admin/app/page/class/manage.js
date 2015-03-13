/*-----------------------------------------------------------------------------
* @Description:     班级管理操作
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2013.12.20
* ==NOTES:=============================================
* v1.0.0(2013.12.20):
*     班级管理操作
* --------------------------------------------------------------------------*/
KISSY.add('page/class/manage',function(S,ClassManage){
	PW.namespace('page.Class.Manage');
	PW.page.Class.Manage = function(param){
		return new ClassManage(param);
	}
},{
	requires:['class/manage']
});

KISSY.add('class/manage', function(S,ClassIO,ClassShow,ClassEdit){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        setPagingConn = PW.conn.class.getPagnition,
    	el={
    		//需要验证的表单
    		form:'form',
    		//分页holder
    		pagination:'#J_pagination',
    		//数据渲染部分
    		dataRender:'#J_classList',
            //班级状态
            classState:'#J_classState'
    	};
    var ClassManage = function(param){
        this.ClassEdit = new ClassEdit(param);
        this._ClassShow;
        this._pagination;
    	this._init();
    }
    S.augment(ClassManage,S.Event.Target,{
    	_init:function(){
            this._initPaginition();
    		this._addEventHandler();
    	},
    	_addEventHandler:function(){
    		var 
    			that = this;
            on(el.classState,'change',that._getPagnitionInfo,that);
    	},
        /**
         * 初始化分页
         * @return {[type]} [description]
         */
        _initPaginition:function(){
            var
                that = this,
                classState = DOM.val(el.classState);
            that._pagnition(classState);
        },
        /**
         * 通过状态获取分页信息
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        _getPagnitionInfo:function(evt){
            var
                that = this,
                classState = DOM.val(el.classState);
            that._pagnition(classState);
        },
        /**
         * 分页操作
         * @return {[type]} [description]
         */
        _pagnition:function(stateId){
            var 
                that = this;
            that._pagination = PW.pagination({
                renderTo: el.pagination,
                dataRender: el.dataRender,
                juicerRender: 'tpl',
                pageSize: 10,
                url:setPagingConn.getConnPrefix() + setPagingConn.url,
                extraParam: {
                    banJiState:stateId,
                    pageSize:10
                },
                configUrl: function(url, page ,me, prevData){
                    return '' + url +'?page='+ page + '&';
                },
                afterDataLoad:function(){
                    //在分页结束后再添加鼠标移入事件
                   that._ClassShow = new ClassShow();
                }
            });
        }
    });
    return ClassManage;
},{
	requires:['io/class','class/show','class/edit','core','mod/defender','mod/dialog','mod/pagination','conn/core']
});

//查看教师评分
KISSY.add('class/show',function(S,ClassIO){
    var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            //查看教师评分
            classShow:'.J_show',
            //
            showInfo:'.J_show-info',
            //教师列表
            teacherTable:'#J_classList'
        },
        CLASS_SHOW_TEMP='<div class="teacher-show">'+
            '<table><tr><th>教师名称</th><th>评分</th><th>参评人数</th></tr>'+
            '<tbody>'+
            '{@each teacherList as area, index}'+
            '<tr><td>&{area.teacherName}</td><td>&{area.score}</td><td>&{area.joinScoreStudents}</td></tr>'+
            '{@/each}'+
            '</tbody></table></div>',
        MSG={
            TIP_LOADING:'正在加载...'
        },
        CLASS_ATTR = 'data-class-id';
    var ClassShow=function(){
        this.ClassScoreTipSet;
        this._init();
    }
    S.augment(ClassShow,{
        _init:function(){
            this._addClassScoreTip();
            this._addEventHandler();
        },
        /**
         * 书标移入时触发事件
         */
        _addEventHandler:function(){
            var 
                that = this;
            //循环添加 鼠标移入事件， 由tooltip支持
            that.ClassScoreTipSet.each(function(api){
                api.on('show',function(){
                    var
                        tipHost = api.host,
                        tr      = DOM.parent(tipHost, 'tr'),
                        classId  = DOM.attr(tr, CLASS_ATTR),
                        html;
                   ClassIO.showClassInfo({banJiId:classId},function(code,data,errMsg){
                        html = Juicer(CLASS_SHOW_TEMP, {teacherList:data.teacherScoreDtoList});
                        api.setHtml(html);
                    })
                })
            });
        },
         /**
         * 初始化tip组件，事件在evt函数中进行控制
         */
        _addClassScoreTip: function(){
            var
                that = this;
            that.ClassScoreTipSet = PW.mod.Tooltip({
                renderTo: el.classShow,
                content: {
                    text: MSG.TIP_LOADING
                },
                position: {
                    at: 'bc',
                    my: 'tc'
                },
                styles:{
                    width: 300
                }
            });
        }
    });
    return ClassShow;
},{
     requires:['io/class','core','mod/juicer','mod/tooltip']
});

//班级管理操作部分
KISSY.add('class/edit',function(S,ClassIO){
     var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            //数据holder
            dataHolder:'#J_classList',
            //删除按钮
            delBtn:'.J_delA',
            //修改按钮
            modBtn:'.J_editA',
            //上课人数
            num:'.J_num'
        },
        //班级id自定义属性
        CLASS_ID_ATTR = 'data-class-id',
        //删除提示框设置
        DEL_DIALOG_SETTING={
            width: 200,
            height: 50,
            title:'删除班级',
            topLayer:0
        },
        MOD_DIALOG_SETTING = {
            width: 600,
            height: 400,
            title:'修改班级信息',
            topLayer:0
        },
        //提交修改信息之后更新数据模板
        CLASS_INFO_TEMP='<tr data-class-id="&{id}">'+
                        '<td>&{classType}</td>'+
                        '<td>&{startTime}</td>'+
                        '<td>&{endTime}</td>'+
                        '<td>&{name}</td>'+
                        '<td class="J_num">&{num}</td>'+
                        '<td class="operation">'+
                        '<a class="J_show" href="#">查看</a>'+
                        '</td>'+
                        '<td class="operation">'+
                        '<a href="#" class="J_editA">修改&nbsp;</a>'+
                        '<a href="#" class="J_delA">删除</a>'+
                        '<span>|</span><input class="J_upload" type="file" value="批量添加学员" name="">'+
                        '</td></tr>',
        //提示信息
        TIP = {
            del_success_tip:'删除成功'
        };
    var ClassEdit = function(param){
        this.opts = param;
        this._modDialog;
        this._init();
    }
    S.augment(ClassEdit,{
        _init:function(){
            this._addEventHandler();
        },
        _addEventHandler:function(){
            var
                that = this;
            delegate(el.dataHolder,'click',el.delBtn,that._delHandler,that);
            delegate(el.dataHolder,'click',el.modBtn,that._modHandler,that);
        },
        /**
         * 点击修改按钮弹出框并显示新页
         * @return {[type]} [description]
         */
        _modHandler:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                classId = DOM.attr(tr,CLASS_ID_ATTR),
                settings = S.mix(MOD_DIALOG_SETTING,{
                    contentFrame:  that.opts.modUrl + '/' + classId,
                    afterClose: function(e, me){
                        var data = PW.dialog.getData(me.id);
                        that._modClassMinfo(classId,data,tr);
                    }
                });
          that._modDialog =   PW.dialog.open(settings);
        },
        /**
         * 渲染信息到节点上
         * @param  {[type]} id   [description]
         * @param  {[type]} data [description]
         * @param  {[type]} tr   [description]
         * @return {[type]}      [description]
         */
        _modClassMinfo:function(id, data, tr){
            S.log(data);
            var 
                classId = data.classId,
                className = data.className,
                classType = data.classType,
                startTime = data.startTime,
                endTime = data.endTime,
                numDOM = query(el.num,tr),
                num = DOM.html(numDOM),
                modClassDOM = Juicer(CLASS_INFO_TEMP,{id:classId,name:className,classType:classType,startTime:startTime,endTime:endTime,num:num});
                modClassHtml = DOM.create(modClassDOM);
            DOM.replace(tr,modClassHtml);
        },
        /**
         * 点击删除操作后询问是否删除该班级
         * @return {[type]} [description]
         */
        _delHandler:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                classId = DOM.attr(tr,CLASS_ID_ATTR),
                settings = S.mix(DEL_DIALOG_SETTING,{ 
                    content: '<p style="padding-left:10px">是否删除该班级？</p>',
                    footer:{
                        btns:[
                            {
                                bid:1,
                                text:'确定',
                                clickHandler: function(evt,me){
                                    that._delClassManage(classId,tr);
                                    me.close();
                                }
                            },
                            {
                                bid:2,
                                text:'取消',
                                clickHandler: function(evt,me){
                                    me.close();
                                }
                            }
                        ]
                    }
                });
                PW.dialog.open(settings);
        },
        /**
         * 删除班级操作
         * @param  {[type]} id [description]
         * @param  {[type]} tr [description]
         * @return {[type]}    [description]
         */
        _delClassManage:function(id,tr){
            var
                that = this;
            ClassIO.delClassInfo({banJiId:id},function(code, errMsg){
                if(code ==true){
                    DOM.remove(tr);
                }else{
                    PW.dialog.alert(errMsg);
                }
            });
        }
    });
        return ClassEdit;
},{
    requires:['io/class','core','mod/dialog','thirdparty/jquery','mod/ext']
});
