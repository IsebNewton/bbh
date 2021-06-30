document.getElementById("hello-from-js").innerText =
  "Hello from external JS file as well";

const responseField = document.getElementById("response-field");

function sendRequest(url) {
  fetch(url).then((res) => {
    res.json().then((json) => {
      responseField.innerHTML = JSON.stringify(json, null, "  ");
    });
  });
}

function checkLogin() {
  fetch("http://localhost:8080/api/auth", {
    method: "GET",
    credentials: "include",
  }).then(console.log);
}

function login() {
  fetch("http://localhost:8080/api/auth", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "admin", password: "admin" }),
    credentials: "include",
  }).then(console.log);
}

function logout() {
  fetch("http://localhost:8080/api/auth", {
    method: "DELETE",
    credentials: "include",
  }).then(console.log);
}
