import { Client, Databases } from "appwrite";

const appwrite = new Client();

appwrite.setProject("671b2ff3003c9d19966b");

const db = new Databases(appwrite);
const DATA_ID = "671b343300301c3f5647";
const COLL_ID = "671b345a001de7636a94";

async function fetchData() {
    const response = await db
        .listDocuments(DATA_ID, COLL_ID)
        .then((response) => {
            console.log(response);

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
