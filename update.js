function text_clear(){
	document.querySelector('#title').value="";
	document.querySelector('#article').value="";
	alert("你会删除所有内容");
}


function detail_test(event){
	$title=document.querySelector('#title');
	$article=document.querySelector('#article');
	if($title.value==''||$article.value==''){
		alert('提交内容为空!提交失败！');
		event.preventDefault();
	}
}