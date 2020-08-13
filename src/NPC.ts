import "phaser";

import Player from "./Player";
import NPCDataInterface from "./NPCDataInterface";
import Dialog from "./Dialog";
import { genPersonalityQuizResults, nextButtonOnlyChoices } from "./NPCData";

export default class NPC {
  sprite: Phaser.Physics.Arcade.Sprite;
  player: Player;
  scene: Phaser.Scene;
  touchPlayerObj: { isTouching: boolean; prevX?: number; prevY?: number };
  spaceKey: Phaser.Input.Keyboard.Key;
  isInteractionOngoing: boolean;
  data: NPCDataInterface;
  mapWidth: number;
  mapHeight: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    player: Player,
    data: NPCDataInterface,
    mapWidth: number,
    mapHeight: number
  ) {
    this.scene = scene;
    this.player = player;
    this.isInteractionOngoing = false;
    this.data = data;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    this.sprite = this.scene.physics.add
      .staticSprite(x, y, this.data.name, 1)
      .setSize(30, 40);

    this.scene.physics.add.collider(
      this.sprite,
      this.player.sprite,
      () =>
        (this.touchPlayerObj = {
          isTouching: true,
          prevX: this.player.sprite.x,
          prevY: this.player.sprite.y,
        })
    );

    this.scene.anims.create({
      key: `${this.data.name}_face_up`,
      frames: [{ key: this.data.name, frame: 0 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: `${this.data.name}_face_down`,
      frames: [{ key: this.data.name, frame: 1 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: `${this.data.name}_face_left`,
      frames: [{ key: this.data.name, frame: 2 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: `${this.data.name}_face_right`,
      frames: [{ key: this.data.name, frame: 3 }],
      frameRate: 20,
    });

    this.touchPlayerObj = { isTouching: false };
    this.spaceKey = this.scene.input.keyboard.addKey("SPACE");
  }

  checkDirectionToFace(): string {
    const playerX = this.player.sprite.x;
    const playerY = this.player.sprite.y;
    const { x, y } = this.sprite;

    const angleFromNpc = Math.atan2(y - playerY, x - playerX);
    const degrees = angleFromNpc * (180 / Math.PI) + 45;
    const actualDegrees = degrees < 0 ? degrees + 360 : degrees;

    if (actualDegrees >= 0 && actualDegrees < 90) {
      return `${this.data.name}_face_left`;
    } else if (actualDegrees >= 90 && actualDegrees < 180) {
      return `${this.data.name}_face_up`;
    } else if (actualDegrees >= 180 && actualDegrees < 270) {
      return `${this.data.name}_face_right`;
    } else {
      return `${this.data.name}_face_down`;
    }
  }

  update() {
    // Interaction
    if (
      this.touchPlayerObj.isTouching &&
      this.spaceKey.isDown &&
      !this.isInteractionOngoing
    ) {
      this.isInteractionOngoing = true;
      this.player.isFrozen = true;
      this.sprite.anims.play(this.checkDirectionToFace());
      if (this.data.name !== "Adrian") {
        this.runDialog().then(() => {
          this.isInteractionOngoing = false;
          this.player.isFrozen = false;
        });
      } else {
        this.runDialogAdrian().then(() => {
          this.isInteractionOngoing = false;
          this.player.isFrozen = false;
        });
      }
    }

    // Check if still colliding with player
    if (
      this.touchPlayerObj.prevX !== this.player.sprite.x ||
      this.touchPlayerObj.prevY !== this.player.sprite.y
    ) {
      this.touchPlayerObj = { isTouching: false };
    }
  }

  async runDialog() {
    let currDialog = this.data.dialogs;

    while (currDialog !== undefined) {
      const dialog = new Dialog(
        this.scene,
        this.mapWidth / 2,
        this.mapHeight / 2,
        currDialog
      );
      const outcome = await dialog.create();

      switch (outcome) {
        case "correct":
          currDialog = currDialog.dialogAfterCorrect;
          break;
        case "wrong":
          currDialog = currDialog.dialogAfterWrong;
          break;
        default:
          return;
      }
    }
  }
  async runDialogAdrian() {
    let results: {
      category: "IT" | "Finance" | "Management" | "HR" | "Marketing";
      count: number;
    }[] = [
      { category: "IT", count: 0 },
      { category: "Finance", count: 0 },
      { category: "Management", count: 0 },
      { category: "HR", count: 0 },
      { category: "Marketing", count: 0 },
    ];
    let currDialog = this.data.dialogs;

    while (currDialog !== undefined) {
      const dialog = new Dialog(
        this.scene,
        this.mapWidth / 2,
        this.mapHeight / 2,
        currDialog,
        true
      );
      const outcome = await dialog.create();

      if (outcome === "closed") {
        return;
      }

      // Add score to result
      const categoryChosen = currDialog.choices.find(
        (choice) => outcome === choice.choiceText
      ).category;

      // Skip snack question
      if (categoryChosen !== undefined) {
        let resultToAddTo = results.find(
          (res) => res.category === categoryChosen
        );
        resultToAddTo.count = resultToAddTo.count + 1;
      }

      currDialog = currDialog.dialogAfterCorrect;
    }

    // Output result
    results.sort((r1, r2) =>
      r2.count !== r1.count
        ? r2.count - r1.count
        : r1.category.localeCompare(r2.category)
    );
    const resultDialog = new Dialog(
      this.scene,
      this.mapWidth / 2,
      this.mapHeight / 2,
      {
        content: genPersonalityQuizResults(results[0].category),
        choices: nextButtonOnlyChoices,
      }
    );
    await resultDialog.create();

    return;
  }
}
