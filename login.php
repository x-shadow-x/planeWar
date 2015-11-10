<?PHP
	$loginName = $_REQUEST["loginName"];
	$password = $_REQUEST["loginPwd"];
	if($loginName == "myAdmin" && $password == "123456"){
		echo "success";
	}else{
		echo "error";
	}
?>