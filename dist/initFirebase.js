const firebaseConfig = {
  apiKey: "AIzaSyCIO_76QAK37MsyDMJcQKKUJNHYLrRwkLw",
  authDomain: "virtual-carnival.firebaseapp.com",
  projectId: "virtual-carnival",
  storageBucket: "virtual-carnival.appspot.com",
  messagingSenderId: "763503599290",
  appId: "1:763503599290:web:d51ac7cbae9f5a9404ac83",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
