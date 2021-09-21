 // TA DANDO MERDA PRA IMPORTAR POR CAUSA DO CROS DO CHROME 
 // ENTAO PUS TUDO AQUI


class InputHandler {

	constructor(paddle) {
		document.addEventListener("keydown", event => {
		    //alert(event.keyCode);
			switch(event.keyCode) {
				case 37:
				   // console.log('move left');
					paddle.moveLeft();
					break;
				case 39:
					//console.log('move right');
					paddle.moveRight();
					break;
			}
		});

		document.addEventListener("keyup", event => {
			//alert(event.keyCode);
			switch(event.keyCode) {
				// left arrow
				case 37:
					// alert('move left');
					if (paddle.speed < 0)
						paddle.stop();
					break;
				// right arrow
				case 39:
					// alert('move right');
					if (paddle.speed > 0)
						paddle.stop();
					break;
				// escape key
				case 27:
					game.togglePause();
					break;
				// space bar
				case 32:
					game.start();
					break;
			}
		});
	}
}


/////////////////////////////////////////


class Paddle {
	constructor(game) {

		this.gameWidth = game.gameWidth;

		this.width = 150;
		this.height = 20;

		this.maxSpeed = 7;
		this.speed = 0;

		this.position ={
			x: game.gameWidth/2 - (this.width)/2,
			y: game.gameHeight - this.height -10,
		};
	}

	moveLeft() {
		this.speed = -this.maxSpeed;
	}
	moveRight() {
		this.speed = this.maxSpeed;
	}

	stop(){
		this.speed = 0;
	}

	draw(ctx) {
		ctx.fillStyle  =  "blue";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(deltaTime) {
		// Por exemplo. vc tava apertando a seta direita dps apertou a esqurda e depois soltoua  direita.Quando vc solta a direita ele vai parar por um segundo, mas a gente nao quer isso
		//if (!deltaTime) return;
		this.position.x += this.speed;
		// pra nao ultrapassar a tela
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.x + this.width > GAME_WIDTH) this.position.x = GAME_WIDTH - this.width;

	}
}


///////////////////////////////////////

class Ball {
	constructor(game) {
		this.image = document.getElementById("img_ball");

		// this.position ={x: 10, y:400};
		// this.speed = {x: 10, y: -2};
		this.size = 16;

		this.game = game;

		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.reset();

	}

	reset() {
		this.position ={x: 10, y:400};
		this.speed = {x: 10, y: -2};
	}

	draw(){
		ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);

	}

	update(deltaTime){
		// just to prove the point that the line "this.game = game;" in the construcctor was important.
		//We can now access in other functions things related to game and consequently related to the other objects
		//console.log(this.game.paddle.position.x)
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		// canvas restrictions: pra ela rebatar nas paredes
		// wall on left or right
		if(this.position.x + this.size> this.gameWidth || this.position.x < 0) {
			this.speed.x = -this.speed.x;
		}

		// wall on top
		if(this.position.y < 0) {
			this.speed.y = -this.speed.y;
		}
		// lose game on bottom
		if (this.position.y + this.size >= this.gameHeight) {
			this.game.lives--;
			this.reset();

		}

		//check collision with paddle
		let bottomOfBall = this.position.y + this.size;
		let topOfPaddle = this.game.paddle.position.y;
		let leftSideOfPaddle = this.game.paddle.position.x;
		let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

		// if (bottomOfBall >= topOfPaddle 
		// 	&& this.position.x >= leftSideOfPaddle
		// 	&& this.position.x + this.size <= rightSideOfPaddle) 
		if (detectCollision(this, this.game.paddle))	{
			this.speed.y = -this.speed.y;
			this.position.y = this.game.paddle.position.y - this.size;

		}

	}

}

///////////////////////////////////////

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
	NEWLEVEL: 4
}

