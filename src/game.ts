import "phaser";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import Player from "./Player";
import RoomScene from "./RoomScene";

export default class MainScene extends Phaser.Scene {
  controls: Phaser.Cameras.Controls.FixedKeyControl;
  player: Player;
  spawnPoint: { x: number; y: number };

  constructor() {
    super("main");
  }

  init({ spawnPoint }: any) {
    this.spawnPoint = spawnPoint;
  }

  preload() {
    this.load.image("tiles", "assets/tiles/tuxmon-sample-32px.png");
    this.load.tilemapTiledJSON("map", "assets/tiles/world.json");
    this.load.spritesheet("player", "assets/atlas.png", {
      frameWidth: 32,
      frameHeight: 43,
    });

    // NPCs
    this.load.spritesheet("Adrian", "assets/NPCs/Adrian.png", {
      frameWidth: 33,
      frameHeight: 61,
    });
    this.load.spritesheet("Ben", "assets/NPCs/Ben.png", {
      frameWidth: 30,
      frameHeight: 55,
    });
    this.load.spritesheet("Chloe", "assets/NPCs/Chloe.png", {
      frameWidth: 28,
      frameHeight: 56,
    });
    this.load.spritesheet("Donald", "assets/NPCs/Donald.png", {
      frameWidth: 30,
      frameHeight: 61,
    });
    this.load.spritesheet("Greg", "assets/NPCs/Greg.png", {
      frameWidth: 30,
      frameHeight: 56,
    });
    this.load.spritesheet("Kingston", "assets/NPCs/Kingston.png", {
      frameWidth: 30,
      frameHeight: 53,
    });
    this.load.spritesheet("Min Hein", "assets/NPCs/Min Hein.png", {
      frameWidth: 30,
      frameHeight: 62,
    });
    this.load.spritesheet("Samantha", "assets/NPCs/Samantha.png", {
      frameWidth: 28,
      frameHeight: 52,
    });
    this.load.spritesheet("Svarnim", "assets/NPCs/Svarnim.png", {
      frameWidth: 28,
      frameHeight: 52,
    });
    this.load.spritesheet("Wai Siang", "assets/NPCs/Wai Siang.png", {
      frameWidth: 30,
      frameHeight: 53,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
    });
    const tileset = map.addTilesetImage("tuxmon-sample-32px", "tiles");
    const belowLayer = map.createStaticLayer("below", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("above", tileset, 0, 0);
    aboveLayer.setDepth(10);

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint: any = map.findObject(
      "objects",
      (obj) => obj.name === "spawn"
    );
    if (this.spawnPoint === undefined) {
      this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    } else {
      this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
    }
    this.physics.add.collider(this.player.sprite, worldLayer);

    // Set up camera
    const camera = this.cameras.main;
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    // Set up rooms
    const doorObjects = map.filterObjects("objects", (obj: any) =>
      obj.properties.some((prop: any) => prop.name === "doorId")
    );
    doorObjects.forEach((obj: any) => {
      const sprites = map.createFromObjects("objects", obj.id, null);
      const group = this.physics.add.staticGroup();
      group.addMultiple(sprites);
      group.setVisible(false);
      this.physics.add.overlap(
        this.player.sprite,
        group,
        (_, door: any) => {
          const doorId = door.data.list[0].value;
          this.scene.start("room", {
            spawnPoint: { x: door.x, y: door.y + 40 },
          });
        },
        null,
        this
      );
    });
  }

  update() {
    this.player.update();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  render: {
    pixelArt: true,
  },
  physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
  scene: [MainScene, RoomScene],
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
  },
};

const game = new Phaser.Game(config);
