function $(id){
	return document.getElementById(id);
}
function drawOver(ctx){
	ctx.font = "bold 48px Verdana";
	ctx.textAlign = "left";
	var width = ctx.measureText("GAME OVER").width;
	var x = (WIDTH - width)/2;
	var y = (HEIGHT - 48)/2;
	ctx.fillText("GAME OVER",x,y); 
}
var canvas = $("canvas");
ctx = canvas.getContext("2d");

//canvas容器的宽和高
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

//创建背景图
var bg = new Image();
bg.src = "img/background.png";
//创建开始时飞机横向过渡的图像
var loadingImgs = [];
loadingImgs[0] = new Image();
loadingImgs[0].src = "img/game_loading1.png";
loadingImgs[1] = new Image();
loadingImgs[1].src = "img/game_loading2.png";
loadingImgs[2] = new Image();
loadingImgs[2].src = "img/game_loading3.png";
loadingImgs[3] = new Image();
loadingImgs[3].src = "img/game_loading4.png";

//声明游戏的各种状态
var START = 0;
var STARTING = 1;
var RUNNING = 2;
var PAUSE = 3;
var GAMEOVER = 4;
var state = START;//游戏当前状态~默认为START

//创建暂停图像
var pauseImg = new Image();
pauseImg.src = "img/game_pause_nor.png";
function drawPauseImg(ctx){
	ctx.drawImage(pauseImg,(WIDTH-pauseImg.width)/2,(HEIGHT-pauseImg.height)/2);
}

//声明分数和玩家生命数
var SCORE = 0;
var LIFE = 3;
//显示分数与生命文字信息
function drawText(ctx){
	ctx.font = "bold 18px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "hanging";
	ctx.fillText("SCORE:" + SCORE,20,10);
	ctx.fillText("LIFE:" + LIFE,400,10);
}

//创建logo图像
var logo = new Image();
logo.src = "img/shoot_copyright.png";

//显示飞机大战logo
function showLogo(ctx){
	ctx.drawImage(logo,(WIDTH-logo.width)/2,(HEIGHT-logo.height)/2);
}

//创建玩家飞机图像
var heroImgs = [];
heroImgs[0] = new Image();
heroImgs[0].src = "img/hero1.png";
heroImgs[1] = new Image();
heroImgs[1].src = "img/hero2.png";
heroImgs[2] = new Image();
heroImgs[2].src = "img/hero_blowup_n1.png";
heroImgs[3] = new Image();
heroImgs[3].src = "img/hero_blowup_n2.png";
heroImgs[4] = new Image();
heroImgs[4].src = "img/hero_blowup_n3.png";
heroImgs[5] = new Image();
heroImgs[5].src = "img/hero_blowup_n4.png";

//创建敌机图像
var enemyImgs1 = [];
enemyImgs1[0] = new Image();
enemyImgs1[0].src = "img/enemy1.png";
enemyImgs1[1] = new Image();
enemyImgs1[1].src = "img/enemy1_down1.png";
enemyImgs1[2] = new Image();
enemyImgs1[2].src = "img/enemy1_down2.png";
enemyImgs1[3] = new Image();
enemyImgs1[3].src = "img/enemy1_down3.png";
enemyImgs1[4] = new Image();
enemyImgs1[4].src = "img/enemy1_down4.png";
enemyImgs1[5] = new Image();//中型飞机与大型飞机还多一个与子弹碰撞的图~小飞机因为生命值只有一条~不存在被子弹击中的图片~但此处重复一张爆破图~方便后面操作
enemyImgs1[5].src = "img/enemy1_down4.png";

