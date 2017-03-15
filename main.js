function getResponse(url,type,callback){
	var request=new XMLHttpRequest();
	request.responseType=type;
	request.open('GET',url);
	request.onreadystatechange=function(){
		if(this.readyState===4&&this.status===200){
			var response=this.response;
			callback(response);
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

function Refresh(){
	document.querySelector('.right').innerHTML='';
	function callback(response){
 		var right=document.querySelector('.right');
 		var a1=response.querySelectorAll('a');
 		var p1=response.querySelectorAll('p');
 		for(let i=0;i<a1.length;i++){
 			let div=document.createElement('div');
 			let a=document.createElement('a');
 			let p=document.createElement('p');
 			a.innerHTML=a1[i].innerHTML;
 			p.innerHTML=p1[i].innerHTML;
 			a.className='Id';
 			a.onclick=getDetail;
 			a.href="javascript:void(0)";
 			p.className='Title';
 			div.appendChild(a);
 			div.appendChild(p);
 			right.appendChild(div);
 		}
 	}
	getResponse('main.php','document',callback);
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
	var url='detail.php?q='+this.innerHTML;
	getResponse(url,'document',callback);
}