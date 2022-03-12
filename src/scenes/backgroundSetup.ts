import * as Phaser from "phaser";
import Bubble from "../classes/Bubble";
import { gameSettings } from "../gameSettings";

export default function backgroundSetup(scene: Phaser.Scene) {
	let seafloor = scene.add.rectangle(0, gameSettings.height - 40, gameSettings.width, 40, 0xa6856d);
	seafloor.setOrigin(0, 0);

	let coral01 = scene.add.sprite(50, gameSettings.height - 195, "coral_01");
	coral01.setOrigin(0, 0);

	let coral02 = scene.add.sprite(250, gameSettings.height - 175, "coral_02");
	coral02.setOrigin(0, 0);
}
