const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {

    // Home Route - Display Welcome Message and Form
    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Student Record System</title>
            </head>

            <body>
                <h1>Welcome to Student Record Management System</h1>

                <h2>Add Student</h2>

                <form action="/add-student" method="POST">

                    <label>Student Name:</label><br>
                    <input type="text" name="name" required>
                    <br><br>

                    <label>Roll Number:</label><br>
                    <input type="text" name="rollNumber" required>
                    <br><br>

                    <label>Course:</label><br>
                    <input type="text" name="course" required>
                    <br><br>

                    <label>Email:</label><br>
                    <input type="email" name="email" required>
                    <br><br>

                    <button type="submit">Add Student</button>

                </form>

                <br>

                <a href="/students">View All Students</a>

            </body>
            </html>
        `);
    }

    // Add Student Route
    else if (req.method === "POST" && req.url === "/add-student") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            // Convert form data into object
            const params = new URLSearchParams(body);

            const newStudent = {
                name: params.get("name"),
                rollNumber: params.get("rollNumber"),
                course: params.get("course"),
                email: params.get("email")
            };

            // Read existing students
            fs.readFile("students.json", "utf8", (err, data) => {

                let students = [];

                if (!err && data) {
                    students = JSON.parse(data);
                }

                // Add new student
                students.push(newStudent);

                // Save updated data
                fs.writeFile(
                    "students.json",
                    JSON.stringify(students, null, 2),
                    (err) => {

                        if (err) {
                            res.writeHead(500, {
                                "Content-Type": "text/html"
                            });

                            return res.end("<h1>Error saving student record</h1>");
                        }

                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });

                        res.end(`
                            <h1>Student Added Successfully!</h1>

                            <a href="/">Add Another Student</a>
                            <br><br>
                            <a href="/students">View All Students</a>
                        `);
                    }
                );
            });
        });
    }

    // Display Student Records
    else if (req.method === "GET" && req.url === "/students") {

        fs.readFile("students.json", "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/html"
                });

                return res.end("<h1>Error reading student records</h1>");
            }

            let students = [];

            if (data) {
                students = JSON.parse(data);
            }

            let studentRows = "";

            students.forEach((student, index) => {

                studentRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${student.name}</td>
                        <td>${student.rollNumber}</td>
                        <td>${student.course}</td>
                        <td>${student.email}</td>
                    </tr>
                `;
            });

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Student Records</title>
                </head>

                <body>

                    <h1>Student Records</h1>

                    <table border="1" cellpadding="10">
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Course</th>
                            <th>Email</th>
                        </tr>

                        ${studentRows}

                    </table>

                    <br>

                    <a href="/">Add New Student</a>

                </body>
                </html>
            `);
        });
    }

    // Page Not Found
    else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.end("<h1>404 - Page Not Found</h1>");
    }

});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});