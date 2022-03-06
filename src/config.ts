import { gameSettings } from "./gameSettings";
import Preloader from "./scenes/Preloader";
import AttractMode from "./scenes/AttractMode";
import Scene01 from "./scenes/Scene01";
import Scene02 from "./scenes/Scene02";
import Scene03 from "./scenes/Scene03";

export const config: Phaser.Types.Core.GameConfig = {
	scene: [Preloader, AttractMode, Scene01, Scene02, Scene03],
	title: "phaser typescript base game",
	type: Phaser.AUTO,
	scale: {
		width: gameSettings.width,
		height: gameSettings.height,
	},
	width: gameSettings.width,
	height: gameSettings.height,
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
	parent: "game",
	backgroundColor: "#000000",
};
