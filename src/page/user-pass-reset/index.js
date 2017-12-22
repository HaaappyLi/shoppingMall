/*
* @Author: 何佩莉
* @Date:   2017-12-18 14:03:12
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-21 21:06:59
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this = this;

		//第一步按钮的点击
		$('#submit-username').click(function() {
			var username = $.trim($('#username').val());
			//用户名存在
			if(username) {
				_user.getQuestion(username, function(res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(errMsg) {
					formError.show(errMsg);
				})
			}
			// 用户名不存在
			else{
				formError.show('请输入用户名');
			}
		});

		//第二步按钮的点击
		$('#submit-question').click(function() {
			var answer = $.trim($('#answer').val());
			//答案存在
			if(answer) {
				//检查密码提示问题答案
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res) {
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				}, function(errMsg) {
					formError.show(errMsg);
				})
			}
			// 用户名不存在
			else{
				formError.show('请输入密码提示问题答案');
			}
		});

		//第三步按钮的点击
		$('#submit-password').click(function() {
			var password = $.trim($('#password').val());
			if(password  && password.length >= 6) {
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function(res) {
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg) {
					formError.show(errMsg);
				})
			}
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
		
	},
	//加载输入用户名的步骤
	loadStepUsername: function() {
		$('.step-username').show();
	},
	loadStepQuestion: function() {
		//清除错误提示
		formError.hide();
		//做容器切换
		$('.step-username').hide().siblings('.step-question').show()
		.find('.question').text(this.data.question);
	},
	loadStepPassword: function() {
		//清除错误提示
		formError.hide();
		//做容器切换
		$('.step-question').hide().siblings('.step-password').show();
	}
	
};

$(function(){
    page.init();
});