const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      // Display game
      document.getElementById("game").style.display = "block";
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      requireDisplayName: true,
    },
  ],
};

ui.start("#firebaseui-auth-container", uiConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Hide/show elements on sign in
    console.log(user);
    document.getElementById("loader").style.display = "none";
    document.getElementById("firebaseui-auth-container").style.display = "none";
    document.getElementById("game").style.display = "block";
  }
});
