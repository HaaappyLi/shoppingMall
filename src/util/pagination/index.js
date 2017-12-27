/*
* @Author: 何佩莉
* @Date:   2017-12-24 10:52:46
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-26 10:58:18
*/
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');


//定义类
var Pagination = function() {
	var _this = this;
	this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    //事件的处理，用事件代理，不能用事件绑定
    $(document).on('click', '.pg-item', function() {
    	//判断点击是否有效,对active与disabled按钮的点击不做处理
    	var $this = $(this);
    	if($this.hasClass('active') || $this.hasClass('disabled')) {
    		return;
    	}
    	//正常的点击
    	typeof _this.option.onSelectPage === 
    		'function' ? _this.option.onSelectPage($this.data('value')) : null;
    });
}
//渲染分页组件
Pagination.prototype.render = function(userOption) {
	//合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断container是否是合法的jquery的对象
	if(!(this.option.container instanceof jQuery)) {
		return;
	}
	//判断页数是否只有1页
	if(!this.option.pages === 1) {
		return;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());

};
//获取分页的html   |上一页|  2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function() {
	var html = '',
		option = this.option,
		pageArray = [],
		start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
        end   = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;

		//上一页按钮的数据
		pageArray.push({
			name: '上一页',
			value: this.option.prePage,
			disabled: !this.option.hasPreviousPage
		});
		//数字按钮的处理
		for(var i = start; i <= end; i++) {
			pageArray.push({
				name: i,
				value: i,
				active: (i === option.pageNum)
			});
		};
		//下一页按钮的数据
		pageArray.push({
			name: '下一页',
			value: this.option.nextPage,
			disabled: !this.option.hasNextPage
		});
		html = _mm.renderHtml(templatePagination, {
			pageArray: pageArray,
			pageNum: option.pageNum,
			pages:option.pages
		});
		return html;
}

module.exports = Pagination;