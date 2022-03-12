import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Pufferfish extends Phaser.Physics.Arcade.Sprite {
	public speedX: number;
	public speedY: number;

	constructor(scene: Phaser.Scene) {
		let posY = Phaser.Math.Between(10, gameSettings.width - 10);

		let spriteName = "pufferfish";
		super(scene, posY, 0, spriteName, 0);

		this.x = gameSettings.playerStartX;
		this.y = gameSettings.playerStartY;
		this.setOrigin(0, 0);

		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.setDrag(0.95, 0.95);
		this.setDamping(true);
	}

	public reset = () => {
		this.setVelocityY(0);
	};

	public update = () => {
		// TODO: animate and move the fish...
		if (this.y < gameSettings.playerMinY) {
			this.setVelocityY(0);
		}

		if (this.y >= gameSettings.playerMaxY) {
			this.setVelocity(0);
		}
	};
}