var enemyImgs2 = [];
enemyImgs2[0] = new Image();
enemyImgs2[0].src = "img/enemy2.png";
enemyImgs2[1] = new Image();
enemyImgs2[1].src = "img/enemy2_down1.png";
enemyImgs2[2] = new Image();
enemyImgs2[2].src = "img/enemy2_down2.png";
enemyImgs2[3] = new Image();
enemyImgs2[3].src = "img/enemy2_down3.png";
enemyImgs2[4] = new Image();
enemyImgs2[4].src = "img/enemy2_down4.png";
enemyImgs2[5] = new Image();
enemyImgs2[5].src = "img/enemy2_hit.png"

var enemyImgs3 = [];
enemyImgs3[0] = new Image();
enemyImgs3[0].src = "img/enemy3_n1.png";
enemyImgs3[1] = new Image();
enemyImgs3[1].src = "img/enemy3_n2.png";
enemyImgs3[2] = new Image();
enemyImgs3[2].src = "img/enemy3_down1.png";
enemyImgs3[3] = new Image();
enemyImgs3[3].src = "img/enemy3_down2.png";
enemyImgs3[4] = new Image();
enemyImgs3[4].src = "img/enemy3_down3.png";
enemyImgs3[5] = new Image();
enemyImgs3[5].src = "img/enemy3_down4.png";
enemyImgs3[6] = new Image();
enemyImgs3[6].src = "img/enemy3_down5.png";
enemyImgs3[7] = new Image();
enemyImgs3[7].src = "img/enemy3_down6.png";
enemyImgs3[8] = new Image();
enemyImgs3[8].src = "img/enemy3_hit.png";

//创建子弹图像
var bulletImg = new Image();
bulletImg.src = "img/bullet1.png";

/******************************数据对象*************************************/
var SKY = {
	image:bg,
	width:480,
	height:852,
	speed:20
};
var LOADING = {
	frames: loadingImgs,
	width: 186,
	height: 38,
	speed: 100,

};
var HERO = {
	frames: heroImgs,
	width: 99,
	height: 124,
	speed: 20,
	baseFrameCount: 2
};
var ENEMY1 = {
	type: 1,
	score: 1,
	life: 1,
	minSpeed: 10,
	maxSpeed: 30,
	frames: enemyImgs1,
	width: 57,
	height: 51,
	baseFrameCount: 1
};
var ENEMY2 = {
	type: 2,
	score: 5,
	life: 5,
	minSpeed: 30,
	maxSpeed: 70,
	frames: enemyImgs2,
	width: 69,
	height: 95,
	baseFrameCount: 1
};
var ENEMY3 = {
	type: 3,
	score: 20,
	life: 20,
	speed:100,
	frames: enemyImgs3,
	width: 169,
	height: 258,
	baseFrameCount: 2
};
var BULLET = {
	image:bulletImg,
	width: 9,
	height: 21,
	speed: 32//刷新速度~相当于子弹飞行速度
};
/******************************业务对象*************************************/
var Sky = function(configSKY){//这玩意写完后可以new
	//configSKY：表示当前业务对象所使用的数据对象-->SKY
	this.image = configSKY.image;//将数据对象的属性赋值给业务对象的属性
	this.width = configSKY.width;
	this.height = configSKY.height;
	this.speed = configSKY.speed;//绘图的间隔时间
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = -this.height;
	this.lastTime = 0;//上次执行绘制背景的时间
	
	this.step = function(){//根据时间差~更新天空的坐标
		var currentTime = new Date().getTime();
		if((currentTime - this.lastTime) >= this.speed){
			this.y1++;
			this.y2++;
			if(this.y1 >= this.height){
				this.y1 = -this.height;
			}
			if(this.y2 >= this.height){
				this.y2 = -this.height;
			}
			this.lastTime = currentTime;
		}
	}
	this.paint = function(ctx){//绘制
		ctx.drawImage(this.image,this.x1,this.y1);
		ctx.drawImage(this.image,this.x2,this.y2);
	}
}
var Loading = function(configLOADING){
	//configLOADING：表示当前业务对象所使用的数据对象-->LOADING
	this.frames = configLOADING.frames;
	this.width = configLOADING.width;
	this.height = configLOADING.height;
	this.x = 0;
	this.y = HEIGHT - this.height;
	this.speed = configLOADING.speed;
	this.frameIndex = 0;
	this.frame = this.frames[this.frameIndex];
	this.lastTime = 0;
	this.step = function(){//更新frameIndex的值，并且取出最新图像
		var currentTime = new Date().getTime();
		if((currentTime - this.lastTime) >= this.speed){
			this.frame = this.frames[this.frameIndex];
			this.frameIndex++;
			if(this.frameIndex == this.frames.length){
				state = RUNNING;//切换状态
			}
			this.lastTime = currentTime;
		}
	}
	this.paint = function(ctx){
		ctx.drawImage(this.frame,this.x,this.y);
	}
}

