/*-----------------------------------------------------------------------------
* @Description:     用户管理操作公共部分
* @Version:         1.0.0
* @author:          wangjing(1284663246@qq.com)
* @date             2014.01.03
* ==NOTES:=============================================
* v1.0.0(2014.01.03):
*     用户管理操作公共部分
* --------------------------------------------------------------------------*/
KISSY.add('page/common/user-manage',function(S,UserManage){
	PW.namespace('page.Common.UserManage');
	PW.page.Common.UserManage = function(param){
		return new UserManage(param);
	}
},{
	requires:['user/manage']
});

KISSY.add('user/manage',function(S){
	var 
        DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
        on = S.Event.on, delegate = S.Event.delegate,Juicer = PW.juicer,
        el={
            form:'.J_table-mod-form',
            //操作面板
        	operateHolder:'.operation',
        	//删除按钮
        	delTrigger: '.J_del',
        	//解冻、冻结按钮
        	userLockTrigger:'.J_lockuser',
        	//重置按钮
        	resetPwd:'.J_pwd'
        },
        //用户id属性
        User_ID_ATTR='data-user-id',
        TIP = {
            reset_success:'重置密码成功',
            del_success:'删除操作成功',
            setstate_success:'修改用户状态成功',
            del_fail:'该用户不是冻结状态不能删除',
            lock_tip:'冻结',
            unlock_tip:'解冻'
        },
        PWD_DIALOG_SETTING = {
            width: 600,
            height: 400,
            title:'修改密码',
            topLayer:0
        }
    var UserManage = function(param){
        //删除IO
    	this.delIO = param.delIO;
        //修改为解冻状态
        this.unLockStateIO = param.unLockStateIO;
        //修改为冻结状态
        this.lockStateIO = param.lockStateIO;
        //重置密码IO
        this.resetPwdIO = param.resetPwdIO;
    	this._init();
    }
    S.augment(UserManage,{
    	_init:function(){
    		this._addEvtHandler();
    	},
    	_addEvtHandler:function(){
    		var
    			that = this;
            //删除用户
            on(el.delTrigger,'click', that._delUserHandler,that);
            //修改用户状态
            on(el.userLockTrigger,'click', that._setUserState,that);
            //重置用户密码
    		on(el.resetPwd,'click', that._resetUserPwd,that);
    	},
        /**
         * 删除用户，如果用户状态不是解冻，不能够
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
    	_delUserHandler:function(evt){
    		var
    			that = this,
    			target = evt.target,
    			tr = DOM.parent(target,'tr'),
                stateEl= get(el.userLockTrigger,tr),
                state = DOM.html(stateEl),
                id = DOM.attr(tr,User_ID_ATTR);
            //判断用户状态是否为冻结状态，不是冻结状态不能删除
            if(state == TIP.lock_tip){
                that.delIO({id:id},function(code,errMsg){
                    if(code == true){
                        DOM.remove(tr);
                        PW.dialog.alert(TIP.del_success);
                    }else{
                        PW.dialog.alert(errMsg);
                    }
                });
            }else{
                PW.dialog.alert(TIP.del_fail);
            }
    	},
    	/**
    	 * 设置用户状态，
         * 当是解冻时，改为冻结，是冻结时改为解冻
    	 * @return {[type]}           [description]
    	 */
    	_setUserState:function(evt){
    		var
    			that = this,
    			target = evt.target,
    			tr = DOM.parent(target,'tr'),
    			id = DOM.attr(tr,User_ID_ATTR),
                stateEl = get(el.userLockTrigger,tr),
                state = DOM.html(stateEl);
            if(state == TIP.unlock_tip){
                that.unLockStateIO({id: id}, function(code, errMsg){
                    if(code == true){
                        that._changeUserState(stateEl);
                        PW.dialog.alert(TIP.setstate_success);
                    }else{
                        PW.dialog.alert(errMsg);
                    }
                });
            }else if(state == TIP.lock_tip){
                that.lockStateIO({id: id},function(code, errMsg){
                    if(code == true){
                        that._changeUserState(stateEl);
                        PW.dialog.alert(TIP.setstate_success);
                    }else{
                        PW.dialog.alert(errMsg);
                    }
                });
            }
    	},
        _resetUserPwd:function(evt){
            var
                that = this,
                target = evt.target,
                tr = DOM.parent(target,'tr'),
                id = DOM.attr(tr,User_ID_ATTR)
                setting = S.clone(PWD_DIALOG_SETTING);
            setting = S.merge(setting,{
                content:'<div style="padding-left:20px;padding-top:20px;"><form class="pwd-form"><span>请输入新密码：</span><input type="password" data-valid-rule="isPassword" id="J_resetPwd" class="newText"><br/><span>请再输入一遍密码：</span><input class="newText" data-valid-rule="isPassword&require(J_resetPwd)&equal(J_resetPwd)" type="password"></form></div>',
                footer:{
                    btns:[{
                        text:'确定',
                        clickHandler:function(e,me){
                            var content = $(me.opts.content),
                                newPassword = $(content).one('#J_resetPwd').val();
                            that.resetPwdIO({id:id,newPassword:newPassword},function(code,errMsg){
                                if(code = true){
                                    PW.dialog.alert(TIP.reset_success);
                                    me.close();
                                }else{
                                    PW.dialog.alert(errMsg);
                                }
                            });
                           
                        }
                    },{
                        text:'取消',
                        clickHandler:function(e,me){
                            me.close();
                        }
                    }]
                }
            });

            PW.dialog.open(setting);
            that.pwdForm = PW.mod.Defender('.pwd-form',{theme:'inline'});
        },
        /**
         * 修改用户状态
         * @return {[type]}           [description]
         */
        _changeUserState:function(stateEl){
            var
                that = this,
                state = DOM.html(stateEl);
            if(state == TIP.lock_tip){
                //设置为解冻状态
                DOM.html(stateEl,TIP.unlock_tip);
            }else{
                //设置为冻结状态
                DOM.html(stateEl,TIP.lock_tip);
            }
        }

    });
    return UserManage;
},{
	requires:['core','mod/ext','mod/juicer','mod/dialog','mod/defender']
});