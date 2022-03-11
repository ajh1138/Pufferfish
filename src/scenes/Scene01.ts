import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Scene01",
};

export default class Scene01 extends Phaser.Scene {
	constructor() {
		super(sceneConfig);
	}

	public preload() {}

	public create() {
		//
	}
	public update() {
		//
	}

	public destroy() {}
}
