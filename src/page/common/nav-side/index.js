/*
* @Author: 何佩莉
* @Date:   2017-12-19 17:18:58
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-20 20:25:10
*/
require('./index.css');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');

//侧边导航
var navSide = {
	 option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href: './about.html'}
        ]
    },
    //将用户传入的option与默认的option合并
	init: function(option){
		//合并选项
		$.extend(this.option, option);
		this.renderNav();
	},
	//渲染导航菜单，判断哪一条被置为active
	renderNav: function() {
		//根据name判断是否一样，再渲染到页面
		//计算active数据
		for(var i=0, iLength = this.option.navList.length; i<iLength; i++) {
			if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
		}
		//渲染list数据
		var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        //把html放入容器
        $('.nav-side').html(navHtml);
	}
}
module.exports = navSide;