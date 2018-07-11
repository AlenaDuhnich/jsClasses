// Init Auth

const auth = new Auth();
const ui = new UI();

// Init Elements

const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];

// Check Auth State

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location = 'index.html';
  }
});

form.addEventListener("submit", onLogin);

function onLogin(e) {
  e.preventDefault();

  if (email.value && password.value) {
    auth.login(email.value, password.value)
        .then(() => {
          window.location = 'index.html'
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          ui.showLoginError(errorMessage);
          setTimeout(function () {
            document.querySelector('.alert').remove();
          }, 3000);
        })
  }
}