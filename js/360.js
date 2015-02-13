/*
*/
var rotate;
var popup, text, _close;
var isPopup = false;

function popup1(){
	//alert('shownow1');
	rotate.rotateTo(10,1);
	//createPopup(1);
};

function popup2(){
	//alert('shownow2');
	rotate.rotateTo(0,2);
	//createPopup(2);
};

function popup3(){
	//alert('shownow3');
	rotate.rotateTo(0,3);
	//createPopup(3);
};

function createPopup(n){
	var k1 ='popup'+ _close.id;
	popup.classList.remove(k1);
	_close.id = n;
	text.src = 'img/popup'+n+'.png';
	isPopup = true;
	var k = 'popup'+n;
	popup.classList.add(k);
	document.body.appendChild(popup);	
}

function Move360(div,imgFolder,imgCount,style){
	var my = this;
	this.div = div;
	this.imgFolder = imgFolder;
	this.imgCount = imgCount;
	this.img = [];
	this.imgDiv = null;
	this.index = 0;
	this.style = style;
	this.x; this.dx; this.timer;
	this.move1 = true;
	this.move2 = true;
	this.init = function(){
		for(var i=0; i< my.imgCount; i++){
			my.img[i] = new Image();
			my.img[i].src = my.imgFolder+(i)+'.jpg';
		}
		my.imgDiv = document.createElement('img');
		my.imgDiv.className = my.style;
		my.imgDiv.src = my.img[0].src;
		my.imgDiv.useMap = 'map0';
		my.div.appendChild(my.imgDiv);
		my.imgDiv.addEventListener('touchstart', my.TouchStart, false);
		my.imgDiv.addEventListener('touchmove', my.TouchMove, false);
		my.imgDiv.addEventListener('touchend', my.TouchEnd, false);
		my.imgDiv.addEventListener('mousedown', my.TouchStart, false);
		my.imgDiv.addEventListener('movemove', my.TouchMove, false);
		my.imgDiv.addEventListener('mouseup', my.TouchEnd, false);
		my.AutoRotate();
	};
	
	this.AutoRotate = function(){
		if(my.index>=my.imgCount-1) my.index = 0;
		else my.index = my.index + 1;
		my.imgDiv.src = my.img[my.index].src;
		my.imgDiv.useMap = 'map'+(my.index);
		my.timer = setTimeout(my.AutoRotate,80,my);
	};

	this.TouchStart = function(e){
		e.preventDefault();

		clearTimeout(my.timer);

		if (e.clientX) {
			my.x = e.clientX;
		}
		else
		{
			my.x = e.changedTouches[0].clientX;

		}
		
		//y = e.changedTouches[0].clientY;
		//y = e.clientY;
		my.move1 = true;
	
	};
	this.TouchMove = function(e){
		e.preventDefault();
		if(isPopup==true) closePopup();
		var x = 0;
		
		if (e.clientX) {
			x = e.clientX;
		}
		else
		{
			x = e.changedTouches[0].clientX;
		}
				
		if(my.move1 == true){
			my.dx = x - my.x;	
			var m = parseInt(Math.abs(my.dx)/12);
			// Move left
			if(my.dx < 0){
				my.index = my.index - m;
				if(my.index<0) my.index = my.imgCount-1;
			}
			if(my.dx > 0){
				my.index = my.index + m;
				if(my.index>my.imgCount) my.index = 0;
			} 
			my.x = x;	
			my.imgDiv.src = my.img[my.index].src;
			my.imgDiv.useMap = 'map'+(my.index);
			
			
		}
	};
	
	this.TouchEnd = function(){
	};
	
	this.rotate1 = function(b,n){			
		if(my.index==b){
			clearTimeout(my.timer);			
			createPopup(n);
			return;
		}
		else if(b>my.index)my.index = my.index+1;
		else my.index = my.index-1;
		my.imgDiv.src = my.img[my.index].src;
		my.imgDiv.useMap = 'map'+(my.index);
		
		my.timer = setTimeout(my.rotate1,30,b,n,my);
	};
	
	this.rotate2 = function(b){	
		if(my.index==b){
			clearTimeout(my.timer);	
			return;
		}
		if(my.index<1) my.index = my.imgCount-1;
		else my.index = my.index-1;
		my.imgDiv.src = my.img[my.index].src;
		my.imgDiv.useMap = 'map'+(my.index);
		
		my.timer = setTimeout(my.rotate2,30,my);
	};
	
	this.rotateTo = function(b,n){
		//if(Math.abs(b-my.index)>30) my.rotate1(b);
		//else my.rotate2(b);
		my.rotate1(b,n);
		
	};	
	
	this.init();
	 
}





function closePopup(){
	document.body.removeChild(popup);
	var n ='popup'+ _close.id;
	isPopup = false;
	popup.classList.remove(n);
}



window.onload = function(){
	document.body.addEventListener('touchmove', function(e){e.preventDefault();},false);
	var div = document.body;
	var style = 'imgDiv';
	var imgFolder = 'img/seri/';
	var imgCount = 60;
	popup = document.createElement('div');
	popup.classList.add('popup');
	var div1 = document.createElement('div');
	div1.classList.add('black');
	text = document.createElement('img');
	text.classList.add('text');
	_close = document.createElement('img');
	_close.classList.add('close');
	_close.src = 'img/close.png';
	_close.id = 0;
	_close.addEventListener('click',closePopup,false);
	popup.appendChild(div1);
	popup.appendChild(text);
	popup.appendChild(_close)
	rotate = new Move360(div,imgFolder,imgCount,style);
} 