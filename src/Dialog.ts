import { IDialog } from "./NPCDataInterface";
import { height, width } from "./config";

export default class Dialog {
  scene: any;
  dialog: any;
  config: any;
  correctAnswer: string;
  isPersonalityQuiz: boolean;
  isShowCloseButton: boolean;
  isSamantha: boolean;

  constructor(
    scene: Phaser.Scene,
    dialogData: IDialog,
    isShowCloseButton: boolean,
    isSamantha?: boolean,
    isPersonalityQuiz?: boolean
  ) {
    try {
      this.correctAnswer = dialogData.choices.find(
        (choice) => choice.isAnswer
      ).choiceText;
    } catch {
      // No correct answer
    }
    this.isPersonalityQuiz = !!isPersonalityQuiz;
    this.isSamantha = !!isSamantha;
    this.isShowCloseButton = isShowCloseButton;
    this.scene = scene;
    this.config = {
      x: Math.floor(this.scene.cameras.main.scrollX + width / 2),
      y: Math.floor(this.scene.cameras.main.scrollY + height / 2),

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
      actions: this.isShowCloseButton ? [this.createLabel("Close")] : undefined,

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

  create(): Promise<string> {
    this.dialog = this.scene.rexUI.add.dialog(this.config).layout();
    this.dialog.setDepth(100);

    return new Promise((resolve, reject) => {
      this.dialog
        .on(
          "button.click",
          (button: { text: string }, groupName: string, index: number) => {
            if (groupName === "actions") {
              this.destroy();
              resolve("closed");
            } else if (this.isPersonalityQuiz) {
              this.destroy();
              // resolve to option text if is personality quiz
              resolve(button.text);
            } else if (button.text === this.correctAnswer) {
              this.destroy();
              // Is correct answer
              resolve("correct");
            } else if (this.isSamantha) {
              if (index === 0) {
                window.open("https://tinyurl.com/aventeinfodeck");
              } else if (index === 1) {
                window.open("https://forms.gle/4HBEWNmcgPEdZ2B27");
              }
            } else {
              this.destroy();
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
