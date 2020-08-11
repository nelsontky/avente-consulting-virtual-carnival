import NPCDataInterface from "./NPCDataInterface";

const nextButtonOnlyChoices = [{ choiceText: "Next", isAnswer: true }];

function breakString(str: string): string {
  return str.replace(/(.{50}[^ ]* )/g, "$1\n");
}

export const CHLOE_DATA: NPCDataInterface = {
  name: "Chloe",
  dialogs: {
    content: breakString(
      `Hi! I'm Min Hein, the Strat-Acad Liaison Association Director of Avente Consulting!`
    ),
    choices: nextButtonOnlyChoices,

    dialogAfterCorrect: {
      content: breakString(
        `Avente, in partnership with UOB-SMU AEI, is SMU’s very first consulting CCA focused on SMEs. We aim to help SMEs adapt to changing digital landscapes through in-house project implementations!`
      ),
      choices: nextButtonOnlyChoices,

      dialogAfterCorrect: {
        content: breakString(
          `As a student led organization, we aim to provide solutions for SMEs! Do you know what Avente’s vision is?`
        ),
        choices: nextButtonOnlyChoices,

        dialogAfterCorrect: {
          content: breakString(
            `Question: To be a leading (blank) club providing (blank) solutions for SMEs whilst possessing strong credentials of achievement.`
          ),
          choices: [
            {
              choiceText: breakString(
                `Business Consulting / Innovative, Sustainable`
              ),
              isAnswer: true,
            },
            {
              choiceText: breakString(
                `Marketing Consulting / Digitalized, Implementable`
              ),
              isAnswer: false,
            },
            {
              choiceText: breakString(
                `Marketing Tech Consulting / Strong, Relevant`
              ),
              isAnswer: false,
            },
            {
              choiceText: breakString(
                `Marketing Tech Consulting / Innovative, Sustainable`
              ),
              isAnswer: false,
            },
          ],
          dialogAfterCorrect: {
            content: breakString(`That’s correct!`),
            choices: nextButtonOnlyChoices,

            dialogAfterCorrect: {
              content: breakString(
                `Head over to Kingston to hear about Avente’s mission!`
              ),
              choices: nextButtonOnlyChoices,
            },
          },
          dialogAfterWrong: {
            content: breakString(
              `Oopsie, very close! Avente’s vision is to “To be a leading Business Consulting club providing innovative, sustainable solutions for SMEs whilst possessing strong credentials of achievement.” `
            ),
            choices: nextButtonOnlyChoices,

            dialogAfterCorrect: {
              content: breakString(
                `Head over to Kingston to hear about Avente’s mission!`
              ),
              choices: nextButtonOnlyChoices,
            },
          },
        },
      },
    },
  },
};
