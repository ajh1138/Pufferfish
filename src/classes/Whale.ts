import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Whale extends Phaser.Physics.Arcade.Sprite {
	public speedX: number;
	public speedY: number;

	public isAlive = true;

	public minY = 70;
	public maxY = gameSettings.height - 200;

	public health = gameSettings.whaleHealth;

	constructor(scene: Phaser.Scene) {
		let spriteName = "whale";
		super(scene, 0, 0, spriteName, 0);

		this.setOrigin(0, 0);

		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.reset();
	}

	public reset = () => {
		let posY = Phaser.Math.Between(this.minY, this.maxY);
		this.y = posY;
		this.x = gameSettings.whaleX;
		this.health = gameSettings.whaleHealth;

		this.setAccelerationY(gameSettings.whaleBaseSpeed);
	};

	public update = () => {
		if (this.isAlive) {
			if (this.y <= this.minY) {
				this.setVelocityY(4);
				this.setAccelerationY(gameSettings.whaleBaseSpeed);
			}

			if (this.y >= this.maxY) {
				this.setVelocityY(-4);
				this.setAccelerationY(-gameSettings.whaleBaseSpeed);
			}
		}
	};

	public reactToHit() {

	}

	public dieDramatically() {
		this.isAlive = false;
		this.flipY = true;
		this.setVelocity(0, 0);
		this.setAcceleration(0, -gameSettings.whaleBaseSpeed / 2);
	}
}
