import * as Phaser from "phaser";
import WebFontFile from "../WebFontFile";

import { gameSettings } from "../gameSettings";
import backgroundSetup from "./backgroundSetup";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "AttractMode",
};

export default class AttractMode extends Phaser.Scene {
	private titleBlock: Phaser.GameObjects.Text;
	private titleStyle = { fontFamily: `"${gameSettings.mainFontName}"`, fontSize: "72px", color: "yellow", align: "center" };

	private introMusic;
	private musicIsPlaying: boolean = false;
	private spacebar: Phaser.Input.Keyboard.Key;

	private midpointX = gameSettings.width / 2;
	private midpointY = gameSettings.height / 2;

	constructor() {
		super(sceneConfig);
	}

	public preload() {
		this.load.addFile(new WebFontFile(this.load, `${gameSettings.mainFontName}`));
		//this.load.audio("introMusic", ["assets/sounds/DEmo_3.ogg"]);
	}

	public create() {
		backgroundSetup(this);
		this.titleBlock = this.createTitle();

		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.createBackgroundSound();
		this.createCreditsText();
		this.createStartText();

		// this.input.on("pointerdown", (pointer) => {
		// 	this.startGame();
		// });

		//	this.introMusic = this.sound.add("introMusic");

		//this.startGame();
	}

	createBackgroundSound() {
		this.sound.volume = 0.5;

		let ambientSound = this.sound.add("underwater", { volume: .5, loop: true });
		ambientSound.play();

		let bgMusic = this.sound.add("mainMusic", { volume: .3, loop: true });
		bgMusic.play();
	}

	createStartText() {
		let startText = new Phaser.GameObjects.Text(this, gameSettings.width / 2, 450, "Press spacebar to start", gameSettings.baseFontConfig);
		startText.setOrigin(.5, .5);
		startText.setInteractive();
		startText.on("pointerdown", () => { this.startGame(); });
		this.add.existing(startText);
	}

	createCreditsText() {
		let creditsText = new Phaser.GameObjects.Text(this, gameSettings.width / 2, 550, "Credits", gameSettings.baseFontConfig);
		creditsText.setOrigin(.5, .5);
		creditsText.setInteractive();

		creditsText.on('pointerdown', () => {
			this.sound.play("pop_02");
			this.scene.start("Credits");
		});

		this.add.existing(creditsText);
	}

	public update() {
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			this.startGame();
		}
	}

	public destroy() { }

	createTitle = () => {
		let titleObj = this.add.text(this.midpointX, this.midpointY - 172, "pufferfish", this.titleStyle);
		titleObj.setOrigin(0, 0);
		let titleMidpointX = titleObj.width / 2;
		let titlePosX = this.midpointX - titleMidpointX;
		titleObj.setX(titlePosX);

		let subtitleObj = this.add.text(this.midpointX, this.midpointY - 90, "or, \"The Whale Isn't Paying Attention\"", { ...this.titleStyle, fontSize: "24px" });
		subtitleObj.setOrigin(0, 0);
		let subtitleMidpointX = subtitleObj.width / 2;
		let subtitlePosX = this.midpointX - subtitleMidpointX;
		titleObj.setX(subtitlePosX);

		return titleObj;
	};

	playMusic = () => {
		if (!this.musicIsPlaying) {
			this.sound.play("introMusic", { loop: true });
			this.musicIsPlaying = true;
		}
	};

	startGame() {
		this.sound.stopAll();
		this.scene.start("Scene01");
	}
}
