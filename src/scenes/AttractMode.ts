import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import WebFontFile from "../WebFontFile";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "AttractMode",
};

export default class AttractMode extends Phaser.Scene {
	private titleBlock: Phaser.GameObjects.Text;
	private titleStyle = { fontFamily: '"Press Start 2P"', fontSize: "72px", color: "yellow", align: "center" };

	private introMusic;
	private musicIsPlaying: boolean = false;
	private spacebar: Phaser.Input.Keyboard.Key;

	private midpointX = gameSettings.width / 2;
	private midpointY = gameSettings.height / 2;

	constructor() {
		super(sceneConfig);
	}

	public preload() {
		this.load.addFile(new WebFontFile(this.load, "Press Start 2P"));
		//this.load.audio("introMusic", ["assets/sounds/DEmo_3.ogg"]);
	}

	public create() {
		this.titleBlock = this.createTitle();

		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.sound.volume = 0.3;

		this.input.on("pointerdown", (pointer) => {
			this.playMusic();
		});

		this.introMusic = this.sound.add("introMusic");
	}

	public update() {}

	public destroy() {}

	createTitle = () => {
		let titleObj = this.add.text(this.midpointX, this.midpointY - 172, "Hi There!", this.titleStyle);
		titleObj.setOrigin(0, 0);
		let titleMidpointX = titleObj.width / 2;
		let titlePosX = this.midpointX - titleMidpointX;
		titleObj.setX(titlePosX);

		return titleObj;
	};

	playMusic = () => {
		if (!this.musicIsPlaying) {
			this.sound.play("introMusic", { loop: true });
			this.musicIsPlaying = true;
		}
	};
}
