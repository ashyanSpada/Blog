<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>update</title>
	<link rel="stylesheet" type="text/css" href="update.css">
	<script src="update.js"></script>
</head>
<body>
	<div class="header">
		<a href="main.html" class="a_1">首页</a>
		<a href="blogWriting.php" class="a_2">写博客</a>
		<a href="blogManager.php" class="a_3">管理</a>
	</div>
	<form method="POST" action="insert.php" class="form">
	    <div class="body">
			<p class='headerWord'>开始写作吧</p>
			<input type="text" name="title" class="title" id="title" autocomplete="off" value='标题'>
			<textarea name="article" class="article" id="article"></textarea value='正文'>
		</div>
		<div class="footer">
			<button type="submit" class="submit" id="submit" onclick="detail_test(event)">提交</button>
			<button type="button" onclick="text_clear()" class="button">清除</button>
		</div>
	</form>
</body>
</html>