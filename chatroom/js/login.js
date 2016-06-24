/*
* @Author: SunshineLXH
* @Date:   2016-06-23 18:51:06
* @Last Modified by:   SunshineLXH
* @Last Modified time: 2016-06-23 19:53:28
*/

'use strict';
$(function(){
	//元素绑定全局ajaxStart事件
	$("#divMsg").ajaxStart(function(){
		$(this).show().html("正在发送登录请求..."); //显示元素
	});

	//元素绑定全局ajaxStop事件
	$("#divMsg").ajaxStop(function(){
		$(this).html("请求处理已完成。").hide();
	});

	$("#Button1").bind("click", function(){
		var $name = $("#txtName"); //username
		var $pass = $("#txtPass"); //password
		if ($name.val() != "" && $pass.val() != "") 
			UserLogin($name.val(), $pass.val());
		else {
			if ($name.val() === "") {
				alert("用户名不能为空！");
				$name.focus();
				return false;
			}
			else {
				alert("密码不能为空！");
				$pass.focus();
				return false;
			}
		}
	});
});

function UserLogin(name, pass){
	$.ajax({
		type: "GET",
		url: "index.php",
		data: "action=Login&d=" + new Date() + "&name=" + name + "&pass=" + pass,
		success: function(){
			if (data == "1") 
				window.location = "main.html";
			else {
				alert("用户名和密码错误！");
				return false;
			}
		}
	});
}