/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:44:40
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-28 09:29:25
*/
var _mm = require('util/mm.js')
var _product = {
	//获取商品列表
    getProductList: function(listParam, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/product/list.do'),
	        data: listParam,
	        success: resolve,
	        error: reject
	    });
    },
    getProductDetail: function(productId, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/product/detail.do'),
	        data: {
	        	productId: productId
	        },
	        success: resolve,
	        error: reject
	    });
    }
}
module.exports = _product;