var args=[];
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
/**刷新主页面函数**/
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
				let button=document.createElement('button');
				button.innerHTML='删除';
				button.onclick=deleteDetail;
				button.className='deleteButton';
				div.appendChild(button);
				let button_1=document.createElement('button');
				button_1.innerHTML='编辑';
				button_1.onclick=editDetail;
				button_1.className='editButton';
				div.appendChild(button_1);
				break;
			default:
				break;
		}
        container.appendChild(div);
    }
}

function Refresh(){
	document.querySelector('.right').innerHTML='';
	getResponse('select.php','document',callback,'.right',1);
}

/**获取文章函数**/
function getDetail(){
	function callback(response){
  		var right=document.querySelector('.right');
  		var aDetail=response.querySelector('p').innerHTML;
  		var pDetail=response.querySelector('article').innerHTML;
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
	args.id=this.data;
	console.log(args.id);
	setInterval(getComment,2000);
	if(!document.querySelector('.footer button')){
		addCommentFrame('.footer');
	}
}
function deleteDetail(){
    function callback(response){
    	
    }
	alert('Are you sure to delete this article?');
	var Id=this.parentNode.querySelector('a').data;
	this.parentNode.innerHTML='';
	var url='delete.php?q='+Id;
	getResponse(url,'document',callback);
}

window.onload=function(){
	getResponse('select.php','document',callback,'.left',0);
	getResponse('select.php','document',callback,'.right',1);
}
function addCommentFrame(container){
	var element=document.querySelector(container);
	let p=document.createElement('p');
	p.innerHTML='回复';
	p.className='font_p';
	element.appendChild(p);
	let comment=document.createElement('textarea');
	comment.className='comment';
	element.appendChild(comment);
	let button=document.createElement('button');
	button.className='button';
	button.innerHTML='回复';
	button.onclick=commentUpload;
	button.type='button';
	element.appendChild(button);
}
function commentUpload(){
	var comment=this.parentNode.querySelector('textarea');
	var url='insertComment.php?q='+comment.value+'&id='+args.id;
	getResponse(url,'document',callback);
	comment.value='';
	alert('回复成功，感谢您的参与！');
}
function getComment(){
	var url='selectComment.php?id='+args.id;
	function callback(response){
		var a=response.querySelectorAll('a');
		var p=response.querySelectorAll('p');
		for(let i=0;i<a.length;i++){
			let p1=document.createElement('p');
			p1.innerHTML=p[i].innerHTML;
			p1.data=a[i].innerHTML;
			p1.className='barrage';
			p1.style.position='absolute';
			p1['style']['top']=(i*20)+'px';
			let j=0;
			var timer=setInterval(function(){
    			if(j<800){
    				p1['style']['right']=(j++)+'px';
    			}else if(j=800){
    				p1.parentNode.removeChild(p1);
    				clearInterval(timer);
    			}
    		},10);
    		document.querySelector('.body').appendChild(p1);
		}
	}
	getResponse(url,'document',callback);
}