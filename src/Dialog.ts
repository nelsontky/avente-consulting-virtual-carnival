export default class Dialog {
  scene: any;
  dialog: any;
  x: number;
  y: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
  }

  create(): Promise<boolean> {
    this.dialog = this.scene.rexUI.add
      .dialog({
        x: this.x,
        y: this.y,

        background: this.scene.rexUI.add.roundRectangle(
          0,
          0,
          100,
          100,
          20,
          0x3e2723
        ),

        title: this.scene.rexUI.add.label({
          background: this.scene.rexUI.add.roundRectangle(
            0,
            0,
            100,
            40,
            20,
            0x1b0000
          ),
          text: this.scene.add.text(0, 0, "Question 10", {
            fontSize: "24px",
          }),
          space: {
            left: 15,
            right: 15,
            top: 10,
            bottom: 10,
          },
        }),

        content: this.scene.add.text(0, 0, "1 + 1 + 1 + 1 + 1 = ", {
          fontSize: "24px",
        }),

        choices: [
          this.createLabel(this.scene, "3"),
          this.createLabel(this.scene, "4"),
          this.createLabel(this.scene, "5"),
          this.createLabel(this.scene, "6"),
        ],
        actions: [this.createLabel(this.scene, "Close")],

        space: {
          title: 25,
          content: 25,
          choices: 25,
          choice: 15,

          left: 25,
          right: 25,
          top: 25,
          bottom: 25,
        },

        expand: {
          content: false, // Content is a pure text object
        },
      })
      .layout();

    return new Promise((resolve, reject) => {
      this.dialog
        .on(
          "button.click",
          (button, groupName, index) => {
            console.log(button.text);
            this.destroy();
            resolve(true);
          },
          this.scene
        )
        .on("button.over", (button, groupName, index) => {
          button.getElement("background").setStrokeStyle(1, 0xffffff);
        })
        .on("button.out", (button, groupName, index) => {
          button.getElement("background").setStrokeStyle();
        });
    });
  }

  destroy() {
    this.dialog.scaleDownDestroy();
  }

  createLabel(scene: any, text: string, backgroundColor?: string) {
    return scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x6a4f4b),

      text: scene.add.text(0, 0, text, {
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
}
