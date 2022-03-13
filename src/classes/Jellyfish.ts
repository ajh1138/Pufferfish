import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Jellyfish extends Enemy {

	private minY = 400;
	private maxY = 600;

	constructor(scene: Phaser.Scene) {
		super(scene, "jellyfish", 300, gameSettings.jellyfishDamage, gameSettings.jellyfishPoints);
		this.setScale(.8);
		this.respawn();
		this.doNotSetInitialPosition = true;
	}

	public prepareToRespawn() {
		setTimeout(() => { this.respawn() }, 2000);
	}

	public respawn() {
		super.respawn();

		this.y = Phaser.Math.Between(this.minY, this.maxY);
		this.x = gameSettings.width + 150;
		this.speedY = 200;
		this.speedX = -60;
		console.log("jellyfish speed Y", this.speedY);
		setTimeout(() => { this.setVelocityY(this.speedY) }, 1000);
	}

	public update = () => {
		if (this.isAlive) {
			if (this.x > gameSettings.width) {
				//console.log("jellyfish x", this.x);
				this.setVelocityX(this.speedX);
			}

			if (this.x <= -200) {
				this.prepareToRespawn();
			}

			if (this.y <= this.minY) {
				console.log("jellyfish y min", this.y);
				this.setVelocityY(this.speedY);
			} else if (this.y >= this.maxY) {
				console.log("jellyfish y max", this.y);
				this.setVelocityY(-this.speedY);
			}
		}
	};

	public dieDramatically() {
		this.isAlive = false;

	}
}