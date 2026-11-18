import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to requests.json
const DATA_FILE = path.join(__dirname, "requests.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// Function to read data from requests.json
function readRequests() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


// Function to save data to requests.json
function saveRequests(requests) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(requests, null, 2)
    );
}


// ==========================================
// GET /api/requests
// Get all requests
// ==========================================

app.get("/api/requests", (req, res) => {

    const requests = readRequests();

    res.json(requests);
});


// ==========================================
// GET /api/requests/:id
// Get a single request
// ==========================================

app.get("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const request = requests.find(
        item => item.id === id
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});


// ==========================================
// POST /api/requests
// Create a new request
// ==========================================

app.post("/api/requests", (req, res) => {

    const requests = readRequests();

    const newRequest = {

        id: Date.now(),

        studentName: req.body.studentName,

        email: req.body.email,

        category: req.body.category,

        description: req.body.description,

        priority: req.body.priority
    };

    requests.push(newRequest);

    saveRequests(requests);

    res.status(201).json(newRequest);
});


// ==========================================
// PUT /api/requests/:id
// Update a request
// ==========================================

app.put("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex(
        item => item.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests[index] = {

        id: requests[index].id,

        studentName: req.body.studentName,

        email: req.body.email,

        category: req.body.category,

        description: req.body.description,

        priority: req.body.priority
    };

    saveRequests(requests);

    res.json(requests[index]);
});


// ==========================================
// DELETE /api/requests/:id
// Delete a request
// ==========================================

app.delete("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const filteredRequests = requests.filter(
        item => item.id !== id
    );

    if (requests.length === filteredRequests.length) {

        return res.status(404).json({
            message: "Request not found"
        });
    }

    saveRequests(filteredRequests);

    res.json({
        message: "Request deleted successfully"
    });
});


// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});