import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class GameOverDisplay extends Phaser.GameObjects.Text {

	private instructionsText: Phaser.GameObjects.Text;

	constructor(scene: Phaser.Scene) {
		let posX = (gameSettings.width / 2);
		let posY = (gameSettings.height / 2) - 125;
		let gameOverStyle = { fontFamily: `"${gameSettings.mainFontName}"`, align: "center", color: "yellow", fontSize: "72px" };
		let instructionsStyle = { fontFamily: `"${gameSettings.mainFontName}"`, align: "center", color: "yellow", fontSize: "24px" }

		super(scene, posX, posY, "GAME OVER", gameOverStyle);
		this.instructionsText = new Phaser.GameObjects.Text(scene, this.x, this.y + 100, "Press spacebar to restart.", instructionsStyle);

		//	scene.physics.add.existing(this);
		this.setOrigin(.5, .5);
		this.instructionsText.setOrigin(.5, .5);

		this.setDepth(12);
		this.instructionsText.setDepth(12);

		scene.add.existing(this);
		scene.add.existing(this.instructionsText);
	}

	public hide() {
		this.setAlpha(0);
	}

	public show() {
		this.setAlpha(1);
	}

	public reset = () => {
		//
	};

	public update = () => {
		// 
	};
}