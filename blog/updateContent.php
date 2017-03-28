<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<?php
		class connect{
			protected $servername;
			protected $username;
			protected $password;
			public function __construct($servername,$username,$password){
				$this->servername=$servername;
				$this->username=$username;
				$this->password=$password;
			}
			public function query($sql,$dbname){
				$con=mysql_connect($this->servername,$this->username,$this->password);
				mysql_query("set names 'utf8'");
				mysql_selectdb($dbname,$con);
				$response=mysql_query($sql);
				return $response;
			}
		}
		$con=new connect('localhost','root','zqr3344');
        $id=$_POST['id'];
        $title=$_POST['title'];
        $article=$_POST['article'];
        $sql="UPDATE `blog` SET `Title`='$title',`Article`='$article'
        WHERE `Id`='$id'";
        $con->query($sql,'blog'); 
        echo $_POST['id'].'</br>';
		echo $_POST['title'].'</br>';
		echo $_POST['article'];
	 ?>
</body>
</html>