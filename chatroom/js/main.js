/*
* @Author: SunshineLXH
* @Date:   2016-06-23 19:38:12
* @Last Modified by:   SunshineLXH
* @Last Modified time: 2016-06-27 08:13:51
*/

$(function(){
	//1.发送内容 验证是否为空，不为空，发送，否则，提示

	$("#Button1").bind("click", function(){
		var $content = $("#txtContent"); //发送内容
		if ($content.val() != "") 
			SendContent($content.val());
		else {
			alert("发送不能为空！");
			$content.focus();
			return false;
		}
	});

	//2.显示表情图标，并将表情图标的ID号显示在文本框中。
	
	//var $a = "<img src='url' />";
	//$("#c").html($a); 
	
	InitFace();
	$("table tr td img").click(function() { //表情图标单击事件
		var strContent = $("#txtContent").val() + "<:" + this.id + ":>";
		$("#txtContent").val(strContent);
	});

	//3.定时获取最新聊天内容和当前在线的用户信息
	AutoUpdContent();
	var hander = setInterval("AutoUpdContent()", 5000); //执行定时获取函数

	//元素绑定全局ajaxStart事件
	$("#divMsg").ajaxStart(function(){
		$(this).show().html("正在发送数据..."); //显示元素
	});
	//元素绑定全局ajaxStop事件
	$("#divMsg").ajaxStop(function(){
		$(this).html("已完成").hide();
	});
});

//自定义设置表情图标函数
//无参数
function InitFace(){
	var strHTML = "";
	for (var i = 1; i <= 10; i++) {
		strHTML += "<img src='Face/" + i + ".gif' id='" + i +"'/>";
	}
	$("#divFace").html(strHTML);
}

//自定义返回聊天内容函数
//参数data为返回的聊天内容数据
function GetMessageList() {
	$.ajax({
		type: "GET",
		url: "index.php",
		data: "action=ChatList&d=" + new Date(),
		success: function(data) {
			$("#divContent").html(data);
		}
	});
}

//自定义返回在线人员函数
//参数data为返回的在线人员数据
function GetOnLineList() {
	$.ajax({
		type: "GET",
		url: "index.php",
		data: "action=OnLineList&d=" + new Date(),
		success: function(data) {
			$("#divOnLine").html(data);
		}
	});
}

//自定义定时执行返回聊天内容与在线人员函数
//无参数
function AutoUpdContent(){
	GetMessageList();
	GetOnLineList();
}

//自定义发送聊天内容函数
//参数content为聊天内容
function SendContent(content){
	$.ajax({
		type: "GET",
		url: "index.php",
		data: "action=SendContent&d=" + new Date() + "&content" + content,
		success: function(data){
			if (data === "1") {
				GetMessageList();
				$("#txtContent").val("");
			}
			else {
				alert("发送失败！");
				return false;
			}
		}
	});
}