import getFirebase from "./firebase";

const db = getFirebase().firestore();

// Boolean will turn to true if completed
export interface dbSchema {
  matricNumber?: string;
  Adrian?: boolean;
  Benedict?: boolean;
  Chloe?: boolean;
  Donald?: boolean;
  Gregory?: boolean;
  Kingston?: boolean;
  "Min Hern"?: boolean;
  Punnag?: boolean;
  Samantha?: boolean;
  Svarnim?: boolean;
  "Wai Siang"?: boolean;
  timeCompleted?: Date;
}

export async function updateUser(uid: string, data: dbSchema) {
  let isSuccess = false;

  while (!isSuccess) {
    try {
      await db.collection("users").doc(uid).set(data, { merge: true });
      isSuccess = true;
    } catch {
      // retry till success
    }
  }
}

export async function getUser(uid: string): Promise<dbSchema> {
  while (true) {
    try {
      return (await db.collection("users").doc(uid).get()).data();
    } catch {
      // retry till success
    }
  }
}
