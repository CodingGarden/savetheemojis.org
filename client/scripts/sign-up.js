const form = document.querySelector("#newsletter");
const signUpContent = document.querySelector(".signup-content");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const loading = document.querySelector(".loading");
const API_URL = "http://localhost:5000/email";

successMessage.style.display = "none";
errorMessage.style.display = "none";
loading.style.display = "none";

form.addEventListener("submit", event => {
  event.preventDefault();

  signUpContent.style.display = "none";
  errorMessage.style.display = "none";
  loading.style.display = "block";

  formData = new FormData(form);
  email = formData
    .get("email")
    .toString()
    .trim();

  data = {
    email
  };
  body = JSON.stringify(data);

  fetch(API_URL, {
    method: "POST",
    body: body,
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      console.log(body);
      console.log(res);
      if (res.ok) {
        loading.style.display = "none";
        successMessage.style.display = "block";
      } else {
        loading.style.display = "none";
        errorMessage.style.display = "block";
        signUpContent.style.display = "block";
      }
    })
    .catch(console.error);
});

const form = document.querySelector("#newsletter");
const signUpContent = document.querySelector(".signup-content");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const loading = document.querySelector(".loading");
const API_URL = "http://localhost:5000/email";

successMessage.style.display = "none";
errorMessage.style.display = "none";
loading.style.display = "none";

form.addEventListener("submit", event => {
  event.preventDefault();

  signUpContent.style.display = "none";
  errorMessage.style.display = "none";
  loading.style.display = "block";

  formData = new FormData(form);
  email = formData
    .get("email")
    .toString()
    .trim();

  data = {
    email
  };
  body = JSON.stringify(data);

  fetch(API_URL, {
    method: "POST",
    body: body,
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => {
      console.log(body);
      console.log(res);
      if (res.ok) {
        loading.style.display = "none";
        successMessage.style.display = "block";
      } else {
        loading.style.display = "none";
        errorMessage.style.display = "block";
        signUpContent.style.display = "block";
      }
    })
    .catch(console.error);
});
