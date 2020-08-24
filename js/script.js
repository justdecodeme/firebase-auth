let signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm["email"].value;
  const password = signupForm["password"].value;

  console.log(email, password);
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred);
  });
});
