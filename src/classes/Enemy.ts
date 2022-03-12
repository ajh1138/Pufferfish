import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	public speedX: number;
	public speedY: number;

	constructor(scene: Phaser.Scene, textureName: string, speed: number) {
		super(scene, -100, -100, textureName, 0);
		console.log("hi, i'm an enemy.");
		this.setOrigin(0, 0);

		this.setInitialPosition();

		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.setVelocityX(-speed);
	}

	public reset = () => {
		this.setInitialPosition();
	};

	// public update = () => {
	// 	if (this.x <= -100) {
	// 		this.reset();
	// 	}
	// };

	private setInitialPosition() {
		let posX = gameSettings.width + 100;
		let posY = Phaser.Math.Between(gameSettings.enemyMinY, gameSettings.enemyMaxY);
		this.x = posX;
		this.y = posY;
	}
}