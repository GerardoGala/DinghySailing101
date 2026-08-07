//====================================================
// certificate.js
//====================================================

//----------------------------------------------------
// Student Name
//----------------------------------------------------

const studentName =
    sessionStorage.getItem("studentName") || "Student";

document.getElementById("studentName").textContent =
    studentName;

//----------------------------------------------------
// Completion Date
//----------------------------------------------------

const today =
    new Date();

document.getElementById("completionDate").textContent =
    today.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

//----------------------------------------------------
// Download PDF
//----------------------------------------------------

document
    .querySelector("#controls button")
    .addEventListener("click", downloadCertificate);

//----------------------------------------------------

function downloadCertificate() {

    const element =
        document.querySelector(".certificate");

    const options = {

        margin: 0,

        filename:
            `${studentName} - Dinghy Sailing 101 Certificate.pdf`,

        image: {

            type: "jpeg",

            quality: 1.0

        },

        html2canvas: {

            scale: 2,

            useCORS: true

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        }

    };

    html2pdf()

        .set(options)

        .from(element)

        .save()

        .then(() => {

            sessionStorage.removeItem("studentName");

        });

}