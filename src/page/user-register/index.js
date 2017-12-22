/*
* @Author: 何佩莉
* @Date:   2017-12-18 14:03:12
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-21 20:11:24
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
		//验证username
		$('#username').blur(function() {
			var username = $.trim($(this).val());
			//如果用户名为空，不做验证
			if(!username) {
				return;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username, function(res) {
				formError.hide();
			},function(errMsg) {
				formError.show(errMsg);
			})
		});
		//注册按钮的提交
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
			password: $.trim($('#password').val()),
			passwordConfirm: $.trim($('#password-confirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#question').val()),
			answer: $.trim($('#answer').val())
		};
		validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status) {
			//提交
			_user.register(formData, function(res) {
				window.location.href = './result.html?type=register';
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
		if(formData.password.length < 6) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if(formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		if(!_mm.validate(formData.phone,'phone')) {
			result.msg = '手机号格式错误';
			return result;
		}
		if(!_mm.validate(formData.email,'email')) {
			result.msg = '邮箱格式错误';
			return result;
		}
		if(!_mm.validate(formData.question,'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_mm.validate(formData.answer,'require')) {
			result.msg = '密码提示问题答案不能为空';
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