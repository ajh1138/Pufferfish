import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Shark extends Enemy {
	public deathVelocityY = - 100;

	constructor(scene: Phaser.Scene) {
		super(scene, "shark", 150, gameSettings.sharkDamage, gameSettings.sharkPoints);
		this.setScale(.7);
	}

	public respawn() {
		if (this.isRespawning) {
			this.isRespawning = false;
			this.reset();
		}

	}

	public update() {
		if (this.isMoving) {
			if (this.x <= -100) {
				this.isRespawning = true;
				setTimeout(() => { this.respawn() }, gameSettings.enemyRespawnMilliseconds);
			}

			if (this.y <= gameSettings.enemyMinY - this.height) {
				this.isRespawning = true;
				setTimeout(() => { this.respawn() }, gameSettings.enemyRespawnMilliseconds);
			}

			if (this.x > gameSettings.width) {
				this.setVelocityX(this.speedX);
			}
		}
	};

	public dieDramatically() {
		this.isAlive = false;
		this.flipY = true;
		this.setVelocityX(0);
		this.setVelocityY(this.deathVelocityY);
		this.scene.sound.play("pop_02");
	}

	public doPlayerHit() {
		this.scene.sound.play("bite");
	}
}