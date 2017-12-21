/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:44:40
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-20 20:41:34
*/
var _mm = require('util/mm.js')
var _user = {
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
	}
}
module.exports = _user;