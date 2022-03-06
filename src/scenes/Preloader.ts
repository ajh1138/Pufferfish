import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Preloader",
};

export default class Preloader extends Phaser.Scene {
	constructor() {
		super(sceneConfig);
	}

	public preload() {
		this.preloadSounds();
		this.preloadSprites();
	}

	public create() {
		this.scene.start("AttractMode");
	}
	public update() {}

	public destroy() {}

	preloadSounds() {
		// this.load.audio("mainMusic", ["assets/sound/NeonAction2.mp3"]);
		// this.load.audio("playerLaser", ["assets/sound/laser1.mp3"]);
		// this.load.audio("enemyExplode", ["assets/sound/retro_die_03.ogg"]);
		// this.load.audio("playerExplode", ["assets/sound/boom8.mp3"]);
	}

	preloadSprites() {
		// this.load.image("background", "assets/space-background.png");
		// this.load.image("stars01", "assets/stars01.png");
		// this.load.image("stars02", "assets/stars02.png");
		// this.load.spritesheet("enemy01", "assets/sprites/enemy-01.png", {
		// 	frameWidth: 48,
		// 	frameHeight: 48,
		// });
		// this.load.spritesheet("enemy03", "assets/sprites/enemy-03.png", {
		// 	frameWidth: 48,
		// 	frameHeight: 48,
		// });
		// this.load.spritesheet("player", "assets/sprites/ship-01.png", {
		// 	frameWidth: 48,
		// 	frameHeight: 48,
		// });
		// this.load.spritesheet("explosion", "assets/sprites/explosion_spritesheet_03.png", {
		// 	frameWidth: 100,
		// 	frameHeight: 100,
		// });
		// this.load.spritesheet("explosion_04", "assets/sprites/explosion_spritesheet_04.png", {
		// 	frameWidth: 100,
		// 	frameHeight: 100,
		// });
		// this.load.spritesheet("beam", "assets/sprites/beam.png", {
		// 	frameWidth: 16,
		// 	frameHeight: 16,
		// });
	}
}
