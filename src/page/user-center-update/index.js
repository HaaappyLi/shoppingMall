/*
* @Author: 何佩莉
* @Date:   2017-12-22 15:52:55
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-22 20:37:00
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//引入模板
var templateIndex = require('./index.string');

var page = {
	init: function() {  
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		//初始化左侧菜单，点亮用户中心
		navSide.init({
			name:'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	bindEvent: function() {
		var _this = this;
		//点击提交后的动作
		$(document).on('click', '.btn-submit', function() {
			var userInfo = {
				//获取输入的信息
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val())
			}, 
			//拿到验证输入是否合法
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status) {
				//更改用户信息，提示成功，跳回个人中心
				_user.updateUserInfo(userInfo, function(res,msg) {
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				});
			}else {
				_mm.errorTips(validateResult.msg);
			}
		})
	},
	//加载用户信息
	loadUserInfo: function() {
		var userHtml = ' ';
		_user.getUserInfo(function(res) {
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg) {
			_mm.errorTips(errMsg);
		});
	},
	//验证字段信息
	validateForm: function(formData) {
		var result = {
			status: false,
			msg: ''
		};
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