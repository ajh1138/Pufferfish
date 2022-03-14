import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";

export default class PlayerLivesDisplay extends Phaser.GameObjects.Rectangle {

	private myText: Phaser.GameObjects.Text;
	private myTextStyle = { fontFamily: `"${gameSettings.mainFontName}"`, align: "center", color: "yellow", fontSize: "24px" };
	private icon: Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene) {
		let posX = gameSettings.width - 60;
		let posY = 15;

		super(scene, posX, posY, 70, 20, 0x000000, 0);

		this.setOrigin(0, 0);

		this.myText = new Phaser.GameObjects.Text(scene, posX + 20, posY, gameSettings.playerLives.toString(), this.myTextStyle);

		this.icon = new Phaser.GameObjects.Sprite(scene, posX, posY + 12, "pufferfish");
		this.icon.scale = .5;

		this.setDepth(12);
		this.myText.setDepth(12);
		this.icon.setDepth(12);

		scene.add.existing(this);
		scene.add.existing(this.myText);
		scene.add.existing(this.icon);
	}

	public reset = () => {
		//
	};

	public update = (lives: number) => {
		this.myText.text = lives.toString();
	};
}