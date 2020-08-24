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
/* SIGNUP LOGIC - PHONE */
/* ******************* */
let recaptchaContainer = document.getElementById("recaptchaContainer");
let signupPhoneForm = document.getElementById("signupPhoneForm");
let signupPhoneVerifyForm = document.getElementById("signupPhoneVerifyForm");

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

signupPhoneForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const number = signupPhoneForm["signup_phone"].value;
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

signupPhoneVerifyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const number = signupPhoneVerifyForm["signup_phone_verify"].value;

  confirmationResult
    .confirm(number)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
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
