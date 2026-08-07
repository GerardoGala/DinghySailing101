//====================================================
// certificate.js
//====================================================

const studentName =
    sessionStorage.getItem("studentName") ??
    "Gerardo Gala";

document.getElementById("studentName").textContent =
    studentName;