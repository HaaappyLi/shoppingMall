/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:44:40
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-27 12:33:25
*/
var _mm = require('util/mm.js')
var _cart = {
	//获得购物车数量
	getCartCount: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerURL('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		});
	},
	//添加到购物车
	addToCart: function(productInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerURL('/cart/add.do'),
			data:productInfo,
			success: resolve,
			error: reject
		});
	}
}
module.exports = _cart;