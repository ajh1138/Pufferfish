import * as Phaser from "phaser";

import { gameSettings } from "../gameSettings";
import backgroundSetup from './backgroundSetup';
import Pufferfish from "../classes/Pufferfish";
import Whale from "../classes/Whale";
import Enemy from "../classes/Enemy";
import Harpoon from "../classes/Harpoon";
import Shark from "../classes/Shark";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Scene01",
};

export default class Scene01 extends Phaser.Scene {
	private player: Pufferfish;
	private playerIsAlive = true;
	private whale: Whale;

	private wasd: object;
	private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

	harpoon: Harpoon;
	shark: Shark;
	enemyGroup: Phaser.Physics.Arcade.Group;

	constructor() {
		super(sceneConfig);
	}

	public preload() {

	}

	// ****************************************** Create ********************************************************** //
	public create() {
		//
		backgroundSetup(this);
		this.createPlayer();
		this.createWhale();
		this.createControls();
		this.createEnemyGroup();
	}

	createControls() {
		this.wasd = this.input.keyboard.addKeys({ up: Phaser.Input.Keyboard.KeyCodes.W, down: Phaser.Input.Keyboard.KeyCodes.S, left: Phaser.Input.Keyboard.KeyCodes.A, right: Phaser.Input.Keyboard.KeyCodes.D });
		this.cursorKeys = this.input.keyboard.createCursorKeys();
	}

	createWhale() {
		this.whale = new Whale(this);
	}

	createPlayer() {
		this.player = new Pufferfish(this);
	}

	createEnemyGroup() {
		this.enemyGroup = this.physics.add.group();
		this.enemyGroup.runChildUpdate = true;

		let myharpoon = new Harpoon(this);
		this.shark = new Shark(this);

		this.enemyGroup.add(myharpoon);
		this.enemyGroup.add(this.shark);
	}

	// ********************************************* Update *************************************************** //
	public update() {
		this.whale.update();
		this.player.update();
		this.checkKeyboardInput();
	}

	checkKeyboardInput() {
		if (this.playerIsAlive) {
			let goUp = this.cursorKeys.up.isDown || this.input.keyboard.checkDown(this.wasd["up"]);
			let goDown = this.cursorKeys.down.isDown || this.input.keyboard.checkDown(this.wasd["down"]);
			let goLeft = this.cursorKeys.left.isDown || this.input.keyboard.checkDown(this.wasd["left"]);
			let goRight = this.cursorKeys.right.isDown || this.input.keyboard.checkDown(this.wasd["right"]);

			if (goUp && this.player.y > gameSettings.playerMinY) {
				this.player.setVelocityY(-gameSettings.playerSpeed);
			} else if (goDown && this.player.y < gameSettings.playerMaxY) {
				this.player.setVelocityY(gameSettings.playerSpeed);
			} else {
				if (this.player.speedX >= -gameSettings.playerSpeed) {
					//this.player.setVelocityY(this.player.speedY - 1);
					//		this.player.setTexture("player", 0);
				}
			}

			if (goRight && this.player.x < gameSettings.width - this.player.width) {
				this.player.setVelocityX(gameSettings.playerSpeed);
				//		this.player.setTexture("player", 4);
			} else if (goLeft && this.player.x > 0) {
				this.player.setVelocityX(-gameSettings.playerSpeed);
				//		this.player.setTexture("player", 2);
			} else {
				this.player.setVelocityX(0);
			}
		}
	}

	updateEnemies() {
	}

	// ********************* destroy *************************************** //
	public destroy() { }
}
