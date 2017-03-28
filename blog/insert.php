s<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>update</title>
</head>
<body>
	<?php  
    class sql{
    	protected $servername;
    	protected $username;
        protected $password;
    	public function __construct($servername,$username,$password){
    		$this->servername=$servername;
    		$this->username=$username;
            $this->password=$password;
    	}
    	public function query($sql,$dbname){
    		$db=mysql_connect($this->servername,$this->username,$this->password);
    		mysql_query("set names 'utf8'");
    		mysql_selectdb($dbname,$db);
    		$request=mysql_query($sql);
    		return $request;
    	}
    }
    $Id=mt_rand(1000,9999);
    echo $Id;
    $title=$_POST['title'];
    $article=$_POST['article'];
    $sql="INSERT INTO `blog` (`Id`, `Title`, `Article`) VALUES ('$Id', '$title', '$article')";
    $res=new sql('localhost','root','zqr3344');
    $res->query($sql,'blog');
    $s='comment'.$Id;
    $sql="CREATE TABLE `blog`.`$s` ( `number` INT(255) NOT NULL , `comment` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL , `type` BOOLEAN NOT NULL DEFAULT TRUE , PRIMARY KEY (`number`)) ENGINE = InnoDB";
    $res->query($sql,'blog');
	?>
</body>
</html>