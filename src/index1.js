//自定的模块文件
import sum from './my-math';
//npm 引入的模块
import $ from 'jquery';
//将$挂载到全局环境
import "expose-loader?$!jquery";
//数据的直接引入
import users from './users.json';
//引入css
import './main.css';
//引入图片文件
import google from './google.ico';

//展示资源的使用方法
console.log(users);
console.log(sum(1,7));
$(function () {
    $("<img>").attr("src",google).appendTo($("#rs"));
    $("li").addClass("tip");
})

