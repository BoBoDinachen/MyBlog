window.addEventListener("load",function(){
	//猫的对象
	var cat = document.querySelector("#m_cat");
	//场景中的对象
	var tree = document.querySelector("#tree");
	var stone = document.querySelector("#stone");
	var mouse = document.querySelector("#mouse");
	var cloud = document.querySelector("#cloud");
	//获得状态栏对象
	var time = document.querySelector("#p1");
	var score = document.querySelector("#p2");
	
	console.log("树宽："+tree.width);
	console.log("树高："+tree.height);
	console.log("石头宽："+stone.width);
	console.log("石头高："+stone.height);
	console.log("老鼠宽："+mouse.width);
	console.log("老鼠高："+mouse.height);
	console.log(cat.offsetTop);
	console.log(cat.offsetTop);
	
	//定义起跳
	var isJump = false;
	//定义游戏是否开始
	var isStart = false;
	//定义树的开始移动
	var falg = true;
	
	//定时器，实时的监听键盘，以及场景的变化
	var timer = window.setInterval(sceneControl ,5);
	var timer2 = null;
	var timer4 = null;
	var timer5 = null;
	var timer6 = null;
	var timer7 = null;
	var timer8 = null;
	// 给页面添加键盘的监听 ,空格32
	document.addEventListener("keydown",function(e){
		if(e.keyCode == 32){
			isJump = true;
			isStart = true;
			console.log("按下了空格");
		}
	});
	//场景控制的函数，角色的控制以及场景变化都将在这里实现
	function sceneControl(){
		if(isJump == true){
			jump(cat,down);//如果按下了跳跃键，则执行此函数
			isJump = false;
		}
		if(isStart == true){
			// var i= Math.round(Math.random()*5);
			// console.log(i);
			
		}
	}
	//障碍物定时产生,好像不太行
	//树开始移动
	tree_move(tree,timer4,cat);
	stone_move(stone,timer6,cat);
	mouse_move(mouse,timer7,score,cat);
	//云朵移动
	cloud_move(cloud,timer5);
	//计时
	time_keep(time,timer8);
	
});

//定义角色跳跃的函数
function jump(cat,down){
	timer2 = setInterval(function(){
		var cat_top = cat.offsetTop;
		var speed = -(40-cat_top)/50;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if(cat_top <= 40){
			clearInterval(timer2);
			//cat.style.top = 250 +"px";
			if(down){
				down(cat);
			}
		}else{             
			cat.style.top = cat_top - speed + "px";
		}                                        
	},5);
}
//猫落下的函数
function down(cat){
	// console.log("我执行了");
	var timer3=setInterval(function(){
		cat.style.top = cat.offsetTop+2+"px"
		if(cat.offsetTop >= 205){
			clearInterval(timer3);
			// console.log("执行了！");
		}
	},2);
}
//树移动的函数
function tree_move(tree,timer4,cat){
	timer4 = setInterval(function(){
		if(tree.offsetLeft <= 800){
			tree.style.display = "block";
			tree.style.left = tree.offsetLeft - 1 +"px";
		}
		if(tree.offsetLeft <= 0){
			tree.style.display = "none";
			tree.style.left = 800+"px";
		}
		if(cat.offsetLeft+60 == tree.offsetLeft && cat.offsetTop+60 > tree.offsetTop){
			alert("你挂了，重新开始！");
			window.location.reload();//刷新当前页
		}
	},5);
}
//云朵移动的函数
function cloud_move(cloud,timer5){
	timer5 = setInterval(function(){
		cloud.style.left = cloud.offsetLeft - 2+"px";
		if(cloud.offsetLeft <= -300){
			cloud.style.left = 400+"px";
		}
	},50);
}
//石块移动
function stone_move(stone,timer6,cat){	
	stone.style.left = 950+"px";
	timer6 = setInterval(function(){
		if(stone.offsetLeft <= 950){
			stone.style.left = stone.offsetLeft - 1 +"px";
		}
		if(stone.offsetLeft <= 800){
			
			stone.style.visibility = "visible";
		}
		if(stone.offsetLeft <= 0){
			//设置元素不可见，但仍然会占用空间
			stone.style.visibility = "hidden";
			stone.style.left = 950+"px";
			//stone.style.left = stone.offsetLeft - 1 +"px";
		}
		if(cat.offsetLeft+60 == stone.offsetLeft && cat.offsetTop+60 > stone.offsetTop){
			alert("你挂了，重新开始！");
			window.location.reload();//刷新当前页
		}
	},5);
}
//老鼠的移动功能，涉及到碰撞检测等等
function mouse_move(mouse,timer7,score,cat){
	mouse.style.left = 1500+"px";
	var count = 0;
	timer7 = setInterval(function(){
		if(mouse.offsetLeft <= 1500){
			mouse.style.left = mouse.offsetLeft - 1 +"px";
		}
		if(mouse.offsetLeft <= 800){
			mouse.style.visibility = "visible";
		}
		if(mouse.offsetLeft <= 0 || (cat.offsetLeft+50 == mouse.offsetLeft)){
			mouse.style.visibility = "hidden";
			mouse.style.left = 1500+"px";
			count++;
			console.log(count);
		}
		score.innerHTML = count;
		// //碰撞检测
		// if((cat.offsetLeft+50 == mouse.offsetLeft)){
			
		// }
	},1)
}
//计时函数
function time_keep(time,timer8){
	var count = 0;
	timer8 = setInterval(function(){
		count++;
		time.innerHTML = count +"毫秒";
	},100);//毫秒为单位
}