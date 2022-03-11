import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class YOURCLASSNAMEHERE extends Phaser.GameObjects.Ellipse {
	public speedX: number;
	public speedY: number;

	constructor(scene: Phaser.Scene) {
		let posY = Phaser.Math.Between(10, gameSettings.width - 10);

		super(scene, posY, 0, 24, 24, 0xccddee, 0.5);

		this.x = gameSettings.playerStartX;
		this.y = gameSettings.playerStartY;
		this.setOrigin(0, 0);

		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.setStrokeStyle(3, 0x000000);
	}

	public reset = () => {
		//
	};

	public update = () => {
		//
	};
}
