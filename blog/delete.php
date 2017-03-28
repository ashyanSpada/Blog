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
	$Id=$_GET['q'];
	$sql="DELETE FROM `blog` WHERE `blog`.`Id` = '$Id'";
	$con->query($sql,'blog');

	 ?>