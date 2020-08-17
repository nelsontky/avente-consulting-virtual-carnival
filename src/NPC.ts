import "phaser";

import Player from "./Player";
import NPCDataInterface from "./NPCDataInterface";
import Dialog from "./Dialog";
import { genPersonalityQuizResults, nextButtonOnlyChoices } from "./NPCData";
import QuizDialog from "./QuizDialog";
import { updateStationData, DbSchema } from "./dbUtils";

export default class NPC {
  sprite: Phaser.Physics.Arcade.Sprite;
  player: Player;
  scene: Phaser.Scene;
  touchPlayerObj: { isTouching: boolean; prevX?: number; prevY?: number };
  spaceKey: Phaser.Input.Keyboard.Key;
  isInteractionOngoing: boolean;
  data: NPCDataInterface;
  alert: Phaser.GameObjects.Image;
  tick: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    player: Player,
    data: NPCDataInterface
  ) {
    this.scene = scene;
    this.player = player;
    this.isInteractionOngoing = false;
    this.data = data;

    this.sprite = this.scene.physics.add.staticSprite(x, y, this.data.name, 1);

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

    // Tick/alert
    this.alert = this.scene.add
      .image(this.sprite.x, this.sprite.y - 40, "alert")
      .setScale(0.2, 0.2);
    this.alert.setVisible(this.isAlertVisible());

    this.tick = this.scene.add
      .image(this.sprite.x, this.sprite.y - 40, "tick")
      .setScale(0.2, 0.2);
    this.alert.setVisible(!this.isAlertVisible());
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
      if (this.data.name === "Adrian") {
        this.runDialogAdrian().then(() => {
          this.isInteractionOngoing = false;
          this.player.isFrozen = false;
        });
      } else if (this.data.name === "Punnag") {
        this.runDialogPunnag().then(() => {
          this.isInteractionOngoing = false;
          this.player.isFrozen = false;
        });
      } else if (this.data.name === "Haris") {
        this.runDialogHaris().then(() => {
          this.isInteractionOngoing = false;
          this.player.isFrozen = false;
        });
      } else if (this.data.name === "Maneesha") {
        this.runDialogManeesha().then(() => {
          this.isInteractionOngoing = false;
          this.player.isFrozen = false;
        });
      } else {
        this.runDialog().then(() => {
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

    // Render alert/tick
    this.alert.setVisible(this.isAlertVisible());
    this.tick.setVisible(!this.isAlertVisible());
  }

  isAlertVisible() {
    const playerData: DbSchema = JSON.parse(sessionStorage.getItem("userData"));

    return (
      playerData === undefined ||
      playerData.stationData === undefined ||
      !playerData.stationData[this.data.name] ||
      (playerData.stationData[this.data.name] !== undefined &&
        playerData.stationData[this.data.name] < 0)
    );
  }

  async runDialog() {
    let currDialog = this.data.dialogs;

    while (currDialog !== undefined) {
      const dialog = new Dialog(
        this.scene,
        currDialog,
        this.data.name === "Samantha"
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

    await updateStationData(
      sessionStorage.getItem("uid"),
      this.data.name,
      true
    );
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
      const dialog = new Dialog(this.scene, currDialog, false, true);
      const outcome = await dialog.create();

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
      {
        content: genPersonalityQuizResults(results[0].category),
        choices: nextButtonOnlyChoices,
      },
      false
    );
    await resultDialog.create();

    await updateStationData(
      sessionStorage.getItem("uid"),
      this.data.name,
      true
    );
    return;
  }

  async runDialogPunnag() {
    const outcome = await new Dialog(
      this.scene,
      {
        content: `Hi! I’m Punnag, the President of Avente Consulting and the head of Strat-Acad Department! In this station, you have 1 minute to answer as many questions as possible!`,
        choices: [{ choiceText: `Let's begin!`, isAnswer: true }],
      },
      true
    ).create();

    const score = await new QuizDialog(this.scene).run();

    if (score > -1) {
      // -1 is returned when closed
      await new Dialog(this.scene, {
        content: `Your score is ${score}!`,
        choices: [{ choiceText: `Next`, isAnswer: true }],
      }).create();

      await updateStationData(
        sessionStorage.getItem("uid"),
        this.data.name,
        score
      );
    }
  }

  async runDialogHaris() {
    const outcome = await new Dialog(this.scene, {
      content: `Hi! I’m Haris, the Vice President of Avente Consulting and the head of Marcomms Department! This station is a Spot-The-Difference game, and you have 30 seconds to find 10 differences!`,
      choices: [{ choiceText: `Let’s begin!`, isAnswer: true }],
    }).create();

    this.scene.scene.pause();
    this.scene.scene.run("diff");
  }

  async runDialogManeesha() {
    const outcome = await new Dialog(this.scene, {
      content: `Hi! I’m Maneesha, the Honorary General Secretary of Avente Consulting and the head of Operations Department! In this station, you get to play a word search game! You can exit the puzzle at any time.`,
      choices: [{ choiceText: `Let’s begin!`, isAnswer: true }],
    }).create();
    // Reload iframe
    const iframe: any = document.getElementById("game-iframe");
    iframe.src += "";

    // Display iframe
    document.getElementById("word-search").style.display = "block";

    await new Dialog(
      this.scene,
      {
        content: `Hope you had fun with the puzzle!`,
        choices: [{ choiceText: `Next`, isAnswer: true }],
      },
      false
    ).create();

    await updateStationData(
      sessionStorage.getItem("uid"),
      this.data.name,
      true
    );
  }
}
