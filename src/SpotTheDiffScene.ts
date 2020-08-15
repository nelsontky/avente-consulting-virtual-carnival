import "phaser";

import loadFiles from "./loadFiles";

// Interface representing top left and bottom right point of a rectangle
interface Rectangle {
  topX: number;
  topY: number;
  bottomX: number;
  bottomY: number;
}

const diffAreas: Rectangle[] = [
  { topX: 0, topY: 346, bottomX: 29, bottomY: 376 }, // airpods
  { topX: 6, topY: 184, bottomX: 183, bottomY: 231 }, // confetti
  { topX: 167, topY: 299, bottomX: 190, bottomY: 314 }, // swipe button
  { topX: 200, topY: 200, bottomX: 240, bottomY: 250 }, // hot air balloon
  { topX: 310, topY: 321, bottomX: 338, bottomY: 347 }, // train
  { topX: 345, topY: 182, bottomX: 400, bottomY: 245 }, // hydrogen balloon
  { topX: 368, topY: 344, bottomX: 420, bottomY: 375 }, // Tent
  { topX: 503, topY: 180, bottomX: 600, bottomY: 235 }, // triangles
  { topX: 529, topY: 293, bottomX: 546, bottomY: 309 }, // heart
  { topX: 559, topY: 316, bottomX: 600, bottomY: 380 }, // ferris wheel
];

export default class SpotTheDiffScene extends Phaser.Scene {
  numberFound: number;
  scoreText: Phaser.GameObjects.Text;
  timeLeftText: Phaser.GameObjects.Text;
  timeLeft: number;
  timer: number;
  harisData: {
    roomId: number;
    x: number;
    y: number;
    overWorldDoorLocation: { x: number; y: number };
  };

  constructor() {
    super("diff");
    this.numberFound = 0;
    this.timeLeft = 30;
    this.timer = 0;
  }

  init(harisData: {
    roomId: number;
    x: number;
    y: number;
    overWorldDoorLocation: { x: number; y: number };
  }) {
    this.harisData = harisData;
  }

  preload() {
    loadFiles(this);
  }

  create() {
    this.add.image(0, 180, "changed").setOrigin(0, 0).setInteractive();
    this.add.image(0, 400, "original").setOrigin(0, 0);
    this.scoreText = this.add
      .text(16, 16, "Found: 0 / 10", {
        fontSize: "32px",
        fontFamily: "Arial",
      })
      .setColor("white")
      .setOrigin(0, 0);

    this.timeLeftText = this.add
      .text(16, 70, "Time left: " + this.timeLeft, {
        fontSize: "32px",
        fontFamily: "Arial",
      })
      .setColor("white")
      .setOrigin(0, 0);

    this.add
      .text(
        16,
        124,
        "Find all the differences by clicking on the top picture!",
        {
          fontSize: "20px",
          fontFamily: "Arial",
        }
      )
      .setColor("white")
      .setOrigin(0, 0);

    this.input.on(
      "gameobjectdown",
      (pointer: { worldX: number; worldY: number }) => {
        const differenceClicked = diffAreas.find((area) =>
          this.isPointContainedInRectangle(pointer.worldX, pointer.worldY, area)
        );

        if (differenceClicked === undefined) {
          return;
        }

        this.differenceClickedAction(differenceClicked);
      }
    );
  }

  update(_, delta: number) {
    this.timer += delta;
    while (this.timer > 1000) {
      this.timeLeftText.setText("Time left: " + this.timeLeft);
      this.timeLeft -= 1;
      this.timer = 0;
    }

    if (this.numberFound === diffAreas.length || this.timeLeft <= 0) {
      this.timeLeft = 30;
      this.timer = 0;
      const score = this.numberFound;
      this.numberFound = 0;
      this.scene.stop();
      this.scene.run("room", {
        score,
      });
    }
  }

  isPointContainedInRectangle(x: number, y: number, rect: Rectangle) {
    return (
      x >= rect.topX && x <= rect.bottomX && y >= rect.topY && y <= rect.bottomY
    );
  }

  differenceClickedAction(diffArea: Rectangle) {
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000);

    const width = diffArea.bottomX - diffArea.topX;
    const height = diffArea.bottomY - diffArea.topY;
    graphics.strokeEllipse(
      diffArea.topX + width / 2,
      diffArea.topY + height / 2,
      width,
      height
    );

    this.numberFound += 1;
    this.scoreText.setText(`Found: ${this.numberFound} / 10`);
  }
}
