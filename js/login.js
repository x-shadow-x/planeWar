// by firefoxmmx
var script1=document.createElement("script");
script1.type="text/javascript";
script1.src="js/jquery-1.11.3.js";
document.getElementsByTagName('head')[0].appendChild(script1);

var script2=document.createElement("script");
script2.type="text/javascript";
script2.src="jQueryUI/jquery-ui.min.js";
document.getElementsByTagName('head')[0].appendChild(script2);

var script3=document.createElement("script");
script3.type="text/javascript";
script3.src="formValidator/formValidator-4.0.1.min.js";
document.getElementsByTagName('head')[0].appendChild(script3);

var script4=document.createElement("script");
script4.type="text/javascript";
script4.src="formValidator/formValidatorRegex.js";
document.getElementsByTagName('head')[0].appendChild(script4);

var script5=document.createElement("script");
script5.type="text/javascript";
script5.src="jQueryForm/jquery.form.js";
document.getElementsByTagName('head')[0].appendChild(script5);


$(document).ready(function(){
	$("#loginDialog").dialog({
			title:"用户登录",
			autoOpen:true,
			modal:true,
			width:450,
			buttons:[
				{
					text:"登录",
					click:function(){
						//点击登录按钮后做的操作
						$("#loginForm").ajaxForm({
							url:"login.php",
							type:"POST",
							data:$("#loginForm").serialize(),
							success:function(responseText,textStatus,xhr,$form){
								//responseText就是响应数据
								//登录成功就显示开始游戏界面

							}
						});
					}
				}
			]
		});
		//表单验证
		$.formValidator.initConfig({
			vaildatorGroup:"1"
		});
		$("#loginName").formValidator({
			vaildatorGroup:"1",
			onShow:"请输入用户名",
			onFocus:"请输入用户名",
		}).inputValidator({
			min:1,
			onError:"用户名不能为空"
		});
		$("#loginPwd").formValidator({
			vaildatorGroup:"1",
			onShow:"请输入密码",
			onFocus:"请输入密码",
		}).inputValidator({
			min:1,
			onError:"密码不能为空"
		});
});


		