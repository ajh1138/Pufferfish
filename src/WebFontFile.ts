// modification of code from https://blog.ourcade.co/posts/2020/phaser-3-google-fonts-webfontloader/
import * as Phaser from "phaser";

import * as WebFontLoader from "webfontloader";

export default class WebFontFile extends Phaser.Loader.File {
	/**
	 * @param {Phaser.Loader.LoaderPlugin} loader
	 * @param {string | string[]} fontNames
	 * @param {string} [service]
	 */

	private fontNames;
	private service;
	private fontsLoadedCount: integer;
	public loader;

	constructor(loader, fontNames, service = "google") {
		super(loader, {
			type: "webfont",
			key: fontNames.toString(),
		});

		this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
		this.service = service;
		this.loader = loader;

		this.fontsLoadedCount = 0;
	}

	load() {
		const config = {
			fontactive: (familyName) => {
				this.checkLoadedFonts(familyName);
			},
			fontinactive: (familyName) => {
				this.checkLoadedFonts(familyName);
			},
		};

		switch (this.service) {
			case "google":
				config[this.service] = this.getGoogleConfig();
				break;

			case "adobe-edge":
				config["typekit"] = this.getAdobeEdgeConfig();
				break;

			default:
				throw new Error("Unsupported font service");
		}

		WebFontLoader.load(config);
	}

	getGoogleConfig() {
		return {
			families: this.fontNames,
		};
	}

	getAdobeEdgeConfig() {
		return {
			id: this.fontNames.join(";"),
			api: "//use.edgefonts.net",
		};
	}

	checkLoadedFonts(familyName) {
		if (this.fontNames.indexOf(familyName) < 0) {
			return;
		}

		++this.fontsLoadedCount;
		if (this.fontsLoadedCount >= this.fontNames.length) {
			this.loader.nextFile(this, true);
		}
	}
}
