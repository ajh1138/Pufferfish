import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Harpoon extends Enemy {

	public respawnMilliseconds = 5000;


	constructor(scene: Phaser.Scene) {
		super(scene, "harpoon", 300, gameSettings.harpoonDamage, gameSettings.harpoonPoints);
		this.doNotSetInitialPosition = true;
		this.scale = .5;

		this.whaleHitSound = "stab_01";
		this.playerHitSound = "stab_02";
		this.deathSound = "boing_01";

		this.respawn();
	}

	public respawn() {
		console.log("harpoon respawn");
		super.respawn();
		this.setAngle(-45);
		this.x = Phaser.Math.Between(500, gameSettings.width);
		this.y = -90;
		this.isRespawning = false;
	}

	public prepareForRespawn() {
		this.isRespawning = true;
		this.setVelocity(0, 0);
		console.log("respawn time", this.respawnMilliseconds);
		setTimeout(() => { this.respawn() }, this.respawnMilliseconds);
	}

	public update() {
		if (!this.isRespawning && this.isMoving) {
			if (this.x <= -200 || this.x >= +gameSettings.width + 300) {
				console.log("harpoon x is out of bounds", this.x, gameSettings.width);
				this.prepareForRespawn();
			}

			if (this.y <= gameSettings.enemyMinY - (this.height * 2)) {
				console.log("harpoon y is out of bounds", this.y);
				this.prepareForRespawn();
			}

			if (this.isAlive && this.y < 100) {
				console.log("y is ", this.y);
				this.setVelocity(this.speedX, -this.speedX);
			}
		}
	};

	public dieDramatically() {
		this.isAlive = false;
		this.setAngularVelocity(150);
		this.setVelocity(200, -200);
		this.scene.sound.play("boing_01");

		super.dieDramatically();
	}

	public doPlayerHit() {
		super.doPlayerHit();
	}

	public doWhaleHit() {
		super.doWhaleHit();
	}
}