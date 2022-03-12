import * as Phaser from "phaser";
import { gameSettings } from "../gameSettings";
import Enemy from "./Enemy";

export default class Shark extends Enemy {
	public speedX: number;
	public speedY: number;

	constructor(scene: Phaser.Scene) {
		super(scene, "shark", 150);
	}

	public reset = () => {
		//
	};

	public update = () => {
		// 
	};
}