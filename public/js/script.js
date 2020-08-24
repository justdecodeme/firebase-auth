/* ******************* */
/* SIGNUP LOGIC - EMAIL */
/* ******************* */
let signupEmailForm = document.getElementById("signupEmailForm");
let signup_error = document.getElementById("signup_error");

signupEmailForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupEmailForm["signup_email"].value;
  const password = signupEmailForm["signup_password"].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      // console.log(cred.user);
      // console.log("User Signed up!");
    })
    .catch((err) => {
      console.log(err);
      if (err.message) {
        signup_error.innerHTML = err.message;
        signup_error.style.display = "block";
      }
    });
});

/* ******************* */
/* LOGIN LOGIC - EMAIL*/
/* ******************* */
let login_error = document.getElementById("login_error");
let logOut = document.getElementById("logOut");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm["login_email"].value;
  const password = loginForm["login_password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // console.log(cred.user);
      // console.log("User Logged in!");
    })
    .catch((err) => {
      console.log(err);
      if (err.message) {
        login_error.innerHTML = err.message;
        login_error.style.display = "block";
      }
    });
});

logOut.addEventListener("click", () => {
  auth.signOut().then((cred) => {
    console.log(cred.user);
    console.log("User logged out!");
  });
});

/* ******************* */
/* COMMON LOGIC */
/* ******************* */
auth.onAuthStateChanged((user) => {
  if (user) {
    logOut.style.display = "block";
    console.log("User logged in: ", user);
  } else {
    logOut.style.display = "none";
    console.log("User logged out!");
  }
});

/* ******************* */
/* LOGIN LOGIC - PHONE */
/* ******************* */
let recaptchaContainer = document.getElementById("recaptchaContainer");
let loginPhoneForm = document.getElementById("loginPhoneForm");
let loginPhoneVerifyForm = document.getElementById("loginPhoneVerifyForm");

window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptchaContainer"
  );
  recaptchaVerifier.render().then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
    console.log(widgetId);
  });
  //   var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
  //   console.log(recaptchaResponse);
};

loginPhoneForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const number = loginPhoneForm["login_phone"].value;
  auth
    .signInWithPhoneNumber(number, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;
      console.log(coderesult);
    })
    .catch((err) => {
      console.log(err);
    });
});

loginPhoneVerifyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const number = loginPhoneVerifyForm["login_phone_verify"].value;

  confirmationResult
    .confirm(number)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* ******************* */
/* LOGIN LOGIC - GOOGLE */
/* ******************* */
let googleSignIn = document.getElementById("googleSignIn");

googleSignIn.addEventListener("click", (e) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  auth
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log(result);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(error);
    });
});
