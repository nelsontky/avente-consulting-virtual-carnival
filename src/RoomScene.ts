import "phaser";

import Player from "./Player";
import NPC from "./NPC";
import Dialog from "./Dialog";
import NPCDataInterface from "./NPCDataInterface";
import { updateStationData } from "./dbUtils";
import {
  ADRIAN,
  BENEDICT,
  CHLOE,
  DONALD,
  GREGORY,
  HARIS,
  KINGSTON,
  MANEESHA,
  MIN_HEIN,
  PUNNAG,
  SAMANTHA,
  SVARNIM,
  WAI_SIANG,
} from "./NPCData";
import {
  getRoom0,
  getRoom1,
  getRoom2,
  getRoom3,
  getRoom4,
} from "./getAllTileSets";

export default class RoomScene extends Phaser.Scene {
  player: Player;
  overWorldDoorLocation: { x: number; y: number };
  roomId: number;
  npcs: NPC[];
  dialog: Dialog;
  map: Phaser.Tilemaps.Tilemap;
  isHarrisDialogOpen: boolean;

  constructor() {
    super("room");
    this.npcs = [];
    this.isHarrisDialogOpen = false;
  }

  init(data: {
    doorId: number;
    overWorldDoorLocation: { x: number; y: number };
  }) {
    this.overWorldDoorLocation = data.overWorldDoorLocation;
    this.roomId = data.doorId;
  }

  create() {
    const map = this.make.tilemap({
      key: "" + this.roomId,
    });
    this.map = map;

    let allTileSets: Phaser.Tilemaps.Tileset[];
    switch (this.roomId) {
      case 0:
        allTileSets = getRoom0(map);
        break;
      case 1:
        allTileSets = getRoom1(map);
        break;
      case 2:
        allTileSets = getRoom2(map);
        break;
      case 3:
        allTileSets = getRoom3(map);
        break;
      default:
        allTileSets = getRoom4(map);
    }

    const ground = map.createStaticLayer("GROUND", allTileSets);
    const blocking = map.createStaticLayer("OBJECTS", allTileSets);
    const sky = map.createStaticLayer("SKY / PASSABLE", allTileSets);

    sky.setDepth(10);

    blocking.setCollisionByExclusion([-1]);

    const spawnPoint: any = map.findObject(
      "objects",
      (obj) => obj.name === "spawn"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    this.physics.add.collider(this.player.sprite, blocking);

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // blocking.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });

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

    const doorObjects = map.filterObjects(
      "objects",
      (obj) => obj.name === "door"
    );
    doorObjects.forEach((obj: any) => {
      const sprites = map.createFromObjects("objects", obj.id, { key: "exit" });
      const group = this.physics.add.staticGroup();
      group.addMultiple(sprites);
      this.physics.add.overlap(
        this.player.sprite,
        group,
        () =>
          this.scene.start("main", { spawnPoint: this.overWorldDoorLocation }),
        null,
        this
      );
    });

    const objectsInRoom: {
      name: string;
      x: number;
      y: number;
    }[] = map
      .filterObjects("objects", (obj) => obj.name !== undefined)
      .map(({ name, x, y }: any) => ({ name, x, y }));

    for (const obj of objectsInRoom) {
      switch (obj.name) {
        case MIN_HEIN.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, MIN_HEIN));
          break;
        case KINGSTON.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, KINGSTON));
          break;
        case BENEDICT.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, BENEDICT));
          break;
        case GREGORY.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, GREGORY));
          break;
        case CHLOE.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, CHLOE));
          break;
        case WAI_SIANG.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, WAI_SIANG));
          break;
        case SVARNIM.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, SVARNIM));
          break;
        case DONALD.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, DONALD));
          break;
        case SAMANTHA.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, SAMANTHA));
          break;
        case ADRIAN.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, ADRIAN));
          break;
        case PUNNAG.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, PUNNAG));
          break;
        case HARIS.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, HARIS));
          break;
        case MANEESHA.name:
          this.npcs.push(new NPC(this, obj.x, obj.y, this.player, MANEESHA));
          break;
      }
    }
    // Open Haris ending dialog
    this.events.on(
      "resume",
      (_, data: { score: number }) =>
        this.roomId === 4 && this.openHarisLastDialog(data.score)
    );
  }

  update() {
    this.player.update();
    this.npcs.forEach((npc) => npc.update());
  }

  async openHarisLastDialog(score: number) {
    if (!this.isHarrisDialogOpen) {
      this.isHarrisDialogOpen = true;
      this.player.isFrozen = true;

      await new Dialog(
        this,
        {
          content: `Your score is ${score}!`,
          choices: [{ choiceText: `Next`, isAnswer: true }],
        },
        false
      ).create();

      await updateStationData(sessionStorage.getItem("uid"), "Haris", score);
      this.player.isFrozen = false;
      this.isHarrisDialogOpen = false;
    }
  }
}
