import { width, height } from "./config";

interface IQuestion {
  question: string;
  options: { option: string; isAnswer: boolean }[];
}

let questions: IQuestion[] = [
  {
    question: "Name of Avente's Parent Organization",
    options: [
      {
        option: "(a) SMU UOB AEI",
        isAnswer: false,
      },
      {
        option: "(b) AEI UOB SMU",
        isAnswer: false,
      },
      {
        option: "(c) UOB SMU AEI",
        isAnswer: true,
      },
      {
        option: "(d) SMU OCBC AI",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Avente's Consultancy Focus",
    options: [
      {
        option: "(a) Business Consulting",
        isAnswer: true,
      },
      {
        option: "(b) Digital Marketing Consulting",
        isAnswer: false,
      },
      {
        option: "(c) Retail Marketing Consulting",
        isAnswer: false,
      },
      {
        option: "(d) Digital Technology Consulting",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Avente is derived from",
    options: [
      {
        option: "(a) Avant - Garde",
        isAnswer: false,
      },
      {
        option: "(b) Aventus - Ante",
        isAnswer: true,
      },
      {
        option: "(c) Avidite - Entreprendre",
        isAnswer: false,
      },
      {
        option: "(d) Aventure - Ente",
        isAnswer: false,
      },
    ],
  },
  {
    question: "The word 'Avente' stems from",
    options: [
      {
        option: "(a) French Origin",
        isAnswer: false,
      },
      {
        option: "(b) Singlish Origin",
        isAnswer: false,
      },
      {
        option: "(c) Greek Origin",
        isAnswer: false,
      },
      {
        option: "(d) Latin Origin",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Avente Colors are",
    options: [
      {
        option: "(a) Grey White Blue Green",
        isAnswer: false,
      },
      {
        option: "(b) White Black Green Yellow",
        isAnswer: false,
      },
      {
        option: "(c) Yellow White Green Blue",
        isAnswer: false,
      },
      {
        option: "(d) Grey White Blue Yellow",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which is not part of Avente's CHAT Values",
    options: [
      {
        option: "(a) Transparent",
        isAnswer: false,
      },
      {
        option: "(b) Humble",
        isAnswer: false,
      },
      {
        option: "(c) Community",
        isAnswer: false,
      },
      {
        option: "(d) Adventurous",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which is not part of Avente's CHAT Values",
    options: [
      {
        option: "(a) Communicate",
        isAnswer: true,
      },
      {
        option: "(b) Transparent",
        isAnswer: false,
      },
      {
        option: "(c) Ambitious",
        isAnswer: false,
      },
      {
        option: "(d) Humble",
        isAnswer: false,
      },
    ],
  },
  {
    question: "How can Students join Avente?",
    options: [
      {
        option: "(a) Student Consultant",
        isAnswer: false,
      },
      {
        option: "(b) Unabridged and Pinnacle Series",
        isAnswer: false,
      },
      {
        option: "(c) Avente Mentorship Programme (AMP)",
        isAnswer: false,
      },
      {
        option: "(d) All of the above",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which is not Avente's curated workshop Series?",
    options: [
      {
        option: "(a) Unabridged",
        isAnswer: false,
      },
      {
        option: "(b) Pinnacle",
        isAnswer: false,
      },
      {
        option: "(c) Avente Mentorship Programme (AMP)",
        isAnswer: true,
      },
      {
        option: "(d) None of the above",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What were the 5 Major types of Consultancy listed?",
    options: [
      {
        option: "(a) IT, Finance, HR, Marketing, Management",
        isAnswer: true,
      },
      {
        option: "(b) HR, Management, IT, Strategy, Finance",
        isAnswer: false,
      },
      {
        option: "(c) Finance, IT, Legal, Management, HR",
        isAnswer: false,
      },
      {
        option: "(d) Management, Medical, Financial, HR, IT",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Which is not a general role of a consultant?",
    options: [
      {
        option:
          "(a) Identify problems, Gather information, and Implement Sustainable Solutions",
        isAnswer: false,
      },
      {
        option:
          "(b) Cushion damage of underperforming businesses mainly through Loan Provisions",
        isAnswer: true,
      },
      {
        option:
          "(c) Analyse Statistics in order to understand Business Operations",
        isAnswer: false,
      },
      {
        option:
          "(d) Pitch recommendations for improvement, via Computer Simulations",
        isAnswer: false,
      },
    ],
  },
  {
    question: "The percentage of SMEs making up local enterprises",
    options: [
      {
        option: "(a) 50%",
        isAnswer: false,
      },
      {
        option: "(b) 90%",
        isAnswer: false,
      },
      {
        option: "(c) 75%",
        isAnswer: false,
      },
      {
        option: "(d) 99%",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which is not part of the big 3 Consultancy firm?",
    options: [
      {
        option: "(a) McKinsey & Company",
        isAnswer: false,
      },
      {
        option: "(b) Deloitte",
        isAnswer: true,
      },
      {
        option: "(c) Bain & Company",
        isAnswer: false,
      },
      {
        option: "(d) Boston Consulting Group",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Which is not a generic definition of local SME?",
    options: [
      {
        option: "(a) < SGD100m Annual Turnover",
        isAnswer: false,
      },
      {
        option: "(b) > 30% Local Shareholding",
        isAnswer: false,
      },
      {
        option: "(c) < 250 Employees",
        isAnswer: true,
      },
      {
        option: "(d) None of the above",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What makes up the backbone of Singapore Economy?",
    options: [
      {
        option: "(a) Micro Enterprise",
        isAnswer: false,
      },
      {
        option: "(b) Small & Medium Enterprise",
        isAnswer: true,
      },
      {
        option: "(c) Large Enterprise",
        isAnswer: false,
      },
      {
        option: "(d) Extra Large Enterprise",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Avente was established in?",
    options: [
      {
        option: "(a) 2017",
        isAnswer: false,
      },
      {
        option: "(b) 2018",
        isAnswer: false,
      },
      {
        option: "(c) 2019",
        isAnswer: true,
      },
      {
        option: "(d) 2030",
        isAnswer: false,
      },
    ],
  },
  {
    question:
      "Under the SME Consulting Programme (SCP), which is not a primary stakeholder?",
    options: [
      {
        option: "(a) Project Advisors",
        isAnswer: false,
      },
      {
        option: "(b) Student Consultants",
        isAnswer: false,
      },
      {
        option: "(c) B2C Consumers",
        isAnswer: true,
      },
      {
        option: "(d) Local Enterprises",
        isAnswer: false,
      },
    ],
  },
  {
    question: "How many people make up the 2nd batch of exco?",
    options: [
      {
        option: "(a) 10",
        isAnswer: false,
      },
      {
        option: "(b) 11",
        isAnswer: false,
      },
      {
        option: "(c) 13",
        isAnswer: true,
      },
      {
        option: "(d) 14",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Which is not part of the 3 Flagship events in 2019?",
    options: [
      {
        option: "(a) EDGE SME Convention",
        isAnswer: false,
      },
      {
        option: "(b) GENESIS End of Year Networking",
        isAnswer: false,
      },
      {
        option: "(c) PIVOT Business Case Competition",
        isAnswer: true,
      },
      {
        option: "(d) None of the above",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Avente's Mission to learn via Case Pedagogy reflects",
    options: [
      {
        option: "(a) Visual Learning",
        isAnswer: false,
      },
      {
        option: "(b) Read & Write Learning",
        isAnswer: false,
      },
      {
        option: "(c) Auditory Learning",
        isAnswer: false,
      },
      {
        option: "(d) Kinesthetic Learning",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which is not one of the 3 engines of Avente?",
    options: [
      {
        option: "(a) Avente Mentorship Programme (AMP)",
        isAnswer: false,
      },
      {
        option: "(b) UOB SMU AEI",
        isAnswer: false,
      },
      {
        option: "(c) Avente's Executive Committee",
        isAnswer: false,
      },
      {
        option: "(d) None of the above",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which is not one of the words describing 'Aventus'",
    options: [
      {
        option: "(a) Forward",
        isAnswer: true,
      },
      {
        option: "(b) Success",
        isAnswer: false,
      },
      {
        option: "(c) Discovery",
        isAnswer: false,
      },
      {
        option: "(d) Knowledge",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Avente places emphasis on",
    options: [
      {
        option: "(a) Digitization",
        isAnswer: false,
      },
      {
        option: "(b) Digitalization",
        isAnswer: true,
      },
      {
        option: "(c) Digital Transformation",
        isAnswer: false,
      },
      {
        option: "(d) Digimon",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Which is not an example of Digitalization?",
    options: [
      {
        option: "(a) Apple Watch",
        isAnswer: false,
      },
      {
        option: "(b) Virtual Chatbots 'Ask Jamie'",
        isAnswer: false,
      },
      {
        option: "(c) Camscanner",
        isAnswer: true,
      },
      {
        option: "(d) None of the above",
        isAnswer: false,
      },
    ],
  },
  {
    question:
      "How long is the revised Student Consultant curriculum for Trainees?",
    options: [
      {
        option: "(a) 7 Weeks",
        isAnswer: false,
      },
      {
        option: "(b) 9 Weeks",
        isAnswer: false,
      },
      {
        option: "(c) 12 Weeks",
        isAnswer: false,
      },
      {
        option: "(d) 14 Weeks",
        isAnswer: true,
      },
    ],
  },
  {
    question: "Which events are new installment for Avente in 2020?",
    options: [
      {
        option: "(a) PIVOT Business Case Competition",
        isAnswer: false,
      },
      {
        option: "(b) Virtual Welfare Day 2020",
        isAnswer: false,
      },
      {
        option: "(c) PINNACLE Webinar Series",
        isAnswer: false,
      },
      {
        option: "(d) All of the above!",
        isAnswer: true,
      },
    ],
  },
  {
    question: "On the website, the C in CHAT values represent",
    options: [
      {
        option: "(a) Community",
        isAnswer: true,
      },
      {
        option: "(b) Cognizance",
        isAnswer: false,
      },
      {
        option: "(c) Consultancy",
        isAnswer: false,
      },
      {
        option: "(d) Cockles of my Heart",
        isAnswer: false,
      },
    ],
  },
  {
    question: "On the website, the H in CHAT values represent",
    options: [
      {
        option: "(a) Haris",
        isAnswer: false,
      },
      {
        option: "(b) Heart",
        isAnswer: false,
      },
      {
        option: "(c) Humble",
        isAnswer: true,
      },
      {
        option: "(d) Herculean",
        isAnswer: false,
      },
    ],
  },
  {
    question: "On the website, the A in CHAT values represent",
    options: [
      {
        option: "(a) Aventus",
        isAnswer: false,
      },
      {
        option: "(b) Automation",
        isAnswer: false,
      },
      {
        option: "(c) Adrian",
        isAnswer: false,
      },
      {
        option: "(d) Ambitions",
        isAnswer: true,
      },
    ],
  },
  {
    question: "On the website, the T in CHAT values represent",
    options: [
      {
        option: "(a) Trailblazer",
        isAnswer: false,
      },
      {
        option: "(b) Transparent",
        isAnswer: true,
      },
      {
        option: "(c) Technology",
        isAnswer: false,
      },
      {
        option: "(d) Transformation",
        isAnswer: false,
      },
    ],
  },
  {
    question: "How many Student Consultants are we recruiting?",
    options: [
      {
        option: "(a) 20",
        isAnswer: false,
      },
      {
        option: "(b) 24",
        isAnswer: false,
      },
      {
        option: "(c) 27",
        isAnswer: true,
      },
      {
        option: "(d) 50",
        isAnswer: false,
      },
    ],
  },
  {
    question: "Which type of consulting projects does Avente focus on?",
    options: [
      {
        option: "(a) Group Projects",
        isAnswer: false,
      },
      {
        option: "(b) Implementation Projects",
        isAnswer: true,
      },
      {
        option: "(c) Advisory Projects",
        isAnswer: false,
      },
      {
        option: "(d) Individual Projects",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What is the proposed SCQA framework used in case competitions?",
    options: [
      {
        option: "(a) Situation, Complication, Question, Answer",
        isAnswer: true,
      },
      {
        option: "(b) Situation, Consideration, Question, Analyze",
        isAnswer: false,
      },
      {
        option: "(c) Situation, Consideration, Question, Answer",
        isAnswer: false,
      },
      {
        option: "(d) None of the above",
        isAnswer: false,
      },
    ],
  },
  {
    question: "How can you connect with Avente?",
    options: [
      {
        option: "(a) Facebook",
        isAnswer: false,
      },
      {
        option: "(b) LinkedIn",
        isAnswer: false,
      },
      {
        option: "(c) Instagram",
        isAnswer: false,
      },
      {
        option: "(d) All of the above",
        isAnswer: true,
      },
    ],
  },
  {
    question: "What are Avente's consulting strategies grounded in?",
    options: [
      {
        option: "(a) Digital Strategies",
        isAnswer: true,
      },
      {
        option: "(b) Marketing strategies",
        isAnswer: false,
      },
      {
        option: "(c) Communication Strategies",
        isAnswer: false,
      },
      {
        option: "(d) Analysis Strategies",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What was Avente's 2019 Networking Event called?",
    options: [
      {
        option: "(a) Genesis",
        isAnswer: true,
      },
      {
        option: "(b) Exodus",
        isAnswer: false,
      },
      {
        option: "(c)",
        isAnswer: false,
      },
      {
        option: "(d) Pivot",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What is our introduction series on Instagram called?",
    options: [
      {
        option: "(a) Humans of Avente",
        isAnswer: true,
      },
      {
        option: "(b) AventUS",
        isAnswer: false,
      },
      {
        option: "(c) Hello Avente",
        isAnswer: false,
      },
      {
        option: "(d) Avente Behind the Scenes",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What is our Avente logo?",
    options: [
      {
        option: "(a) á",
        isAnswer: true,
      },
      {
        option: "(b) Apple",
        isAnswer: false,
      },
      {
        option: "(c) Adidas",
        isAnswer: false,
      },
      {
        option: "(d) Adobe",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What stages does our recruitment process include?",
    options: [
      {
        option: "(a) Coffee Chat Stage",
        isAnswer: true,
      },
      {
        option: "(b) Kopitiam Chat Stage",
        isAnswer: false,
      },
      {
        option: "(c) Networking stage",
        isAnswer: false,
      },
      {
        option: "(d) Koufu Chat Stage",
        isAnswer: false,
      },
    ],
  },
  {
    question: "What stages does our recruitment process include?",
    options: [
      {
        option: "(a) Coffee Chat Stage",
        isAnswer: true,
      },
      {
        option: "(b) Performance stage",
        isAnswer: false,
      },
      {
        option: "(c) Networking stage",
        isAnswer: false,
      },
      {
        option: "(d) All of the above",
        isAnswer: false,
      },
    ],
  },
];

class SingleQuizDialog {
  scene: any;
  config: any;
  question: string;
  dialog: any;
  options: { option: string; isAnswer: boolean }[];
  isAnswered: boolean;
  score: number;

  constructor(
    scene: Phaser.Scene,
    question: string,
    options: { option: string; isAnswer: boolean }[],
    score: number
  ) {
    this.scene = scene;
    this.question = question;
    this.options = options;
    this.isAnswered = false;
    this.score = score;
  }

  // Resolves to true if answer was correct, false otherwise.
  create(): Promise<number> {
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

      title: this.scene.rexUI.add.label({
        background: this.scene.rexUI.add.roundRectangle(
          0,
          0,
          100,
          40,
          20,
          0x1b0000
        ),
        text: this.scene.add.text(0, 0, "Score: " + this.score, {
          fontSize: "12px",
        }),
        space: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10,
        },
      }),

      content: this.scene.add.text(0, 0, this.question, {
        fontSize: "12px",
        fontFamily: "Arial",
        wordWrap: { width: 400 },
      }),

      choices: [
        ...this.options.map((choice) => this.createLabel(choice.option)),
        this.createLabel("Next"),
      ],
      actions: [this.createLabel("Close")],

      space: {
        title: 26,
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
    this.dialog = this.scene.rexUI.add.dialog(this.config).layout();
    this.dialog.hideChoice(this.config.choices.length - 1);

    return new Promise<number>((resolve, reject) => {
      const listenerCb = () => {
        this.destroy();
        removeEventListener("stop-quiz", listenerCb);
        resolve(this.score);
      };
      addEventListener("stop-quiz", listenerCb);

      this.dialog
        .on(
          "button.click",
          (
            button: { text: string; getElement: Function },
            groupName: string,
            index: number
          ) => {
            if (groupName === "actions") {
              this.destroy();
              removeEventListener("stop-quiz", listenerCb);
              resolve(-1);
            }
            if (!this.isAnswered) {
              const correctIndex = this.options.findIndex(
                (option) => option.isAnswer
              );
              for (let i = 0; i < this.config.choices.length - 1; i++) {
                if (i === correctIndex) {
                  this.dialog
                    .getChoice(i)
                    .getElement("background")
                    .setStrokeStyle(1, 0x00ff00); // set green outline
                } else {
                  this.dialog
                    .getChoice(i)
                    .getElement("background")
                    .setStrokeStyle(1, 0xff0000); // set red outline
                }
              }
              this.dialog.showChoice(this.config.choices.length - 1);
              this.isAnswered = true;

              if (index === correctIndex) {
                this.score += 1;
                this.dialog.getElement("title").setText("Score: " + this.score);
              }
            } else {
              if (button.text === "Next") {
                this.destroy();
                removeEventListener("stop-quiz", listenerCb);
                resolve(this.score);
              }
            }
          },
          this.scene
        )
        .on("button.over", (button: any, groupName: string, index: number) => {
          (!this.isAnswered ||
            groupName === "actions" ||
            index === this.config.choices.length - 1) &&
            button.getElement("background").setStrokeStyle(1, 0xffffff);
        })
        .on("button.out", (button: any, groupName: string, index: number) => {
          (!this.isAnswered ||
            groupName === "actions" ||
            index === this.config.choices.length - 1) &&
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

export default class QuizDialog {
  scene: any;
  currScore: number;
  secondsLeft: number;
  timeLeftText: Phaser.GameObjects.Text;
  timer: NodeJS.Timeout;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.currScore = 0;
    this.secondsLeft = 30;
    shuffle(questions);

    this.timeLeftText = scene.add
      .text(
        this.scene.cameras.main.scrollX + 16,
        this.scene.cameras.main.scrollY + 16,
        "Time left: " + this.secondsLeft,
        {
          fontSize: "24px",
          fontFamily: "Arial",
        }
      )
      .setColor("white")
      .setBackgroundColor("black");
    this.timeLeftText.setDepth(30);
  }

  async run() {
    this.timer = setInterval(() => {
      this.secondsLeft -= 1;
      this.timeLeftText.setText("Time left: " + this.secondsLeft);
      if (this.secondsLeft === 0) {
        dispatchEvent(new Event("stop-quiz"));
      }
    }, 1000);

    for (let question of questions) {
      const currQuestion = new SingleQuizDialog(
        this.scene,
        question.question,
        question.options,
        this.currScore
      );
      const newScore = await currQuestion.create();

      this.currScore = newScore;
      if (newScore === -1 || this.secondsLeft === 0) {
        break;
      }
    }

    this.killTimer();
    return this.currScore;
  }

  killTimer = () => {
    clearInterval(this.timer);
    this.timeLeftText.destroy();
  };
}

function shuffle(array: Array<any>) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
  return array;
}
