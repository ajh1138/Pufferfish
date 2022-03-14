import * as Phaser from "phaser";

import { gameSettings } from "../gameSettings";
import backgroundSetup from './backgroundSetup';
import Pufferfish from "../classes/Pufferfish";
import Whale from "../classes/Whale";
import Enemy from "../classes/Enemy";
import Harpoon from "../classes/Harpoon";
import Shark from "../classes/Shark";
import HealthMeter from "../classes/HealthMeter";
import Scoreboard from "../classes/Scoreboard";
import GameOverDisplay from "../classes/GameOverDisplay";
import Jellyfish from "../classes/Jellyfish";
import PlayerLivesDisplay from "../classes/PlayerLivesDisplay";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Scene01",
};

export default class Scene01 extends Phaser.Scene {
	private player: Pufferfish;
	private whale: Whale;

	private playerMaxPuffs = 3;
	private playerLives = gameSettings.playerLives;
	private score = 0;

	private gameIsOver = false;

	private wasd: object;
	private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

	harpoon: Harpoon;
	shark: Shark;
	enemies: Phaser.Physics.Arcade.Group;
	spacebar: Phaser.Input.Keyboard.Key;

	healthMeter: HealthMeter;
	scoreboard: Scoreboard;
	gameOverDisplay: GameOverDisplay;
	playerLivesDisplay: PlayerLivesDisplay;

	constructor() {
		super(sceneConfig);
	}

	public preload() {

	}

	// ****************************************** Create ********************************************************** //
	public create() {
		//
		backgroundSetup(this);
		this.createUI();
		this.createPlayer();
		this.createWhale();
		this.createControls();
		this.createEnemies();
		this.createColliders();
	}

	createUI() {
		this.healthMeter = new HealthMeter(this);
		this.scoreboard = new Scoreboard(this);
		this.gameOverDisplay = new GameOverDisplay(this);
		this.playerLivesDisplay = new PlayerLivesDisplay(this);
	}

	createControls() {
		this.wasd = this.input.keyboard.addKeys({ up: Phaser.Input.Keyboard.KeyCodes.W, down: Phaser.Input.Keyboard.KeyCodes.S, left: Phaser.Input.Keyboard.KeyCodes.A, right: Phaser.Input.Keyboard.KeyCodes.D });
		this.cursorKeys = this.input.keyboard.createCursorKeys();

		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	}

	createWhale() {
		this.whale = new Whale(this);
	}

	createPlayer() {
		this.player = new Pufferfish(this);
	}

	createEnemies() {
		this.enemies = this.physics.add.group();
		this.enemies.runChildUpdate = true;

		let shark = new Shark(this);
		let harpoon = new Harpoon(this);
		let jellyfish = new Jellyfish(this);

		this.enemies.add(shark);
		this.enemies.add(harpoon);
		this.enemies.add(jellyfish);
	}

	createColliders() {
		this.physics.add.overlap(this.player, this.enemies, (obj1, obj2) => {
			this.handlePlayerEnemyCollision(obj1, obj2);
		});

		this.physics.add.overlap(this.whale, this.enemies, (obj1, obj2) => {
			this.handleWhaleEnemyCollision(obj1, obj2);
		});
	}

	// ********************************************* Update *************************************************** //
	public update() {
		this.whale.update();
		this.player.update();
		this.checkKeyboardInput();
		this.updateUI();
	}

	checkKeyboardInput() {
		if (this.player.isAlive && !this.gameIsOver) {
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
					this.player.setTexture("player", 0);
				}
			}

			if (goRight && this.player.x < gameSettings.playerMaxX) {
				this.player.setVelocityX(gameSettings.playerSpeed);
				//		this.player.setTexture("player", 4);
			} else if (goLeft && this.player.x > gameSettings.playerMinX) {
				this.player.setVelocityX(-gameSettings.playerSpeed);
				//		this.player.setTexture("player", 2);
			} else {
				this.player.setVelocityX(0);
			}

			if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
				if (this.gameIsOver) {
					this.handleRestartGame();
				} else {
					this.handlePlayerPuff();
				}
			}
		}
	}

	updateUI() {
		this.healthMeter.update(this.whale.health);
		this.scoreboard.update(this.score);
	}

	// ********************* Handle Events ********************************* //
	handlePlayerEnemyCollision(obj1, obj2) {
		if (this.player.isAlive && obj2.isAlive) {
			if (this.player.puffs > 0) {
				let baseEnemy = obj2 as Enemy;
				this.player.puffs--;
				this.score = this.score + baseEnemy.pointValue;

				baseEnemy.dieDramatically();
			} else {
				this.handlePlayerIsHurt();
			}
		}
	}

	handlePlayerPuff() {
		if (this.player.puffs < this.playerMaxPuffs) {
			this.player.puffs++;
		}
	}

	handlePlayerIsHurt() {
		this.player.dieDramatically();
		this.playerLives--;
		this.playerLivesDisplay.update(this.playerLives);

		if (this.playerLives < 1) {
			this.handleGameOver();
		} else if (this.whale.isAlive) {
			setTimeout(() => { this.resetLevel(); }, gameSettings.playerRespawnMilliseconds);
			this.enemies.children.each(element => {
				let anEnemy = element as Enemy;
				anEnemy.prepareToRespawn();
			});
		}
	}

	resetLevel() {
		this.player.reset();

		this.enemies.children.each(element => {
			let enemy = element as Enemy;
			enemy.prepareToRespawn();
		});
	}

	handleWhaleEnemyCollision(obj1, obj2) {
		if (this.whale.isAlive && this.whale.canBeInjured) {
			let enemy = obj2 as Enemy;
			enemy.isAlive = false;
			this.whale.health = this.whale.health - enemy.damage;

			if (this.whale.health <= 0) {
				this.handleWhaleDeath();
			} else {
				this.whale.reactToHit();
				enemy.doWhaleHit();
			}
		}
	}

	handleWhaleDeath() {
		this.whale.dieDramatically();
		setTimeout(() => { this.handleGameOver() }, gameSettings.gameOverDelayMilliseconds);
	}

	handleGameOver() {
		this.gameIsOver = true;

		this.enemies.children.each(element => {
			let anEnemy = element as Enemy;
			anEnemy.stopEverything();
		});

		this.gameOverDisplay.show();
	}

	handleRestartGame() {
		this.scene.start("Scene01");
	}
	// ********************* destroy *************************************** //
	public destroy() { }
}