function Component(config){
	this.down = false;
	this.canDelete = false;
	this.width = config.width;
	this.height = config.height;
	this.frames = config.frames;
	this.frameIndex = 0;
	this.frame = this.frames[this.frameIndex];
	this.lastTime = 0;
	this.x = 0;
	this.y = 0;
	this.baseFrameCount = config.baseFrameCount;
	if(config.minSpeed && config.maxSpeed){
		this.speed = Math.random()*(config.maxSpeed - config.minSpeed)+config.minSpeed;
	}else if(config.speed){
		this.speed = config.speed;
	}
	this.bang = function(){}
	this.step = function(){}
	this.paint = function(ctx){
		ctx.drawImage(this.frame,this.x,this.y);
	}

}

var Hero = function(configHERO){
	Component.call(this,configHERO);
	//this.frames = configHERO.frames;
	//this.width = configHERO.width;
	//this.height = configHERO.height;
	this.speed = configHERO.speed;
	//this.baseFrameCount = configHERO.baseFrameCount;
	//this.lastTime = 0;
	//this.frameIndex = 0;
	//this.frame = this.frames[this.frameIndex];
	this.x = (WIDTH - this.width)/2;
	this.y = HEIGHT - this.height;
	//this.down = false;//false为正常状态~true为爆破状态
	//this.canDelete = false;
	this.step = function(){
		var currentTime = new Date().getTime();
		if((currentTime-this.lastTime) >= this.speed){
			if(this.down){
				//爆破状态
				this.frame = this.frames[this.frameIndex];
				this.frameIndex++;
				if(this.frameIndex == this.frames.length){
					this.canDelete = true;
				}
			}else{
				//正常状态
				this.frame=this.frames[this.frameIndex%this.baseFrameCount];
				this.frameIndex++;
			}
			this.lastTime = currentTime;
		}
	}
	/*this.paint = function(ctx){
		ctx.drawImage(this.frame,this.x,this.y);
	}*/
	this.shootLastTime = 0;
	this.shootInterval = 240;//相当于子弹的射击频率
	this.shoot = function(){//生成子弹
		var currentTime = new Date().getTime();
		if((currentTime - this.shootLastTime) >= this.shootInterval){
			bullets.push(new Bullet(BULLET));
			this.shootLastTime = currentTime;
		}
	}
	this.bang = function(){//英雄撞击后的操作
		this.down = true;
		this.frameIndex = this.baseFrameCount;
	}
}
var Enemy = function(configEnemy){
	//继承自组件Component
	Component.call(this,configEnemy);
	//由configEnemy决定创建哪种飞机的业务对象
	this.type = configEnemy.type;
	this.score = configEnemy.score;
	this.life = configEnemy.life;
	//this.frames = configEnemy.frames;
	//this.frameIndex = 0;
	//this.frame = configEnemy.frames[this.frameIndex];
	//this.baseFrameCount = configEnemy.baseFrameCount;
	//this.width = configEnemy.width
	//this.height = configEnemy.height;
	//this.lastTime = 0;
	//this.down = false;//判断是否为爆破状态
	//this.canDelete = false;//是否可以被删除
	if(configEnemy.minSpeed && configEnemy.maxSpeed){
		this.speed = Math.random()*(configEnemy.maxSpeed - configEnemy.minSpeed)+configEnemy.minSpeed;
	}else if(configEnemy.speed){
		this.speed = configEnemy.speed;
	}
	this.x = Math.random()*(WIDTH - this.width);
	this.y = -this.height;
	this.step = function(){
		var currentTime = new Date().getTime();
		if((currentTime - this.lastTime) >= this.speed){
			if(this.down){
				//处于爆破状态
				if(this.frameIndex >= this.frames.length - 1){
					SCORE+=this.score;
					this.canDelete = true;//爆破状态最后一幅图都显示完毕~此时飞机处于可删除状态
				}else{
					this.frame = this.frames[this.frameIndex];
					this.frameIndex++;
				}
			}else{//处于非爆破状态
				if(this.frameIndex == this.frames.length - 1){
					this.frame = this.frames[this.frameIndex];
					this.frameIndex++;
				}else{
					this.frame = this.frames[this.frameIndex%this.baseFrameCount];
					this.frameIndex++;
				}
				this.y++;
			}
			this.lastTime = currentTime;
		}
	}
	/*this.paint = function(ctx){
		ctx.drawImage(this.frame,this.x,this.y);
	}*/
	//判断当前对象的y坐标是否超出游戏面板
	this.outOfBounds = function(){
		return this.y > HEIGHT;
	}
	//判断撞击规则~component可以是玩家飞机对象~也可以是子弹对象~碰撞成功返回true~否则为false
	this.hit = function(component){
		var minEnemyLength = Math.min(this.width,this.height);//获得敌机长宽中的较小者
		var minComLength = Math.min(component.width,component.height);//组建长宽的较小者
		var r = Math.max(minEnemyLength,minComLength);
		r/=2;//计算出圆的半径
		r=r*r;//计算出半径的平方值
		var enemyX = this.x + this.width/2;
		var enemyY = this.y + this.height/2;//得到敌机中心点坐标
		var comX = component.x + component.width/2;
		var comY = component.y + component.height/2;//得到撞击组建的中心点
		var distance = (enemyX - comX)*(enemyX - comX) + (enemyY - comY)*(enemyY - comY);//得到两个撞击物中心点距离的平方值
		return distance < r;
	}
	//敌人与其他组件撞击后的操作
	this.bang = function(){
		this.life--;
		if(this.life == 0){
			this.down = true;//当生命值为0 时敌机处于爆破状态
			this.frameIndex = this.baseFrameCount;
		}else{
			this.frameIndex = this.frames.length - 1;
		}
	}
}
var Bullet = function(configBullet){
	this.image = configBullet.image;
	this.width = configBullet.width;
	this.height = configBullet.height;
	this.speed = configBullet.speed;
	this.lastTime = 0;
	this.x = hero.x + (hero.width-this.width)/2;
	this.y = hero.y - this.height;
	this.canDelete = false;//判断是否可以删除当前组件
	this.step = function(){
		var currentTime = new Date().getTime();
		if((currentTime - this.lastTime) >= this.speed){
			this.y-=5;
			this.lastTime = currentTime;
		}
	}
	this.paint = function(ctx){
		ctx.drawImage(this.image,this.x,this.y);
	}
	this.outOfBounds = function(){
		return this.y < -this.height;
	}
}
/*************************************组建函数*********************************************/
function componentEnter(){
	var currentTime = new Date().getTime();
	if((currentTime - lastTime) >= interval){
		var num = Math.floor(Math.random()*10);//通过随机数的方式来控制各种敌机的比例
		if(num <= 7){//创建小型敌机
			enemise.push(new Enemy(ENEMY1));
		}else if(num == 8){
			enemise.push(new Enemy(ENEMY2));
		}else if(num == 9){
			if((enemise[0] == null) || (enemise[0].type != 3)){
				enemise.splice(0,0,new Enemy(ENEMY3));
			}
		}
		lastTime = currentTime;
	}
}
function componentStep(){
	for(var i = 0; i < enemise.length; i++){//处理所有敌机的移动
		enemise[i].step();
	}
	for(var i = 0; i < bullets.length; i++){//处理子弹的移动
		bullets[i].step();
	}
}
function componentPaint(){
	for(var i = 0; i < enemise.length; i++){
		enemise[i].paint(ctx);
	}
	for(var i = 0; i < bullets.length; i++){
		bullets[i].paint(ctx);
	}
}
function componentDelete(){
	for(var i = 0; i < enemise.length; i++){//删除敌机
		if(enemise[i].outOfBounds() || enemise[i].canDelete){
			enemise.splice(i,1);
		}
	}
	for(var i = 0; i < bullets.length; i++){//删除子弹
		if(bullets[i].outOfBounds() || bullets[i].canDelete){
			bullets.splice(i,1);
		}
	}
	//删除玩家飞机
	if(hero.canDelete){
		LIFE--;
		if(LIFE == 0){
			state = GAMEOVER;
		}else{
			hero = new Hero(HERO);
		}

	}
}

