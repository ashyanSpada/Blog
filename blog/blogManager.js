var args={};
function getResponse(url,type,callback,container,manageType){
	var request=new XMLHttpRequest();
	request.responseType=type;
	request.open('GET',url);
	request.onreadystatechange=function(){
		if(this.readyState===4&&this.status===200){
			var response=this.response;
			callback(response,container,manageType);
			request.abort();
		}
	};
	if(type==="text"){
		request.setRequestHeader("Content-Type","text/plain");
	}else if(type==="json"){
		request.setRequestHeader("Content-Type","application/json");
	}else if(type==="document"){
		request.setRequestHeader("Content-Type","text/html");
	}else if(type==="blob"){
		request.setRequestHeader("Content-Type","text/xml");
	}
	request.send();
}
function postResponse(url,type,postData,callback){
	var request=new XMLHttpRequest();
	request.responseType=type;
	request.open('POST',url);
	request.onreadystatechange=function(){
		if(this.readyState===4&&this.status===200){
			var response=request.response;
			callback(response);
		}
	}
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(postData);
}
function callback(response,container,manageType){
    var container=document.querySelector(container);
    var p1=response.querySelectorAll('p');
    var a1=response.querySelectorAll('a');
    var article1=response.querySelectorAll('article');
    for(let i=0;i<a1.length;i++){
    	let div=document.createElement('div');
    	div.className='container';
		let a=document.createElement('a');
		a.innerHTML=p1[i].innerHTML;
		a.data=a1[i].innerHTML;
		a.onclick=getDetail;
		a.href='javascript:void(0)';
		a.className='id';
		div.appendChild(a);
		/**let p=document.createElement('p');
		p.innerHTML=p1[i].innerHTML;
		p.className='title';
		div.appendChild(p);**/
		switch(manageType){
			case 1:
				let article=document.createElement('article');
				article.innerHTML=article1[i].innerHTML;
				article.className='article';
				div.appendChild(article);
				break;
			case 2:
				let button_1=document.createElement('button');
				button_1.innerHTML='编辑';
				button_1.onclick=editDetail;
				button_1.className='editButton';
				div.appendChild(button_1);
				let button=document.createElement('button');
				button.innerHTML='删除';
				button.onclick=deleteDetail;
				button.className='deleteButton';
				div.appendChild(button);
				break;
			default:
				break;
		}
        container.appendChild(div);
    }
}
function deleteDetail(){
    function callback(response){
    	
    }
	alert('Are you sure to delete this article?');
	var Id=this.parentNode.querySelector('a').data;
	this.parentNode.parentNode.removeChild(this.parentNode);
	var url='delete.php?q='+Id;
	getResponse(url,'document',callback);
}
function editDetail(){
	var Id=this.parentNode.querySelector('a').data;
	args.id=Id;
	function callback(response){
		var body=document.querySelector('.body');
		body.parentNode.removeChild(body);
		let div=document.createElement('div');
		div.className='body';
		let title=document.createElement('textarea');
		let article=document.createElement('textarea');
		title.className='title';
		article.className='article';
		title.value=response.querySelector('p').innerHTML;
		article.value=response.querySelector('article').innerHTML;
		div.appendChild(title);
		div.appendChild(article);
		var footer=document.querySelector('.footer');
		footer.parentNode.insertBefore(div,footer);
		let button=document.createElement('button');
		button.className='updateButton';
		button.innerHTML='内容更新';
		button.onclick=updateArticle;
		footer.appendChild(button);
	}
	getResponse('select.php?q='+Id,'document',callback);
}
function getDetail(){
	function callback(response){
  		var right=document.querySelector('.right');
  		var aDetail=response.querySelector('a').innerHTML;
  		var pDetail=response.querySelector('p').innerHTML;
  		var aNode=document.createElement('a');
  		var pNode=document.createElement('p');
  		aNode.innerHTML=aDetail;
  		pNode.innerHTML=pDetail;
  		aNode.className='aNode';
  		pNode.className='pNode';
  		right.innerHTML="";
  		right.appendChild(aNode);
  		right.appendChild(pNode);
	}
	var url='select.php?q='+this.data;
	getResponse(url,'document',callback);
}
window.onload=function(){
	getResponse('select.php','document',callback,'.body',2);
}
function updateArticle(){
	var title=document.querySelector('.title');
	var article=document.querySelector('.article');
	var postData='id='+args.id+'&title='+title.value+'&article='+article.value;
	console.log(article.value);
	var url='updateContent.php';
	function callback_1(){

	}
	postResponse(url,'document',postData,callback_1);
	alert('修改成功');
	title.parentNode.removeChild(title);
	article.parentNode.removeChild(article);
	var button=document.querySelector('.updateButton');
	button.parentNode.removeChild(button);
	getResponse('select.php','document',callback,'.body',2);
}