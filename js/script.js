/* ******************* */
/* SIGNUP LOGIC */
/* ******************* */
let signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm["signup_email"].value;
  const password = signupForm["signup_password"].value;

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred.user);
    // console.log("User Signed up!");
  });
});

/* ******************* */
/* LOGIN LOGIC */
/* ******************* */
let loginForm = document.getElementById("loginForm");
let logOut = document.getElementById("logOut");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm["login_email"].value;
  const password = loginForm["login_password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred.user);
    // console.log("User Logged in!");
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
