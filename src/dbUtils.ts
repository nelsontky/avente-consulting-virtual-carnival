import getFirebase from "./firebase";

const db = getFirebase().firestore();

// Boolean will turn to true if completed
export interface dbSchema {
  matricNumber?: string;
  timeCompleted?: Date;
  stationData?: {
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
  };
}

export async function updateUser(uid: string, data: dbSchema) {
  let isSuccess = false;

  while (!isSuccess) {
    try {
      const userHasDocument = (await getUser(uid)) !== undefined;

      if (!userHasDocument) {
        await createUserDoc(uid);
      }

      await db.collection("users").doc(uid).update(data);
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

async function createUserDoc(uid: string) {
  let isSuccess = false;

  while (!isSuccess) {
    try {
      await db.collection("users").doc(uid).set({});
      isSuccess = true;
    } catch {
      // retry till success
    }
  }
}
