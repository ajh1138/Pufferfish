import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class YOURCLASSNAMEHERE extends Enemy {
	constructor(scene: Phaser.Scene) {
		super(scene, "harpoon", 300, gameSettings.jellyfishDamage);

	}

	public update = () => {
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