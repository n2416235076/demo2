<?php  
	header("Content-Type:text/html;charset=utf-8");
	echo '你好';
	$action = isset($_GET['action']) ? $_GET['action'] : false;

	if($action){
		var_dump($action);
		echo join_encode($action);
		exit;
	}

?>