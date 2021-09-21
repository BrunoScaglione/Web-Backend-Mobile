export default class Paddle {
	constructor(gamewidth, gameHeight) {
		this.width(150);
		this.height(20);

		this.maxSpeed = 7;
		this.speed = 0;

		this.position ={
			x: gamewidth/2 - this.width/2,
			y: gameHeight - this.height -10,
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
		if (!deltaTime) return;
		this.position.x += this.speed;
		// pra nao ultrapassar a tela
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;

	}
}