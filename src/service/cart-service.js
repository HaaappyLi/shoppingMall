/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:44:40
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-20 20:41:50
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
	}
}
module.exports = _cart;