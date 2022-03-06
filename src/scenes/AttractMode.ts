import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "AttractMode",
};

export default class AttractMode extends Phaser.Scene {
	constructor() {
		super(sceneConfig);
	}

	public preload() {}

	public create() {}
	public update() {}

	public destroy() {}
}
