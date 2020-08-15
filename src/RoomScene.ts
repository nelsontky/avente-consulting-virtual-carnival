import "phaser";

import Player from "./Player";
import NPC from "./NPC";
import Dialog from "./Dialog";
import roomData from "./roomData";
import NPCDataInterface from "./NPCDataInterface";

export default class RoomScene extends Phaser.Scene {
  player: Player;
  overWorldDoorLocation: { x: number; y: number };
  roomId: number;
  npcs: NPC[];
  dialog: Dialog;

  constructor() {
    super("room");
    this.npcs = [];
  }

  init(data: {
    doorId: number;
    overWorldDoorLocation: { x: number; y: number };
  }) {
    this.overWorldDoorLocation = data.overWorldDoorLocation;
    this.roomId = data.doorId;
  }

  preload() {
    this.load.tilemapTiledJSON("room", "assets/tiles/test/room.json");
  }

  create() {
    const map = this.make.tilemap({
      key: "room",
    });
    const tileset = map.addTilesetImage("tuxmon-sample-32px", "tiles");
    const belowLayer = map.createStaticLayer("below_world", tileset, 0, 0);
    const blocking = map.createStaticLayer("blocking", tileset, 0, 0);

    blocking.setCollisionByExclusion([-1]);

    const spawnPoint: any = map.findObject(
      "objects",
      (obj) => obj.name === "spawn"
    );

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "boy");
    this.physics.add.collider(this.player.sprite, blocking);

    const camera = this.cameras.main;
    camera.setBounds(
      // -300 + map.widthInPixels / 2,
      // -300 + map.heightInPixels / 2,
      0,
      0,
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
      () =>
        this.scene.start("main", { spawnPoint: this.overWorldDoorLocation }),
      null,
      this
    );

    const npcSpawnPoints: { x: number; y: number }[] = map
      .filterObjects("objects", (obj) => obj.name === "npc")
      .map(({ x, y }: any) => ({ x, y }));

    const npcsInRoom: NPCDataInterface[] = roomData[this.roomId];
    for (let i = 0; i < npcsInRoom.length; i++) {
      this.npcs.push(
        new NPC(
          this,
          npcSpawnPoints[i].x,
          npcSpawnPoints[i].y,
          this.player,
          npcsInRoom[i],
          map.widthInPixels,
          map.heightInPixels
        )
      );
    }
  }

  update() {
    this.player.update();
    this.npcs.forEach((npc) => npc.update());
  }
}
