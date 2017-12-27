/*
* @Author: 何佩莉
* @Date:   2017-12-19 16:51:27
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-23 19:56:20
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./index.string');

$(function() {
	//渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	//初始化banner，变量前加$表示它是一个jquery对象
    var $slider = $('.banner').unslider({
    	dots: true
    });
    //事件绑定，轮播图的前进后退
    $('.banner-con .banner-arrow').click(function() {
    	var forword = $this.hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forword]();
    })

});