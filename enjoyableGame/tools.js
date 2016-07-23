function $( selector,content ){
	var firstChar = selector.substring(0,1);

	content = content || document;

	if( firstChar === "#" ){
		return document.getElementById( selector.slice(1) );
	}else if( firstChar === "." ){
		//现获取还指定范围的所有的元素
		var allElment = content.getElementsByTagName("*");
		var arr = [];
		//循环每一个元素
		for( var i = 0; i < allElment.length; i++ ){
			//从每个元素身上获取到className
			var classNames = allElment[i].className;
			//把元素身上的class用空格分割成数组
			var classArr = classNames.split(" ");

			//循环这个classArr，看一下每一项是否跟传进来的class匹配，如果匹配那么就把元素放在数组中，停止for循环
			for( var j = 0; j < classArr.length; j++ ){
				if( classArr[j] === selector.slice(1) ){
					arr.push( allElment[i] );
					break;
				}
			}
		}
		return arr;

	}else{
		return content.getElementsByTagName(selector);
	}
}
function getStyle( obj,attr ){
	if( obj.currentStyle ){
		return obj.currentStyle[attr]
	}else{
		return getComputedStyle(obj)[attr];
	};
};
function addZero(time){
	return time<10 ? "0"+time:time;
}
function doMove(obj,attr,speed,target,callBack){
	if(obj.moveTimer ) return;
	var num = parseFloat(getStyle( obj,attr )); 
	speed = num > target ? -Math.abs(speed) : Math.abs(speed);
	obj.moveTimer = setInterval(function (){
		num += speed;
		if( speed > 0 && num >= target || speed < 0 && num <= target  ){
			num = target;

			clearInterval(obj.moveTimer);
			obj.moveTimer = null; //设置保存定时器的的值为null
			obj.style[attr] = num + "px";

			(typeof callBack === "function") && callBack();

		}else{
			obj.style[attr] = num + "px";
		}
		

	},30)	
};

function shake( obj,attr,speed ,callBack){
	//6. 如果定时器已经在开启，移入的时候，就不向下执行
	if(obj.timer) return;
	// 1.
	var arr = [],
		l = parseFloat(getStyle(obj,attr)); //获取一下元素最开始的位置。
	//2.
	for( var i = speed; i > 0; i-=3 ){
		arr.push(-i,i);
	};
	//4. 始终保持最后一个数为0；
	arr.push(0);
	//3.开定时器，变换left值
	var n = 0;
	obj.timer = setInterval(function(){
		obj.style[attr] = l + arr[n] + "px";
		n++;
		// 5. 清掉定时器
		if( n > arr.length - 1 ){
			clearInterval(obj.timer);
			obj.timer = null;
			if(typeof callBack === "function"){
				callBack();
			}
		}
	},30)	
};