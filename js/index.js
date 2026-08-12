const params = new URLSearchParams(window.location.search);

const studentId = params.get("studentId");
console.log(studentId);
const startButton = document.getElementById("startButton");

if (studentId && studentId !== "0") {
    console.log("studentId is passed");
    startButton.classList.remove("d-none");
}