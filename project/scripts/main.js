/* Project */

// set current year in footer
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();

const loggedIn = localStorage.getItem("logged_in");
const signedUp = localStorage.getItem("signed_up");

if (loggedIn) {
  document.querySelector("#join-option").style.display = "none";
  document.querySelector("#login-option").style.display = "none";
  document.querySelector("#cart-option").style.display = "block";
} else if (signedUp) {
  document.querySelector("#join-option").style.display = "none";
  document.querySelector("#login-option").style.display = "block";
  document.querySelector("#cart-option").style.display = "none";
} else {
  document.querySelector("#join-option").style.display = "block";
  document.querySelector("#login-option").style.display = "none";
  document.querySelector("#cart-option").style.display = "none";
}

if (document.querySelector('.content.thanks')) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const firstName = urlParams.get('first_name');
  const email = urlParams.get('email');
  const password = urlParams.get('password');
  if (email && password) {
    localStorage.setItem("signed_up", true);
    localStorage.setItem("signin_email", email);
    localStorage.setItem("signin_password", password);
    document.querySelector('#first_name').innerHTML = firstName;
  }

  setTimeout( function(){
    window.location = "index.html";
  }, 5000);
}

if (document.querySelector('.content.login-page')) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const email = urlParams.get('email');
  const password = urlParams.get('password');

  if (email && password) {
    const signinEmail = localStorage.getItem("signin_email");
    const signinPassword = localStorage.getItem("signin_password");

    if (email == signinEmail && password == signinPassword) {
      localStorage.setItem("logged_in", true);

      setTimeout( function(){
        window.location = "index.html";
      }, 100);
    } else {
      setTimeout( function(){
        window.location = "login.html?error=credentials_error";
      }, 100);
    }
  }

  const error = urlParams.get('error');
  if (error) {
    document.querySelector("#error").innerHTML = "Invalid Email or password."
    document.querySelector("#error").classList.add("active");
  }
}
