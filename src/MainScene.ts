import "phaser";

import Player from "./Player";
import {
  getIsBossRoomUnlocked,
  getNumberOfBossesCleared,
  getNumberOfNpcsCleared,
  getIsRoom1Unlocked,
  getIsRoom2Unlocked,
  getIsRoom3Unlocked,
} from "./dbUtils";
import { getOverWorld } from "./getAllTileSets";
import Dialog from "./Dialog";
import { nextButtonOnlyChoices } from "./NPCData";
import { spawnX, spawnY, width, height } from "./config";

export default class MainScene extends Phaser.Scene {
  controls: Phaser.Cameras.Controls.FixedKeyControl;
  player: Player;
  gender: "girl" | "boy";
  spawnPoint: { x: number; y: number };
  progressText: Phaser.GameObjects.Text;
  numberOfNpcsText: Phaser.GameObjects.Text;
  isRoomLockedDialogOpen: boolean;
  activeChunks: {
    [x: number]: {
      layers: Phaser.Tilemaps.StaticTilemapLayer[];
      colliders: Phaser.Physics.Arcade.Collider[];
    };
  };

  constructor() {
    super("main");
    this.isRoomLockedDialogOpen = false;
    this.activeChunks = {};
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

    if (this.spawnPoint === undefined) {
      this.player = new Player(this, spawnX, spawnY);
    } else {
      this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
    }

    this.player.sprite.setDepth(9);

    const { x, y } = this.player.sprite;
    let activeChunks: number[] = [];
    if (x - width / 2 <= 2240 && y - height / 2 <= 1600) {
      activeChunks.push(0);
    }
    if (x + width / 2 > 2240 && y - height / 2 <= 1600) {
      activeChunks.push(1);
    }
    if (x - width / 2 <= 2240 && y + height / 2 > 1600) {
      activeChunks.push(2);
    }
    if (x + width / 2 > 2240 && y + height / 2 > 1600) {
      activeChunks.push(3);
    }
    activeChunks.forEach((chunk) => this.createChunk(chunk));

    // Set up camera
    const camera = this.cameras.main;
    camera.setBounds(0, 0, 4480, 3200);
    camera.startFollow(this.player.sprite);
  }

