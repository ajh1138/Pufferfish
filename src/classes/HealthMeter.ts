import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class HealthMeter extends Phaser.GameObjects.Rectangle {
	private meterScale: Phaser.GameObjects.Rectangle;

	private paddingSides: 10;
	private paddingTopBottom: 10;

	constructor(scene: Phaser.Scene) {
		super(scene, 0, gameSettings.height - 70, 400, 50, 0xffffff);
		this.setOrigin(0, 0);
		this.x = (gameSettings.width - this.width) / 2;

		this.meterScale = new Phaser.GameObjects.Rectangle(scene, this.x + this.paddingTopBottom, this.y + this.paddingTopBottom, 10, this.height - (this.paddingTopBottom * 2), 0xccddee);
		this.meterScale.setOrigin(0, 0);
		this.meterScale.setDepth(12);

		scene.add.existing(this);
		scene.add.existing(this.meterScale);
	}

	public update(health: number) {
		this.meterScale.width = (health / 100) * this.width - 20;
	}
}
