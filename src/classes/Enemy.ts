import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	public isAlive = true;
	public speedX: number;
	public speedY: number;

	public damage: number;

	constructor(scene: Phaser.Scene, textureName: string, speed: number, damage: number) {
		super(scene, 0, 0, textureName);
		console.log("hi, i'm an enemy.", speed);
		this.setOrigin(0, 0);

		this.setInitialPosition();

		this.speedX = -speed;
		this.damage = damage;

		scene.physics.add.existing(this);
		scene.add.existing(this);
	}

	public reset = () => {
		this.flipX = false;
		this.flipY = false;
		this.isAlive = true;
		this.setVelocity(0, 0);
		this.setInitialPosition();
	};

	private setInitialPosition() {
		let posX = gameSettings.width + 100;
		let posY = Phaser.Math.Between(gameSettings.enemyMinY, gameSettings.enemyMaxY);
		this.x = posX;
		this.y = posY;
	}
}