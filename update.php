<!DOCTYPE html>
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
    echo $title.'<br/>'.$article;
    $sql="INSERT INTO `blog` (`Id`, `Title`, `Article`) VALUES ('$Id', '$title', '$article')";
    $res=new sql('localhost','root','zqr3344');
    $res->query($sql,'blog');



	?>
</body>
</html>