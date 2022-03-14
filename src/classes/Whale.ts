import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Whale extends Phaser.Physics.Arcade.Sprite {
	public speedX: number;
	public speedY: number;

	public isAlive = true;
	public canBeInjured = true;

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
		this.canBeInjured = false;

		let injury = this.scene.add.sprite(this.x + 20, this.y + 30, "injury");
		injury.setScale(.5);
		setTimeout(() => { injury.destroy() }, 1000);
		//this.scene.physics.add.existing(injury);
		this.scene.sound.play("whale_hurt");

		setTimeout(() => { this.canBeInjured = true; }, 2000);
	}

	public dieDramatically() {
		this.isAlive = false;
		this.flipY = true;
		this.setVelocity(0, 0);
		this.setAcceleration(0, -gameSettings.whaleBaseSpeed / 2);
		this.scene.sound.play("whale_die");
	}
}
