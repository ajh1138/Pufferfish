import * as Phaser from "phaser";
import Bubble from "../classes/Bubble";
import { gameSettings } from "../gameSettings";


let coralMinX = 20;
let coralMaxX = gameSettings.width - 50;
let coralMinY = gameSettings.height - 190;
let coralMaxY = gameSettings.height - 175;

export default function backgroundSetup(scene: Phaser.Scene) {

	let seafloor = scene.add.rectangle(0, gameSettings.height - 40, gameSettings.width, 40, 0xa6856d);
	seafloor.setOrigin(0, 0);

	let coral01 = scene.add.sprite(getRandomX(), getRandomY(), "coral_01");
	coral01.setOrigin(0, 0);
	coral01.setDepth(10);

	let coral02 = scene.add.sprite(getRandomX(), getRandomY(), "coral_02");
	coral02.setOrigin(0, 0);

	let coral03 = scene.add.sprite(getRandomX(), getRandomY(), "coral_02");
	coral03.setOrigin(0, 0);

}

function getRandomX() {
	return Phaser.Math.Between(coralMinX, coralMaxX);
}

function getRandomY() {
	return Phaser.Math.Between(coralMinY, coralMaxY);
}