import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	public isAlive = true;
	public isMoving = true;
	public speedX: number;
	public speedY: number;

	public damage: number;
	public pointValue: number;
	public doNotSetInitialPosition = false;
	public isRespawning = false;
	public respawnMilliseconds = 3000;

	public whaleHitSound: string;
	public playerHitSound: string;
	public deathSound: string;

	constructor(scene: Phaser.Scene, textureName: string, speed: number, damage: number, pointValue: number) {
		super(scene, 0, 0, textureName);

		this.setOrigin(0, 0);

		this.setInitialPosition();

		this.speedX = -speed;
		this.damage = damage;
		this.pointValue = pointValue;

		scene.physics.add.existing(this);
		scene.add.existing(this);
	}

	public prepareToRespawn() {

	}

	public respawn() {
		this.reset();
	}

	public reset = () => {
		this.flipX = false;
		this.flipY = false;
		this.isAlive = true;

		if (this.doNotSetInitialPosition == false) {
			this.setInitialPosition();
		}

		this.setVelocity(0, 0);
		this.setAngularVelocity(0);
		this.setAngle(0);
	};

	private setInitialPosition() {
		let posX = gameSettings.width + 100;
		let posY = Phaser.Math.Between(gameSettings.enemyMinY, gameSettings.enemyMaxY);
		this.x = posX;
		this.y = posY;
	}

	public dieDramatically() {
		console.log("base die");
		this.isAlive = false;
		this.scene.sound.play(this.deathSound);
	}

	public doPlayerHit() {
		this.scene.sound.play(this.playerHitSound);
	}

	public doWhaleHit() {
		this.scene.sound.play(this.whaleHitSound);
	}

	public stopEverything() {
		this.isAlive = false;
		this.isMoving = false;
		this.setVelocity(0, 0);
		this.setAngularVelocity(0);
		this.setAngle(0);
	}
}