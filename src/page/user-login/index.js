/*
* @Author: 何佩莉
* @Date:   2017-12-18 14:03:12
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-21 20:10:59
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
var formError = {
	show: function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function() {
		$('.error-item').hide().find('.err-msg').text('');
	}
};
//page逻辑部分
var page = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		//登录按钮的提交
		$('#submit').click(function() {
			_this.submit();
		});
		//按回车也提交
		$('.user-content').keyup(function(e) {
			if(e.keyCode === 13) {
				_this.submit();
			}
		})
	},
	//提交表单
	submit: function() {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status) {
			//提交
			_user.login(formData, function(res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html'
			},function(errMsg) {
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证,成功就验证成功，失败的话给出错误信息
	formValidate: function(formData) {
		var result = {
			status: false,
			msg: ''
		};
		if(!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
}

$(function(){
    page.init();
});