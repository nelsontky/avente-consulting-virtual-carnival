import "phaser";

import Player from "./Player";
import {
  getIsBossRoomUnlocked,
  getNumberOfBossesCleared,
  getNumberOfNpcsCleared,
} from "./dbUtils";
import { getOverWorld } from "./getAllTileSets";
import Dialog from "./Dialog";
import { nextButtonOnlyChoices } from "./NPCData";

export default class MainScene extends Phaser.Scene {
  controls: Phaser.Cameras.Controls.FixedKeyControl;
  player: Player;
  gender: "girl" | "boy";
  spawnPoint: { x: number; y: number };
  progressText: Phaser.GameObjects.Text;
  numberOfNpcsText: Phaser.GameObjects.Text;
  isRoomLockedDialogOpen: boolean;

  constructor() {
    super("main");

    this.isRoomLockedDialogOpen = false;
  }

  init(data: {
    spawnPoint?: { x: number; y: number };
    gender?: "girl" | "boy";
  }) {
    if (data.spawnPoint !== undefined) {
      this.spawnPoint = data.spawnPoint;
    }
    if (data.gender !== undefined) {
      this.gender = data.gender;
    }
  }

  create() {
    const map = this.make.tilemap({
      key: "overworld",
    });
    const allTileSets = getOverWorld(map);

    const Ground7 = map.createStaticLayer("7 Ground", allTileSets);
    const Ground6 = map.createStaticLayer("6 Ground", allTileSets);
    const Ground5 = map.createStaticLayer("5 Ground", allTileSets);
    const Object4 = map.createStaticLayer("4 Object", allTileSets);
    const ObjectEgyptStatueAndSea3 = map.createStaticLayer(
      "3 Object(Egypt Statue and Sea)",
      allTileSets
    );
    const ObjectsPolesAndTrees2 = map.createStaticLayer(
      "2 Objects Poles and Trees",
      allTileSets
    );
    const SkyPassable1 = map.createStaticLayer("1 Sky / Passable", allTileSets);
    const SkyPassable0 = map.createStaticLayer("0 Sky Passable", allTileSets);

    SkyPassable1.setDepth(10);
    SkyPassable0.setDepth(11);

    Object4.setCollisionByExclusion([-1]);
    ObjectEgyptStatueAndSea3.setCollisionByExclusion([-1]);
    ObjectsPolesAndTrees2.setCollisionByExclusion([-1]);

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // Object4.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });
    // ObjectEgyptStatueAndSea3.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });
    // ObjectsPolesAndTrees2.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(0, 0, 255, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });

    const spawnPoint: any = map.findObject(
      "objects",
      (obj) => obj.name === "spawn"
    );
    if (this.spawnPoint === undefined) {
      this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    } else {
      this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
    }

    this.physics.add.collider(this.player.sprite, Object4);
    this.physics.add.collider(this.player.sprite, ObjectEgyptStatueAndSea3);
    this.physics.add.collider(this.player.sprite, ObjectsPolesAndTrees2);

    // Set up camera
    const camera = this.cameras.main;
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    // Set up rooms
    const doorObjects = map.filterObjects(
      "objects",
      (obj: any) =>
        obj.properties !== undefined &&
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
        this.enterDoorCallback,
        null,
        this
      );
    });
  }

  enterDoorCallback = async (_, door: any) => {
    const doorId = door.data.list[0].value;

    if (
      doorId === 4 &&
      !getIsBossRoomUnlocked() &&
      !this.isRoomLockedDialogOpen
    ) {
      // Boss room still locked
      this.player.sprite.setY(this.player.sprite.y + 50);
      this.isRoomLockedDialogOpen = true;
      this.player.isFrozen = true;
      await new Dialog(
        this,
        {
          content: `Room locked! Please talk to all the other NPCs in the other rooms before trying to enter again!`,
          choices: nextButtonOnlyChoices,
        },
        false
      ).create();
      this.isRoomLockedDialogOpen = false;
      this.player.isFrozen = false;
      return;
    } else {
      this.scene.start("room", {
        doorId,
        overWorldDoorLocation: { x: door.x, y: door.y + 50 },
      });
    }
  };

  update() {
    this.player.update();
  }
}
