import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class Scoreboard extends Phaser.GameObjects.Text {

	constructor(scene: Phaser.Scene) {
		super(scene, 50, 20, "", { fontFamily: `"${gameSettings.mainFontName}"`, align: "center", color: "yellow", fontSize: "24px" });

		this.setOrigin(0, 0);

		scene.physics.add.existing(this);
		scene.add.existing(this);
	}

	public reset = () => {
		//
	};

	public update = (score: number) => {
		this.text = score.toString().padStart(5, "0");
	};
}