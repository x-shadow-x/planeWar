<?PHP
	$userName = $_REQUEST["userName"];//userName是客户端输入用户名的表单控件的name属性值
	//下面的操作只是写一个用户名模拟~真是情况是要到数据库去查询传进来的用户名有无重复
	if($userName=="myAdmin"){
		echo "error";
	}else{
		echo "success"
	}
?>