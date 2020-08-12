import NPCDataInterface from "./NPCDataInterface";

const nextButtonOnlyChoices = [{ choiceText: "Next", isAnswer: true }];

export const MIN_HEIN: NPCDataInterface = {
  name: "Min Hein",
  dialogs: {
    content: `Hi! I'm Min Hein, the Strat-Acad Liaison Association Director of Avente Consulting!`,
    choices: nextButtonOnlyChoices,

    dialogAfterCorrect: {
      content: `Avente, in partnership with UOB-SMU AEI, is SMU’s very first consulting CCA focused on SMEs. We aim to help SMEs adapt to changing digital landscapes through in-house project implementations!`,
      choices: nextButtonOnlyChoices,

      dialogAfterCorrect: {
        content: `As a student led organization, we aim to provide solutions for SMEs! Do you know what Avente’s vision is?`,
        choices: nextButtonOnlyChoices,

        dialogAfterCorrect: {
          content: `Question: To be a leading (blank) club providing (blank) solutions for SMEs whilst possessing strong credentials of achievement.`,
          choices: [
            {
              choiceText: `Business Consulting / Innovative, Sustainable`,
              isAnswer: true,
            },
            {
              choiceText: `Marketing Consulting / Digitalized, Implementable`,
              isAnswer: false,
            },
            {
              choiceText: `Marketing Tech Consulting / Strong, Relevant`,
              isAnswer: false,
            },
            {
              choiceText: `Marketing Tech Consulting / Innovative, Sustainable`,
              isAnswer: false,
            },
          ],
          dialogAfterCorrect: {
            content: `That’s correct!`,
            choices: nextButtonOnlyChoices,

            dialogAfterCorrect: {
              content: `Head over to Kingston to hear about Avente’s mission!`,
              choices: nextButtonOnlyChoices,
            },
          },
          dialogAfterWrong: {
            content: `Oopsie, very close! Avente’s vision is to “To be a leading Business Consulting club providing innovative, sustainable solutions for SMEs whilst possessing strong credentials of achievement.” `,
            choices: nextButtonOnlyChoices,

            dialogAfterCorrect: {
              content: `Head over to Kingston to hear about Avente’s mission!`,
              choices: nextButtonOnlyChoices,
            },
          },
        },
      },
    },
  },
};
