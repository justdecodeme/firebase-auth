let signupForm = document.getElementById("signupForm");
let logOut = document.getElementById("logOut");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm["signup_email"].value;
  const password = signupForm["signup_password"].value;

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log("User Signed up!");
  });
});

logOut.addEventListener("click", () => {
  auth.signOut().then(() => {
    console.log("Successfully log out!");
  });
});
