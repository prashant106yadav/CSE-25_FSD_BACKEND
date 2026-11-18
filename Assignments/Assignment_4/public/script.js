const form = document.getElementById("requestForm");

const requestsContainer =
    document.getElementById("requestsContainer");


// ==========================================
// GET ALL REQUESTS
// ==========================================

async function getRequests() {

    try {

        const response =
            await fetch("/api/requests");

        const requests =
            await response.json();

        displayRequests(requests);

    } catch (error) {

        console.log("Error:", error);
    }
}


// ==========================================
// DISPLAY REQUESTS
// ==========================================

function displayRequests(requests) {

    requestsContainer.innerHTML = "";

    if (requests.length === 0) {

        requestsContainer.innerHTML =
            "<p>No requests submitted yet.</p>";

        return;
    }


    requests.forEach(request => {

        const card =
            document.createElement("div");

        card.className = "request-card";


        card.innerHTML = `

            <h3>
                ${request.category}
            </h3>

            <p>
                <strong>Student:</strong>
                ${request.studentName}
            </p>

            <p>
                <strong>Email:</strong>
                ${request.email}
            </p>

            <p>
                <strong>Problem:</strong>
                ${request.description}
            </p>

            <p>
                <strong>Priority:</strong>
                ${request.priority}
            </p>

            <button
                class="edit-btn"
                onclick="updateRequest(${request.id})"
            >
                Update
            </button>

            <button
                class="delete-btn"
                onclick="deleteRequest(${request.id})"
            >
                Delete
            </button>

        `;


        requestsContainer.appendChild(card);

    });
}


// ==========================================
// POST - CREATE REQUEST
// ==========================================

form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const newRequest = {

        studentName:
            document.getElementById("studentName").value,

        email:
            document.getElementById("email").value,

        category:
            document.getElementById("category").value,

        description:
            document.getElementById("description").value,

        priority:
            document.getElementById("priority").value
    };


    try {

        const response = await fetch(
            "/api/requests",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(newRequest)
            }
        );


        if (response.ok) {

            alert(
                "Request submitted successfully!"
            );

            form.reset();

            getRequests();
        }

    } catch (error) {

        console.log("Error:", error);
    }

});


// ==========================================
// PUT - UPDATE REQUEST
// ==========================================

async function updateRequest(id) {

    const studentName =
        prompt("Enter student name:");

    const email =
        prompt("Enter email:");

    const category =
        prompt("Enter category:");

    const description =
        prompt("Enter problem description:");

    const priority =
        prompt(
            "Enter priority (Low/Medium/High):"
        );


    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {

        return;
    }


    const updatedRequest = {

        studentName,

        email,

        category,

        description,

        priority
    };


    try {

        const response = await fetch(
            `/api/requests/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(updatedRequest)
            }
        );


        if (response.ok) {

            alert(
                "Request updated successfully!"
            );

            getRequests();
        }

    } catch (error) {

        console.log("Error:", error);
    }
}


// ==========================================
// DELETE REQUEST
// ==========================================

async function deleteRequest(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this request?"
        );


    if (!confirmDelete) {

        return;
    }


    try {

        const response = await fetch(
            `/api/requests/${id}`,
            {
                method: "DELETE"
            }
        );


        if (response.ok) {

            alert(
                "Request deleted successfully!"
            );

            getRequests();
        }

    } catch (error) {

        console.log("Error:", error);
    }
}


// ==========================================
// LOAD REQUESTS WHEN PAGE OPENS
// ==========================================

getRequests();