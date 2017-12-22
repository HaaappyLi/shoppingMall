/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:44:40
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-22 21:56:17
*/
var _mm = require('util/mm.js')
var _user = {
	//用户登录
    login: function(userInfo, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/login.do'),
	        data: userInfo,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    },
    register: function(userInfo, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/register.do'),
	       	data: userInfo,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    },
    //获取用户密码提示问题
    getQuestion: function(username, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/forget_get_question.do'),
	       	data: {
	       		username: username
	       	},
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    },
    //检查密码提示问题答案
    checkAnswer: function(userInfo, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/forget_check_answer.do'),
	       	data: userInfo,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    }, 
    //重置密码
    resetPassword: function(userInfo, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/forget_reset_password.do'),
	       	data: userInfo,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    }, 
    //获取用户信息
    getUserInfo: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerURL('/user/get_information.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//更新个人信息
	updateUserInfo: function(userInfo, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/update_information.do'),
	       	data: userInfo,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    }, 
    //登录状态下更新密码
    updateUserPassword: function(userInfo, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/reset_password.do'),
	       	data: userInfo,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    }, 
	//登出
	logout: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerURL('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//检查登录状态，如果拿到用户信息，说明有登录状态
	checkLogin: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerURL('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//检查用户名是否存在
	checkUsername: function(username, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerURL('/user/check_valid.do'),
	        data: {
	        	type: 'username',
	        	str: username
	        },
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
    }
}
module.exports = _user;