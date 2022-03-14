import * as Phaser from "phaser";
import { gameSettings } from '../gameSettings';
import backgroundSetup from "./backgroundSetup";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Credits",
};

export default class Credits extends Phaser.Scene {

	private textObj: Phaser.GameObjects.Text;
	private creditsStyle = { ...gameSettings.baseFontConfig, fontSize: "24px" };
	private backBtnStyle = { ...gameSettings.baseFontConfig, fontSize: "16px" };

	private creditsText = `Created by ajh1138

	Concept by Dozo
	
	Sprites from flaticon.com - (flaticon, freepik, goodware) 
	
	Sounds from zapsplat.com
	
	Built with Phaser 3`;

	constructor() {
		super(sceneConfig);
	}

	public preload() { }

	public create() {
		backgroundSetup(this);

		let posX = gameSettings.width / 2;
		let posY = gameSettings.height / 2 - 150;
		this.textObj = new Phaser.GameObjects.Text(this, posX, posY, this.creditsText, this.creditsStyle);
		this.textObj.setOrigin(.5, .5)
		this.add.existing(this.textObj);

		let backBtn = new Phaser.GameObjects.Text(this, 0, 0, "<- Back", this.backBtnStyle);
		backBtn.setInteractive();
		backBtn.on("pointerdown", () => { this.scene.start("AttractMode") });
		this.add.existing(backBtn);
	}
	public update() { }

	public destroy() { }
}