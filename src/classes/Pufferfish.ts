import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Pufferfish extends Phaser.Physics.Arcade.Sprite {
	public speedX: number;
	public speedY: number;
	public isAlive = true;
	public puffs = 0;

	constructor(scene: Phaser.Scene) {
		let posY = Phaser.Math.Between(10, gameSettings.width - 10);

		let spriteName = "pufferfish";
		super(scene, posY, 0, spriteName, 0);

		this.setOrigin(0, 0);
		this.setInitialPosition();

		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.setDrag(0.95, 0.95);
		this.setDamping(true);
	}

	public reset = () => {
		this.setVelocityY(0);
		this.isAlive = true;
		this.flipX = false;
		this.flipY = false;
		this.puffs = 0;
		this.setInitialPosition();
	};

	public setInitialPosition() {
		this.x = gameSettings.playerStartX;
		this.y = gameSettings.playerStartY;
	}

	public update = () => {
		// TODO: animate and move the fish...
		let scale = Math.max((this.puffs * .35) + 1, 1);
		this.setScale(scale);

		console.log("scale", this.puffs);

		if (this.y < gameSettings.playerMinY) {
			this.setVelocityY(0);
		}

		if (this.y >= gameSettings.playerMaxY) {
			this.setVelocity(0);
		}
	};

	dieDramatically() {
		this.isAlive = false;
		this.setVelocity(0, -200);
		this.flipY = true;
	}
}
