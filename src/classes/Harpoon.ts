import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Harpoon extends Enemy {
	constructor(scene: Phaser.Scene) {
		super(scene, "harpoon", 300, gameSettings.harpoonDamage);
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

	}
}