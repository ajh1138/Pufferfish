import * as Phaser from "phaser";
import { gameSettings } from '../gameSettings';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Credits",
};

export default class Credits extends Phaser.Scene {

	private textObj: Phaser.GameObjects.Text;
	private creditsStyle = { fontFamily: `"${gameSettings.mainFontName}"`, align: "center", color: "yellow", fontSize: "16px" };

	private creditsText = `Created by ajh1138
	Concept by Dozo
	Sprites from flaticon.com - (flaticon, freepik, goodware) 
	Sounds from zapsplat.com
	Built with Phaser 3
	
	`;

	constructor() {
		super(sceneConfig);

		this.textObj = this.add.text(0, 0, this.creditsText, this.creditsStyle);

	}

	public preload() { }

	public create() { }
	public update() { }

	public destroy() { }
}