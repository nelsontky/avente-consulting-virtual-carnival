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
          $(".firebaseui-card-header").length &&
          $(".firebaseui-id-secondary-link").length
        ) {
          $(".firebaseui-id-submit").attr("disabled", true);
          $(".firebaseui-id-secondary-link").remove();
          $(".firebaseui-id-email").on("input", (e) => {
            const input = e.target.value;
            if (/* isSmuEmail(input) */ true) {
              $(".firebaseui-id-submit").attr("disabled", false);
            } else {
              $(".firebaseui-id-submit").attr("disabled", true);
            }
          });
          $(".firebaseui-card-header").html(
            "<h1 class='firebaseui-title'>Welcome to Avente's Welfare Day!</h1><p>Sign in with your SMU Email for verification</p><p>Example: johndoe.2020@smu.edu.sg</p>"
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
