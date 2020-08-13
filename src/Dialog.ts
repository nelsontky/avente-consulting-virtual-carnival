import { IDialog } from "./NPCDataInterface";

export default class Dialog {
  scene: any;
  dialog: any;
  config: any;
  correctAnswer: string;

  constructor(scene: Phaser.Scene, x: number, y: number, dialogData: IDialog) {
    try {
      this.correctAnswer = dialogData.choices.find(
        (choice) => choice.isAnswer
      ).choiceText;
    } catch {
      // No correct answer
    }

    this.scene = scene;

    this.config = {
      x: Math.floor(x),
      y: Math.floor(y),

      background: this.scene.rexUI.add.roundRectangle(
        0,
        0,
        100,
        100,
        20,
        0x3e2723
      ),

      content: this.scene.add.text(0, 0, dialogData.content, {
        fontSize: "12px",
        fontFamily: "Arial",
        wordWrap: { width: 400 },
      }),

      choices: dialogData.choices.map((choice) =>
        this.createLabel(choice.choiceText)
      ),
      actions: [this.createLabel("Close")],

      space: {
        content: 26,
        choices: 26,
        choice: 16,

        left: 26,
        right: 26,
        top: 26,
        bottom: 26,
      },

      expand: {
        content: false, // Content is a pure text object
      },
    };
  }

  // Resolves to true if answer was correct, false otherwise
  create(): Promise<"correct" | "wrong" | "closed"> {
    this.dialog = this.scene.rexUI.add.dialog(this.config).layout();

    return new Promise((resolve, reject) => {
      this.dialog
        .on(
          "button.click",
          (button: { text: string }, groupName: string) => {
            this.destroy();
            if (button.text === this.correctAnswer) {
              // Is correct answer
              resolve("correct");
            } else if (groupName === "actions") {
              resolve("closed");
            } else {
              resolve("wrong");
            }
          },
          this.scene
        )
        .on("button.over", (button: any) => {
          button.getElement("background").setStrokeStyle(1, 0xffffff);
        })
        .on("button.out", (button: any) => {
          button.getElement("background").setStrokeStyle();
        });
    });
  }

  destroy() {
    this.dialog.scaleDownDestroy();
  }

  createLabel(text: string) {
    return this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        0,
        0,
        100,
        40,
        20,
        0x6a4f4b
      ),

      text: this.scene.add.text(0, 0, text, {
        fontSize: "12px",
        fontFamily: "Arial",
        wordWrap: { width: 400 },
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
