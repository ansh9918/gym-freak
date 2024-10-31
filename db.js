import { Client, Databases } from "appwrite";
import { Account } from "appwrite";
import { ID } from "appwrite";
const appwrite = new Client();

appwrite.setProject("671b2ff3003c9d19966b");
export const account = new Account(appwrite);
const db = new Databases(appwrite);
const DATA_ID = "671b343300301c3f5647";
const COLL_ID = "671b345a001de7636a94";
const COLL_IDFORM = "6721f0ec0016f39dbb22";

async function fetchData() {
    const response = await db
        .listDocuments(DATA_ID, COLL_ID)
        .then((response) => {
            // console.log(response);

            const cardio = document.getElementsByClassName("cardio");
            const john = document.getElementsByClassName("john");
            const crossfit = document.getElementsByClassName("crossfit");
            const adam = document.getElementsByClassName("adam");
            const power = document.getElementsByClassName("power");
            const james = document.getElementsByClassName("james");

            for (let i = 0; i < cardio.length; i++) {
                cardio[i].textContent = `${response.documents[0].type}`;
            }
            for (let i = 0; i < john.length; i++) {
                john[i].textContent = `${response.documents[0].personal}`;
            }
            for (let i = 0; i < crossfit.length; i++) {
                crossfit[i].textContent = `${response.documents[1].type}`;
            }
            for (let i = 0; i < adam.length; i++) {
                adam[i].textContent = `${response.documents[1].personal}`;
            }
            for (let i = 0; i < power.length; i++) {
                power[i].textContent = `${response.documents[2].type}`;
            }
            for (let i = 0; i < james.length; i++) {
                james[i].textContent = `${response.documents[2].personal}`;
            }
        })
        .catch((error) =>
            console.error("Error fetching data from Appwrite:", error)
        );
}
fetchData();

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Gather form data
            const name = e.target.name.value;
            const email = e.target.email.value;

            const gymClass = e.target.class.value;
            const address = e.target.address.value;
            // Retrieve gender based on selected radio button
            let gender;
            if (document.getElementById("male").checked) {
                gender = "Male";
            } else if (document.getElementById("female").checked) {
                gender = "Female";
            } else if (document.getElementById("secret").checked) {
                gender = "Secret";
            }

            const isConfirmed = e.target.invalidCheck.checked;
            const price = parseInt(e.target.price.value, 10);
            const response = await db.createDocument(
                DATA_ID, // Replace with your Appwrite database ID
                COLL_IDFORM, // Replace with your Appwrite collection ID
                ID.unique(), // Automatically generate a unique ID
                {
                    name,
                    email,
                    price,
                    gymClass,
                    address,
                    gender,
                    isConfirmed,
                }
            );
            alert("Registration Successful!");
            console.log(response);
            e.target.reset();
        });
    }
});

async function fetchMembers() {
    try {
        const response = await db.listDocuments(
            DATA_ID, // Replace with your Appwrite database ID
            COLL_IDFORM // Collection ID for "members"
        );
        console.log(response);
        const membersList = document.getElementById("membersList");
        if (membersList) {
            try {
                const response = await db.listDocuments(DATA_ID, COLL_IDFORM);
                console.log(response);
                membersList.innerHTML = ""; // Clear any existing content

                response.documents.forEach((member, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td>${member.price}</td>
                        <td>${member.gymClass}</td>
                        <td>${member.address}</td>
                        <td>${member.gender}</td>
                    `;
                    membersList.appendChild(row);
                });
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        }
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchMembers);
