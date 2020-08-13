export interface IDialog {
  content: string;
  choices: {
    choiceText: string;
    isAnswer: boolean;
    category?: "IT" | "Finance" | "Management" | "HR" | "Marketing"; // For Adrian only
  }[];
  dialogAfterCorrect?: IDialog;
  dialogAfterWrong?: IDialog;
}

// Interface representing NPC data
export default interface NPCDataInterface {
  name: string;
  dialogs: IDialog;
}