function checkHit(){
	for(var i = 0; i < enemise.length; i++){
		//判断enemise[i]是否处于爆破状态或将被删除然而还没被删除状态
		if(enemise[i].down || enemise[i].canDelete){
			continue;
		}
		//判断敌机与玩家飞机的碰撞状态
		if(enemise[i].hit(hero)){
			enemise[i].bang();
			hero.bang();
		}
		//判断enemise[i]是否处于爆破状态或将被删除然而还没被删除状态
		if(enemise[i].down || enemise[i].canDelete){
			continue;
		}
		//判断子弹与敌机的碰撞状态
		for(var j = 0; j < bullets.length; j++){
			if(enemise[i].hit(bullets[j])){
				enemise[i].bang();
				bullets[j].canDelete = true;
			}
		}
	}
}

/*******************************************创建各种对象*******************************************/
var sky = new Sky(SKY);
var loading = new Loading(LOADING);
var hero = new Hero(HERO);
var enemise = [];//保存敌机对象的数组
var bullets = [];//保存子弹
var interval = 1000;//创建敌机的时间间隔
var lastTime = 0;
/******************************************独立的计时器~刷新频率为百分之一秒***********************************/
setInterval(
	function(){
		sky.step();
		sky.paint(ctx);
		switch(state){
			//绘制背景图
			case START:
				showLogo(ctx);
				break;
			case STARTING:
				loading.step();
				loading.paint(ctx);
				break;
			case RUNNING:
				componentEnter();
				componentStep();
				checkHit();
				componentPaint();
				hero.step();
				hero.paint(ctx);
				hero.shoot();
				componentDelete();
				drawText(ctx);//为了保证文字在游戏平台的最上面~需要将文字放到最后
				break;
			case PAUSE:
				componentPaint();
				hero.paint(ctx);
				drawText(ctx);
				drawPauseImg(ctx);
				break;
			case GAMEOVER:
				componentPaint();
				hero.paint(ctx);
				drawOver(ctx);
				break;
		}

	},1000/500);

/***************************************canvas上的事件处理************************************************/
canvas.onclick = function(){
	//如果状态为START则切换到STARTING状态
	if(state == START){
		state = STARTING;
	}
	if(state == RUNNING){
		state = PAUSE;
	}
}
//当游戏在进行时鼠标移出canvas~游戏暂停
canvas.onmouseout = function(){
	if(state == RUNNING){
		state = PAUSE;
	}
}
canvas.onmouseover = function(){
	if(state == PAUSE){
		state = RUNNING;
	}
}
canvas.onmousemove = function(e){//注意~当这个事件被触发时~玩家飞机对象已经被创建出来了
	if(state == RUNNING){
		hero.x = e.offsetX - hero.width / 2;
		hero.y = e.offsetY - hero.height / 2;
	}
}