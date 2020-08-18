import "phaser";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import MainScene from "./MainScene";
import RoomScene from "./RoomScene";
import SpotTheDiffScene from "./SpotTheDiffScene";
import getFirebase from "./firebase";
import { getUser, updateUser, getIsGameCompleted } from "./dbUtils";
import { width, height } from "./config";
import loadFiles from "./loadFiles";

export interface adInterface {
  videoId: "avalon" | "youtrip";
}

export default class VideoAdScene extends Phaser.Scene {
  videoId: string;
  y: number;
  x: number;
  height: number;
  width: number;
  closeText: Phaser.GameObjects.Text;
  timer: number;

  constructor() {
    super("ad");
  }

  init({ videoId }: adInterface) {
    this.videoId = videoId;

    if (videoId === "youtrip") {
      this.x = 80;
      this.y = 112;
      this.width = 640;
      this.height = 376;
    } else {
      this.x = 180;
      this.y = 80;
      this.width = 440;
      this.height = 440;
    }

    this.timer = 0;
  }

  create() {
    this.closeText = this.add
      .text(this.x + this.width - 60, this.y, "Close", {
        fontSize: "15px",
        fontFamily: "Arial",
      })
      .setColor("red")
      .setOrigin(0, 0)
      .setDepth(10)
      .setVisible(false);

    const graphics = this.add.graphics();
    graphics.fillStyle(0xffff00, 1);
    graphics.fillRoundedRect(this.x, this.y, this.width, this.height, 20);

    const video: any = document.getElementById(this.videoId);
    video.style.display = "block";
    video.play();

    this.input.on("gameobjectdown", async (_, gameObject: any) => {
      if (gameObject === this.closeText) {
        const video: any = document.getElementById(this.videoId);
        video.style.display = "none";
        video.pause();
        video.currentTime = 0;
        this.scene.stop();
        this.scene.run("room");

        if (this.videoId === "avalon") {
          await updateUser(sessionStorage.getItem("uid"), {
            isAvalonWatched: true,
          });
        } else {
          await updateUser(sessionStorage.getItem("uid"), {
            isYouTripWatched: true,
          });
        }
      }
    });
  }

  update(_, delta: number) {
    this.timer += delta;

    if (this.videoId === "youtrip" && this.timer > 5000) {
      this.closeText.setVisible(true).setInteractive();
    } else if (this.timer > 7000) {
      this.closeText.setVisible(true).setInteractive();
    }
  }
}
