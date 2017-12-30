/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:44:40
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-28 14:56:41
*/
var _mm = require('util/mm.js');

var _cart = {
	//获得购物车数量
	getCartCount: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		});
	},
	//添加到购物车
	addToCart: function(productInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/add.do'),
			data:productInfo,
			success: resolve,
			error: reject
		});
	},
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
	updateProduct: function(productInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/update.do'),
			data:productInfo,
			success: resolve,
			error: reject
		});
	},
	//勾选商品
	selectProduct: function(productId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/select.do'),
			data    : {
                productId : productId
            },
			success: resolve,
			error: reject
		});
	},
	//取消勾选
	unselectProduct: function(productId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/un_select.do'),
			data    : {
                productId : productId
            },
			success: resolve,
			error: reject
		});
	},
	//选中全部商品
	selectAllProduct: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/select_all.do'),
			success: resolve,
			error: reject
		});
	},
	//取消全选
	unselectAllProduct: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/un_select_all.do'),
			success: resolve,
			error: reject
		});
	},
	//删除商品
	deleteProduct : function(productIds, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    }
	
}
module.exports = _cart;