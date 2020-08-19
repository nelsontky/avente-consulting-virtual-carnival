import * as admin from "firebase-admin";

import serviceAccount from "./avente-carnival-firebase-adminsdk-68o8w-4ddb8b6837.json";

import fs from "fs";

const keys: any = serviceAccount;
const app = admin.initializeApp({
  credential: admin.credential.cert(keys),
  databaseURL: "https://avente-carnival.firebaseio.com",
});

const auth = app.auth();
const db = app.firestore();

async function getAllUsers(): Promise<
  { uid: string; email: string; creationTime: string }[]
> {
  const listUsersRes = await auth.listUsers();
  return listUsersRes.users.map((user) => ({
    email: user.email,
    uid: user.uid,
    creationTime: user.metadata.creationTime,
  }));
}

async function getAllDocs() {
  let results = {};

  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    const docData = doc.data();
    const stationData = docData.stationData;
    delete docData.stationData;

    const timeCompleted =
      docData.timeCompleted == undefined
        ? "NIL"
        : docData.timeCompleted.toDate().toString();
    results[doc.id] = {
      ...docData,
      ...stationData,
      timeCompleted,
    };
  });

  return results;
}

(async () => {
  let res = [];
  const users = await getAllUsers();
  const data = await getAllDocs();

  for (const user of users) {
    if (data[user.uid] != undefined) {
      const userData = {
        ...data[user.uid],
        email: user.email,
        creationTime: user.creationTime,
      };

      if (!user.email.includes("smu.edu.sg")) {
        console.log(userData);
      } else {
        res.push(userData);
      }
    }
  }

  fs.writeFileSync("scripts/output.json", JSON.stringify(res, null, 2));
})();
