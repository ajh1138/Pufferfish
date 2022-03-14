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
	public update() { }

	public destroy() { }

	preloadSounds() {
		// this.load.audio("mainMusic", ["assets/sound/NeonAction2.mp3"]);
		this.load.audio("bite", ["assets/sounds/bite.mp3"]);
		this.load.audio("pop_01", ["assets/sounds/zapsplat_pop_01.mp3"]);
		this.load.audio("pop_02", ["assets/sounds/zapsplat_pop_02.mp3"]);
		this.load.audio("boing_01", ["assets/sounds/zapsplat_boing_01.mp3"]);
		this.load.audio("whale_hurt", ["assets/sounds/whale_hurt.mp3"]);
		this.load.audio("whale_die", ["assets/sounds/whale_die.mp3"]);
		this.load.audio("zap_01", ["assets/sounds/zapsplat_zap.mp3"]);
		this.load.audio("shark_death", ["assets/sounds/grunt_01.mp3"]);
		this.load.audio("stab_01", ["assets/sounds/stab_01.mp3"]);
		this.load.audio("stab_02", ["assets/sounds/stab_02.mp3"]);
		// this.load.audio("playerExplode", ["assets/sounds/boom8.mp3"]);
	}

	preloadSprites() {
		this.load.image("coral_01", "assets/sprites/coral_01.png");
		this.load.image("coral_02", "assets/sprites/coral_02.png");
		this.load.image("pufferfish", "assets/sprites/pufferfish_temp.png");
		this.load.image("whale", "assets/sprites/whale_temp.png");
		this.load.image("harpoon", "assets/sprites/harpoon_01.png");
		this.load.image("shark", "assets/sprites/shark_01.png");
		this.load.image("jellyfish", "assets/sprites/jellyfish_01.png");
		this.load.image("injury", "assets/sprites/injury_01.png");
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
