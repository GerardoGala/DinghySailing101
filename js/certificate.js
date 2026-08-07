//====================================================
// certificate.js
//====================================================

const studentName =
    sessionStorage.getItem("studentName") ??
    "Gerardo Gala";

document.getElementById("studentName").textContent =
    studentName;


//----------------------------------------------------
// Certificate Date
//----------------------------------------------------

const today =
    new Date();

const options = {

    year: "numeric",

    month: "long",

    day: "numeric"

};

document.getElementById("certificateDate").textContent =
    today.toLocaleDateString(
        "en-US",
        options
    );

//----------------------------------------------------
// Download PDF
//----------------------------------------------------

document
    .getElementById("downloadPdfButton")
    .addEventListener("click", () => {

        const certificate =
            document.querySelector(".certificate");

        html2pdf()
            .set({

                margin: 0.5,

                filename: "Certificate.pdf",

                image: {

                    type: "jpeg",

                    quality: 1

                },

                html2canvas: {

                    scale: 2

                },

                jsPDF: {

                    unit: "in",

                    format: "letter",

                    orientation: "landscape"

                }

            })
            .from(certificate)
            .save();

    });