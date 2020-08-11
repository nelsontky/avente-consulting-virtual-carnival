import "phaser";

import Player from "./Player";
import NPC from "./NPC";
import Dialog from "./Dialog";

export default class RoomScene extends Phaser.Scene {
  player: Player;
  spawnPoint: { x: number; y: number };
  npc: NPC;
  dialog: Dialog;

  constructor() {
    super("room");
  }

  init({ spawnPoint }: any) {
    this.spawnPoint = spawnPoint;
  }

  preload() {
    this.load.image("tiles", "assets/tiles/tuxmon-sample-32px.png");
    this.load.tilemapTiledJSON("room", "assets/tiles/room.json");
    this.load.spritesheet("player", "assets/atlas.png", {
      frameWidth: 32,
      frameHeight: 43,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: "room",
    });
    const tileset = map.addTilesetImage("tuxmon-sample-32px", "tiles");
    const belowLayer = map.createStaticLayer("below_world", tileset, 0, 0);
    const spawnPoint: any = map.findObject(
      "objects",
      (obj) => obj.name === "spawn"
    );

    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    const camera = this.cameras.main;
    camera.setBounds(
      -300 + map.widthInPixels / 2,
      -300 + map.heightInPixels / 2,
      map.widthInPixels,
      map.heightInPixels,
      true
    );
    camera.startFollow(this.player.sprite);

    const doors = this.physics.add.staticGroup();
    belowLayer.forEachTile((tile: any) => {
      if (tile.properties.isDoor) {
        doors.create(tile.getCenterX(), tile.getCenterY(), "door");
      }
    });
    doors.toggleVisible();
    this.physics.add.overlap(
      this.player.sprite,
      doors,
      () => this.scene.start("main", { spawnPoint: this.spawnPoint }),
      null,
      this
    );

    const npcSpawn: any = map.findObject(
      "objects",
      (obj) => obj.name === "npc"
    );

    const dialog = new Dialog(
      this,
      map.widthInPixels / 2,
      map.heightInPixels / 2
    );
    this.npc = new NPC(this, npcSpawn.x, npcSpawn.y, this.player, () =>
      dialog.create()
    );
  }

  update() {
    this.player.update();
    this.npc.update();
  }
}
