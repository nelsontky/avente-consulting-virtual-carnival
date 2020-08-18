const firebaseConfig = {
  apiKey: "AIzaSyCMToVMjUFn7FqHFHgHDrGJq44Sq_fn8uQ",
  authDomain: "avente-carnival.firebaseapp.com",
  databaseURL: "https://avente-carnival.firebaseio.com",
  projectId: "avente-carnival",
  storageBucket: "avente-carnival.appspot.com",
  messagingSenderId: "712072888114",
  appId: "1:712072888114:web:e71c508ad5dfc52b92e12b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

$(document).ready(() => {
  db.collection("users")
    .doc("completedEqSh08tt4zrvMdsGf4Mj")
    .onSnapshot((doc) => {
      console.log(doc.data());
      $("#number-completed").text(doc.data().numberCompleted);
    });
});
