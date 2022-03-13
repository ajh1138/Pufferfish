import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Jellyfish extends Enemy {
	constructor(scene: Phaser.Scene) {
		super(scene, "jellyfish", 300, gameSettings.jellyfishDamage, gameSettings.jellyfishPoints);

	}

	public respawn() {
		super.respawn();
	}

	public update = () => {
		if (this.x > gameSettings.width) {
			this.setVelocityX(this.speedX);
		}

		if (this.y <= gameSettings.enemyMinY - this.height) {
			setTimeout(() => { this.respawn() }, gameSettings.enemyRespawnMilliseconds);
		}
	};

	public dieDramatically() {

	}
}