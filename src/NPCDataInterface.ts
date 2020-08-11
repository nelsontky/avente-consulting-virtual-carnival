export interface IDialog {
  content: string;
  choices: { choiceText: string; isAnswer: boolean }[];
  dialogAfterCorrect?: IDialog;
  dialogAfterWrong?: IDialog;
}

// Interface representing NPC data
export default interface NPCDataInterface {
  name: string;
  dialogs: IDialog;
}