  createChunk(id: number) {
    const map = this.make.tilemap({
      key: "overworld" + id,
    });

    const allTileSets = getOverWorld(map);

    let offsetX: number;
    let offsetY: number;

    if (id === 0) {
      offsetX = 0;
      offsetY = 0;
    } else if (id === 1) {
      offsetX = 2240;
      offsetY = 0;
    } else if (id === 2) {
      offsetX = 0;
      offsetY = 1600;
    } else {
      offsetX = 2240;
      offsetY = 1600;
    }

    const layers = [
      map.createStaticLayer("7 Ground", allTileSets, offsetX, offsetY),
      map.createStaticLayer("6 Ground", allTileSets, offsetX, offsetY),
      map.createStaticLayer("5 Ground", allTileSets, offsetX, offsetY),
      map.createStaticLayer("4 Object", allTileSets, offsetX, offsetY),
      map.createStaticLayer(
        "3 Object(Egypt Statue and Sea)",
        allTileSets,
        offsetX,
        offsetY
      ),
      map.createStaticLayer(
        "2 Objects Poles and Trees",
        allTileSets,
        offsetX,
        offsetY
      ),
      map.createStaticLayer("1 Sky / Passable", allTileSets, offsetX, offsetY),
      map.createStaticLayer("0 Sky Passable", allTileSets, offsetX, offsetY),
    ];

    layers[6].setDepth(10);
    layers[7].setDepth(11);

    layers[5].setCollisionByExclusion([-1]);
    layers[4].setCollisionByExclusion([-1]);
    layers[3].setCollisionByExclusion([-1]);

    const colliders = [
      this.physics.add.collider(this.player.sprite, layers[5]),
      this.physics.add.collider(this.player.sprite, layers[4]),
      this.physics.add.collider(this.player.sprite, layers[3]),
    ];

    // Set up rooms
    const doorObjects = map.filterObjects(
      "objects",
      (obj: any) =>
        obj.properties !== undefined &&
        obj.properties.some((prop: any) => prop.name === "doorId")
    );
    doorObjects.forEach((obj: any) => {
      const sprites = map
        .createFromObjects("objects", obj.id, null)
        .map((sprite) => {
          sprite.x = sprite.x + offsetX;
          sprite.y = sprite.y + offsetY;
          return sprite;
        });
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

    this.activeChunks = { ...this.activeChunks, [id]: { layers, colliders } };
  }

  deleteChunk(id: number) {
    this.activeChunks[id].layers.forEach((layer) => layer.destroy());
    this.activeChunks[id].colliders.forEach((collider) =>
      this.physics.world.removeCollider(collider)
    );
    delete this.activeChunks[id];
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
          content: `Station locked! Please talk to all the other NPCs in the other stations before trying to enter again!`,
          choices: nextButtonOnlyChoices,
        },
        false
      ).create();
      this.isRoomLockedDialogOpen = false;
      this.player.isFrozen = false;
      return;
    } else if (
      doorId === 1 &&
      !getIsRoom1Unlocked() &&
      !this.isRoomLockedDialogOpen
    ) {
      // Boss room still locked
      this.player.sprite.setY(this.player.sprite.y + 50);
      this.isRoomLockedDialogOpen = true;
      this.player.isFrozen = true;
      await new Dialog(
        this,
        {
          content: `Station locked! Please talk to all the NPCs in station 1 before trying to enter again!`,
          choices: nextButtonOnlyChoices,
        },
        false
      ).create();
      this.isRoomLockedDialogOpen = false;
      this.player.isFrozen = false;
      return;
    } else if (
      doorId === 2 &&
      !getIsRoom2Unlocked() &&
      !this.isRoomLockedDialogOpen
    ) {
      // Boss room still locked
      this.player.sprite.setY(this.player.sprite.y + 60);
      this.isRoomLockedDialogOpen = true;
      this.player.isFrozen = true;
      await new Dialog(
        this,
        {
          content: `Station locked! Please talk to all the NPCs in station 2 before trying to enter again!`,
          choices: nextButtonOnlyChoices,
        },
        false
      ).create();
      this.isRoomLockedDialogOpen = false;
      this.player.isFrozen = false;
      return;
    } else if (
      doorId === 3 &&
      !getIsRoom3Unlocked() &&
      !this.isRoomLockedDialogOpen
    ) {
      // Boss room still locked
      this.player.sprite.setY(this.player.sprite.y + 60);
      this.isRoomLockedDialogOpen = true;
      this.player.isFrozen = true;
      await new Dialog(
        this,
        {
          content: `Station locked! Please talk to all the NPCs in station 3 before trying to enter again!`,
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

    const { x, y } = this.player.sprite;
    let activeChunks: number[] = [];
    if (x - width / 2 <= 2240 && y - height / 2 <= 1600) {
      activeChunks.push(0);
    }
    if (x + width / 2 > 2240 && y - height / 2 <= 1600) {
      activeChunks.push(1);
    }
    if (x - width / 2 <= 2240 && y + height / 2 > 1600) {
      activeChunks.push(2);
    }
    if (x + width / 2 > 2240 && y + height / 2 > 1600) {
      activeChunks.push(3);
    }
    const currChunks = Object.keys(this.activeChunks).map((key) =>
      parseInt(key)
    );

    const chunksToCreate: number[] = diffInArrays(activeChunks, currChunks);
    const chunksToDelete: number[] = diffInArrays(currChunks, activeChunks);

    chunksToDelete.forEach((chunk) => this.deleteChunk(chunk));
    chunksToCreate.forEach((chunk) => this.createChunk(chunk));
  }
}

// Return entries in arr2 not in arr1
function diffInArrays(arr1: any[], arr2: any[]) {
  return arr1.filter((item) => arr2.indexOf(item) === -1);
}
