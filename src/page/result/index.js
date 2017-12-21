/*
* @Author: 何佩莉
* @Date:   2017-12-20 20:50:00
* @Last Modified by:   何佩莉
* @Last Modified time: 2017-12-21 10:27:13
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // if(type === 'payment'){
    //     var orderNumber  = _mm.getUrlParam('orderNumber'),
    //         $orderNumber = $element.find('.order-number');
    //     $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    // }
    // 显示对应的提示元素
    $element.show();
})
