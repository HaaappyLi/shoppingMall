/*
* @Author: 何佩莉
* @Date:   2017-12-22 15:52:55
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-22 18:11:38
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
	},
	onLoad: function() {
		//初始化左侧菜单，点亮用户中心
		navSide.init({
			name:'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
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
	}
}

$(function(){
    page.init();
});