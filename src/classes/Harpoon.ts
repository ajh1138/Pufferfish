import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Harpoon extends Enemy {
	public speedX: number;
	public speedY: number;

	constructor(scene: Phaser.Scene) {
		super(scene, "harpoon", 300);
	}

	public update() {

	}
}