class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gamestate = GAMESTATE.MENU;
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		// é só instanciar que comeca a funcioanr jah o eventlistener dessa classe
		new InputHandler(this.paddle, this);
		// teve que colocar isso, pq antes de startar o jogo ele jah ininicia no menu e tem que desenhar, por isso deu que nao tava definido
		this.gameObjects =[];
		this.lives = 3;
		this.bricks =[]

		this.levels = [level1, level2];
		this.currentLevel = 0; // index of the array
	}

	start() {
		// this.gamestate !== (GAMESTATE.MENU && GAMESTATE.NEWLEVEL) nao da certo. 
		// daria tb pra usar um switch ou essa  funcao zika aqui(exemplo do stack overflow): if(/foo|bar|ow|my|javascript|works/.test( foobar )) { /*do something*/ }
		if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
		// let brick = new Brick(this, {x: 20, y: 20});
		this.bricks = buildLevel(this, this.levels[this.currentLevel])
		// for (let i=0; i<10; i++) {
		// 	bricks.push(new Brick(this, {x: i*52, y: 30}))
		// }
		this.ball.reset();
		this.gameObjects=[
			this.ball, this.paddle
		];
		this.gamestate = GAMESTATE.RUNNING;
	}

	// paddle.update();
	// paddle.draw(ctx);

	// ball.update(deltaTime);
	// ball.draw(ctx);


	update(deltaTime) {
		// this.paddle.update(deltaTime);
		// this.ball.update(deltaTime);

		if(this.lives === 0) {this.gamestate = GAMESTATE.GAMEOVER};


		if(this.gamestate === GAMESTATE.PAUSED ||
		this.gamestate === GAMESTATE.MENU  ||
		this.gamestate === GAMESTATE.GAMEOVER )
		 return;

		if(this.bricks.length == 0) {
			this.currentLevel++;
			this.gamestate = GAMESTATE.NEWLEVEL;
			this.start();

		}
		[...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
		// this.gameObjects.forEach((object) => object.update(deltaTime));

		this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);


	}

	draw(ctx) {
		// this.paddle.draw(ctx);
		// this.ball.draw(ctx);

		[...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
		if (this.gamestate == GAMESTATE.PAUSED) {
			ctx.rect(0,0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();

			ctx.font ="30px Arial";
			ctx.fillStyle = "white";
			ctx.txtAlign = "center";
			ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
		}

		if (this.gamestate == GAMESTATE.MENU) {
			ctx.rect(0,0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,0.1)";
			ctx.fill();

			ctx.font ="30px Arial";
			ctx.fillStyle = "white";
			ctx.txtAlign = "center";
			ctx.fillText("Press SPACEBAR to Start", this.gameWidth/2, this.gameHeight/2);
		}

		if (this.gamestate == GAMESTATE.GAMEOVER) {
			ctx.rect(0,0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();

			ctx.font ="30px Arial";
			ctx.fillStyle = "white";
			ctx.txtAlign = "center";
			ctx.fillText("GAME OVER", (this.gameWidth)/2, (this.gameHeight)/2);
		}
		}

	togglePause() {
		if(this.gamestate == GAMESTATE.PAUSED) {
			this.gamestate = GAMESTATE.RUNNING;
		} else {
			this.gamestate = GAMESTATE.PAUSED;
		}

	}
}


//////////////////////////////////

class Brick {
	constructor(game, position) {
		this.image = document.getElementById("img_brick");

		this.game = game;

		this.position = position;
		this.width= 80;
		this.height = 24;

		this.markedForDeletion = false;
	}

	update() {
		if(detectCollision(this.game.ball, this)){
			this.game.ball.speed.y = -this.game.ball.speed.y;
			this.markedForDeletion = true;
		}
	}
	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}

/////////////////////////////

// 1 tem brick, 0 eh vazio
let level1 = [
	[0,0,0,0,0,0,0,1,0,1],
	[0,0,0,0,0,0,1,1,0,1],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

let level2 = [
	[0,0,0,0,0,0,0,1,0,1],
	[0,0,0,0,0,0,1,1,0,1],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];




function buildLevel(game, level) {
	let bricks = [];

	level.forEach((row, rowIndex) => {
		row.forEach((brick, brickIndex) => {
			if(brick === 1) {
				let position = {
					x: 80*brickIndex,
					// lets start from 75 from the top
					y: 75 + 24*rowIndex
				};
				bricks.push(new Brick(game, position))
			}
		});
	});

	return bricks
}

////////////////////////

function detectCollision(ball, gameObject) {
	let bottomOfBall = ball.position.y + ball.size;
	let topOfBall = ball.position.y;
	let topOfObject = gameObject.position.y;
	let leftSideOfObject = gameObject.position.x;
	let rightSideOfObject = gameObject.position.x + gameObject.width;
	let bottomOfObject = gameObject.position.y + gameObject.height;

	if ((bottomOfBall >= topOfObject
		&& topOfBall <= bottomOfObject)
		&& ball.position.x >= leftSideOfObject
		&& ball.position.x + ball.size <= rightSideOfObject) 
		{
		return true;
	} else {
		return false;
	}

}













///////////////////////////////////////
// main



let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// normally whrn we update the size of an rect for ex, the last one still remains. We need this to clearwhat was before
// ctx.clearRect(0, 0, 800, 600);
// // after setting style all thigs are genereted red
// ctx.fillStyle = "red"
// // absoolute coordinates
//ctx.fillRect(20, 20, 100, 100);



// paddle.draw(ctx);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

let lastTime = 0;
function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	//console.log(deltaTime);
	lastTime = timestamp;

	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	game.update(deltaTime);
	game.draw(ctx);
	// paddle.update();
	// paddle.draw(ctx);

	// ball.update(deltaTime);
	// ball.draw(ctx);

	// calls gameLoop again with next timestamp
	requestAnimationFrame(gameLoop);
}

// gameLoop(0);
requestAnimationFrame(gameLoop);


//////////////////////////////////////////














