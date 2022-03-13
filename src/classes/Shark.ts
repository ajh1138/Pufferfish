import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Shark extends Enemy {
	public deathVelocityY = - 100;

	constructor(scene: Phaser.Scene) {
		super(scene, "shark", 150, gameSettings.sharkDamage, gameSettings.sharkPoints);
	}

	public update() {
		if (this.x <= -100) {
			this.reset();
		}

		if (this.x > gameSettings.width) {
			this.setVelocityX(this.speedX);
		}

		if (this.y <= gameSettings.enemyMinY - this.height) {
			this.reset();
		}
	};

	public dieDramatically() {
		this.isAlive = false;
		this.flipY = true;
		this.setVelocityX(0);
		this.setVelocityY(this.deathVelocityY);
	}
}