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
