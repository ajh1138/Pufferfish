import * as Phaser from "phaser";
import { gameSettings } from "./gameSettings";
import Preloader from "./scenes/Preloader";
import AttractMode from "./scenes/AttractMode";
import Scene01 from "./scenes/Scene01";
import Scene02 from "./scenes/Scene02";
import Scene03 from "./scenes/Scene03";
import Credits from "./scenes/Credits";

export const config: Phaser.Types.Core.GameConfig = {
	scene: [Preloader, AttractMode, Credits, Scene01, Scene02, Scene03],
	title: "Pufferfish",
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
	backgroundColor: "#3faad1",
};
