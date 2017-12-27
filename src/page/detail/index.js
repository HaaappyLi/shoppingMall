/*
* @Author: 何佩莉
* @Date:   2017-12-26 21:28:11
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-27 12:43:10
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		productId : _mm.getUrlParam('productId') || ''
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		//判断productId有没有传过来
		if(!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: function() {
		var _this = this;
		//图片预览
		$(document).on('mouseenter', '.p-img-item', function() {
			//取出当前图片地址
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imageUrl);
		});
		//count加减操作
		$(document).on('click', '.p-count-btn', function() {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			//input输入框缓存
			var $pCount = $('.p-count');
			var currCount = parseInt($pCount.val());
			var minCount = 1;
			var maxCount = _this.data.detailInfo.stock || 1;
			if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
	    });
	    // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });

	},
	//加载商品详情数据
	loadDetail: function() {
		var _this = this;
		var html = '';
		var $pagewrap = $('.page-wrap');
		// loading
		$pagewrap.html('<div class="loading"></div>');
		//请求detail信息
		_product.getProductDetail(this.data.productId, function(res) {
			//过滤数据
			_this.filter(res);
			//缓存detail的数据
			_this.data.detailInfo = res;
			//render
			html = _mm.renderHtml(templateIndex, res);
			$pagewrap.html(html);
		}, function(errMsg) {
			$pagewrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});
	},
	//数据匹配
	filter: function(data) {
		data.subImages = data.subImages.split(',');
	}
};
$(function() {
	page.init()
});