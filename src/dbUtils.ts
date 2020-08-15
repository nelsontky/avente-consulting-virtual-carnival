import getFirebase from "./firebase";

const db = getFirebase().firestore();

// Boolean will turn to true if completed
export interface DbSchema {
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
    Punnag?: number;
    Samantha?: boolean;
    Svarnim?: boolean;
    "Wai Siang"?: boolean;
  };
}

export async function updateUser(uid: string, data: DbSchema) {
  let isSuccess = false;

  while (!isSuccess) {
    try {
      await db.collection("users").doc(uid).set(data, { merge: true });
      isSuccess = true;
    } catch {
      // retry till success
      console.log("Retry update user");
    }
  }
}

export async function updateStationData(
  uid: string,
  name: string,
  value: boolean | number
) {
  let isSuccess = false;

  while (!isSuccess) {
    try {
      await db.collection("users").doc(uid).set({}, { merge: true }); // ensure user has single document

      if (typeof value === "number") {
        const currValue = await getUser(uid);

        // Do not update if prev score is higher
        const shouldUpdate =
          currValue.stationData !== undefined &&
          currValue.stationData[name] !== undefined &&
          currValue.stationData[name] < value;

        if (!shouldUpdate) {
          return;
        }
      }
      await db
        .collection("users")
        .doc(uid)
        .update({ [`stationData.${name}`]: value });
      isSuccess = true;
    } catch {
      // retry till success
      console.log("Retry update station data");
    }
  }
}

export async function getUser(uid: string): Promise<DbSchema> {
  while (true) {
    try {
      return (await db.collection("users").doc(uid).get()).data();
    } catch {
      // retry till success
      console.log("Retry get user");
    }
  }
}
