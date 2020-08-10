import "phaser";

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
    this.load.spritesheet("chloe", "assets/tiles/NPCs/chloe.png", {
      frameWidth: 28,
      frameHeight: 56,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
    });
    const tileset = map.addTilesetImage("tuxmon-sample-32px", "tiles");
    const belowLayer = map.createStaticLayer("below_world", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("above_world", tileset, 0, 0);
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

    const camera = this.cameras.main;
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    const doors = this.physics.add.staticGroup();
    worldLayer.forEachTile((tile: any) => {
      if (tile.properties.isDoor) {
        doors.create(tile.getCenterX(), tile.getCenterY(), "door");
        this.spawnPoint = { x: tile.getCenterX(), y: tile.getCenterY() + 40 };
      }
    });
    doors.toggleVisible();
    this.physics.add.overlap(
      this.player.sprite,
      doors,
      () => this.scene.start("room", { spawnPoint: this.spawnPoint }),
      null,
      this
    );
  }

  update(time: any, delta: number) {
    this.player.update();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
  scene: [MainScene, RoomScene],
};

const game = new Phaser.Game(config);
