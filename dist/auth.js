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

      const intervalId = setInterval(() => {
        if (
          $(".firebaseui-id-submit").length &&
          $(".firebaseui-id-email").length &&
          $(".firebaseui-title").length
        ) {
          $(".firebaseui-id-submit").attr("disabled", true);
          $(".firebaseui-id-email").on("input", (e) => {
            const input = e.target.value;
            if (isSmuEmail(input)) {
              $(".firebaseui-id-submit").attr("disabled", false);
            } else {
              $(".firebaseui-id-submit").attr("disabled", true);
            }
          });
          $(".firebaseui-title").text(
            "Sign in with SMU email. Example: johndoe@smu.edu.sg"
          );
          clearInterval(intervalId);
        }
      }, 100);
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
    document.getElementById("loader").style.display = "none";
    document.getElementById("firebaseui-auth-container").style.display = "none";
    document.getElementById("game").style.display = "block";
  }
});

function isSmuEmail(input) {
  const domain = input.split("@").pop();
  return domain === "smu.edu.sg";
}
