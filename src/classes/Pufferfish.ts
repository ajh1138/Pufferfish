import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Pufferfish extends Phaser.GameObjects.Sprite {
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
	}

	public reset = () => {
		//
	};

	public update = () => {
		// TODO: animate and move the fish...
	};
}
