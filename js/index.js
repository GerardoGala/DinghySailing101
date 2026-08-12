const params = new URLSearchParams(window.location.search);

const studentEmail = params.get("studentEmail");
const startButton = document.getElementById("startButton");

if (studentEmail !== "0") {
    document.getElementById("studentEmail").textContent = studentEmail || "StudentEmail";
    startButton.classList.remove("d-none");
}