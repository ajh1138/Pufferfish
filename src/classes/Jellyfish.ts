import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Jellyfish extends Enemy {

	private minY = 400;
	private maxY = 600;

	constructor(scene: Phaser.Scene) {
		super(scene, "jellyfish", 300, gameSettings.jellyfishDamage, gameSettings.jellyfishPoints);
		this.setScale(.8);

		this.whaleHitSound = "zap_01";
		this.playerHitSound = "zap_01";
		this.deathSound = "pop_02";

		this.doNotSetInitialPosition = true;
		this.respawn();
	}

	public prepareToRespawn() {
		setTimeout(() => { this.respawn() }, 2000);
	}

	public respawn() {
		//	super.respawn();
		this.isAlive = true;
		this.setAlpha(1);
		this.isRespawning = false;

		this.y = Phaser.Math.Between(this.minY, this.maxY);
		this.x = gameSettings.width + 150;
		this.speedY = 200;
		this.speedX = -60;
		console.log("jellyfish speed Y", this.speedY);
		setTimeout(() => { this.setVelocity(this.speedX, this.speedY) }, 1000);
	}

	public update = () => {
		if (this.isMoving) {
			if (this.x > gameSettings.width) {
				//console.log("jellyfish x", this.x);
				this.setVelocityX(this.speedX);
			}

			if (this.x <= -200 && !this.isRespawning) {
				this.isRespawning = true;
				this.prepareToRespawn();
			}

			if (this.y <= this.minY) {
				console.log("jellyfish y min", this.y);
				if (this.isAlive) {
					this.setVelocityY(this.speedY);
				} else {
					this.prepareToRespawn();
				}
			} else if (this.y >= this.maxY) {
				console.log("jellyfish y max", this.y);
				if (this.isAlive) {
					this.setVelocityY(-this.speedY);
				} else {
					this.prepareToRespawn();
				}
			}
		}
	};

	public dieDramatically() {
		this.isAlive = false;
		this.scene.tweens.add({ targets: this, alpha: 0, duration: 200, ease: "Power2" });
		super.dieDramatically();
	}

	public doPlayerHit() {
		super.doPlayerHit();
	}

	public doWhaleHit() {
		super.doWhaleHit();
	}
}