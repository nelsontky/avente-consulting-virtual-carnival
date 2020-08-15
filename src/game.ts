import "phaser";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import MainScene from "./MainScene";
import RoomScene from "./RoomScene";
import SpotTheDiffScene from "./SpotTheDiffScene";
import getFirebase from "./firebase";
import { getUser, updateUser } from "./dbUtils";
import { width, height } from "./config";
import loadFiles from "./loadFiles";

export default class Game extends Phaser.Scene {
  currScene: any;

  constructor() {
    super("game");
  }

  preload() {
    this.currScene = this;
    loadFiles(this);

    const db = getFirebase().firestore();
    db.collection("users")
      .doc(sessionStorage.getItem("uid"))
      .onSnapshot((doc) => {
        sessionStorage.setItem("userData", JSON.stringify(doc.data()));
        console.log(sessionStorage.getItem("userData"));
      });
  }

  create() {
    const dialog = this.currScene.rexUI.add
      .dialog({
        x: width / 2,
        y: height / 2,

        background: this.currScene.rexUI.add.roundRectangle(
          0,
          0,
          100,
          100,
          20,
          0x1565c0
        ),

        title: this.currScene.rexUI.add.label({
          background: this.currScene.rexUI.add.roundRectangle(
            0,
            0,
            100,
            40,
            20,
            0x003c8f
          ),
          text: this.add.text(0, 0, "Welcome to Avente Carnival!", {
            fontSize: "24px",
          }),
          space: {
            left: 15,
            right: 15,
            top: 10,
            bottom: 10,
          },
        }),

        content: this.add.text(
          0,
          0,
          "Click on your preferred character to start the game!",
          {
            fontSize: "18px",
            wordWrap: { width: 400 },
          }
        ),

        actions: [this.createImage("girl"), this.createImage("boy")],

        space: {
          title: 25,
          content: 25,
          action: 15,

          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },

        align: {
          actions: "center", // 'center'|'left'|'right'
        },

        expand: {
          content: false, // Content is a pure text object
        },
      })
      .layout();

    dialog
      .on("button.click", (_, __, index: number) => {
        sessionStorage.setItem("gender", index === 0 ? "girl" : "boy");

        this.scene.start("main", {
          gender: index === 0 ? "girl" : "boy",
        });
      })
      .on("button.over", (button: any) => {
        button.getElement("background").setStrokeStyle(1, 0xffffff);
      })
      .on("button.out", (button: any) => {
        button.getElement("background").setStrokeStyle();
      });
  }

  createLabel(text: string) {
    return this.currScene.rexUI.add.label({
      // width: 40,
      // height: 40,

      background: this.currScene.rexUI.add.roundRectangle(
        0,
        0,
        0,
        0,
        20,
        0x5e92f3
      ),

      text: this.currScene.add.text(0, 0, text, {
        fontSize: "24px",
      }),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    });
  }

  createImage(gender: "boy" | "girl") {
    return this.currScene.rexUI.add.label({
      // width: 40,
      // height: 40,

      background: this.currScene.rexUI.add.roundRectangle(
        0,
        0,
        0,
        0,
        20,
        0x5e92f3
      ),

      text: this.add.image(0, 0, `${gender}-preview`).setScale(2, 2),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width,
  height,
  render: {
    pixelArt: true,
  },
  parent: "game",
  physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
  scene: [Game, MainScene, RoomScene, SpotTheDiffScene],
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

getFirebase()
  .auth()
  .onAuthStateChanged(async (user) => {
    if (user) {
      await addMatricNumberToDb(user);
      sessionStorage.setItem("uid", user.uid);
      const game = new Phaser.Game(config);
    }
  });

async function addMatricNumberToDb(user: firebase.User): Promise<string> {
  function isValidMatricNumber(matricNumber: any) {
    return (
      matricNumber !== null && !isNaN(matricNumber) && matricNumber.length === 8
    );
  }
  const userDoc = await getUser(user.uid);

  if (userDoc !== undefined) {
    const matricNumber = userDoc.matricNumber;

    if (isValidMatricNumber(matricNumber)) {
      return matricNumber;
    }
  }

  let promptText =
    "Enter your SMU matric number (8 digits). Make sure you enter the correct number, you will not get to edit this!";
  let newMatricNumber: any = "";
  while (!isValidMatricNumber(newMatricNumber)) {
    newMatricNumber = prompt(promptText);
    promptText =
      "Invalid input. Please try again.\nEnter your SMU matric number (8 digits). Make sure you enter the correct number, you will not get to edit this!";
  }

  updateUser(user.uid, { matricNumber: newMatricNumber });

  return newMatricNumber;
}
