const params = new URLSearchParams(window.location.search);

const studentId = params.get("studentId");
const studentName = params.get("studentName");
const startButton = document.getElementById("startButton");

if (studentId && studentId !== "0") {
    document.getElementById("studentName").textContent = studentName || "Student";
    startButton.classList.remove("d-none");
}