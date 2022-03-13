import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class HealthMeter extends Phaser.GameObjects.Rectangle {
	private meterScale: Phaser.GameObjects.Rectangle;

	private paddingSides = 10;
	private paddingTopBottom = 10;

	constructor(scene: Phaser.Scene) {
		super(scene, 0, gameSettings.height - 110, 400, 50, gameSettings.healthMeterBg);
		this.setOrigin(0, 0);
		this.x = (gameSettings.width - this.width) / 2;

		this.meterScale = new Phaser.GameObjects.Rectangle(scene,
			this.x + this.paddingSides,
			this.y + this.paddingTopBottom,
			this.width - (this.paddingSides * 2),
			this.height - this.paddingTopBottom * 2,
			gameSettings.healthMeterColor);

		this.meterScale.setOrigin(0, 0);
		this.meterScale.setDepth(12);

		scene.add.existing(this);
		scene.add.existing(this.meterScale);
	}

	public update(health: number) {
		let scaleWidth = ((health / 100) * this.width) - (this.paddingSides * 2);
		console.log("scalewidth", scaleWidth);
		this.meterScale.width = scaleWidth;
	}
}
