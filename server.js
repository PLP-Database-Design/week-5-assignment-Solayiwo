// Import some dependencies/ packages 
const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();    // configure environment variables  

// Creating connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
})

// Test if there is a connection 
db.connect((error) => {
    if (error) {
        console.log("Error connecting to the database: ", error)
    }
    
    console.log("Successfully connecting to MySQL: ", db.threadId)
});


// Question 1
// retrieves all patients,
// displaying patient_id, first_name, last_name, date_of_birth.

app.get("/patients", (req, res) => {
    const patients = "SELECT patient_id, first_name, last_name, date_of_birth  FROM patients"

    db.query(patients, (error, data) => {
        if (error) {
            console.error(error)
            return res.status(500).send({ message: "Fail to get patients" })
        }

        //res.status(200).json(data)
        res.status(200).send(data)
    })
})


// Question 2
// retrieves all providers,
// displaying patient_id, first_name, last_name, provider_specialty.

app.get("/providers", (req, res) => {
    const providers = "SELECT first_name, last_name, provider_specialty FROM providers"

    db.query(providers, (error, data) => {
        if (error) {
            console.error(error)
            return res.status(500).send({message: "Fail to get patients"})
        }

        //res.status(200).json(data)
        res.status(200).send(data)
    })
})


// Question 3
// retrieves all patients by their first name.

app.get("/patients-by-first_name", (req, res) => {
    const patientsByFirstName = "SELECT first_name FROM patients"

    db.query(patientsByFirstName, (error, data) => {
        if(error) {
            console.error(error)
            return res.status(500).send({message: "Fail to get patients by their first_name"})
        }

        //res.status(200).json(data)
        res.status(200).send(data)
    })
})


// Question 4
// retrieves all providers by their specialty

app.get("/providers-by-specialty", (req, res) => {
    const providersBySpecialty = "SELECT provider_specialty FROM providers"

    db.query(providersBySpecialty, (error, data) =>{
        if (error) {
            console.error(error)
            return res.status(500).send({message: "Fail to get providers by their specialty"})
        }

        //res.status(200).json(data)
        res.status(200).send(data)
    })
})


// start and listen to the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT} ....`)

    app.get("", (req, res) => {
        res.send(`
            <h3>Endpoint list</h3>
            <ol>
                <li>/patients</li>
                <li>/providers</li>
                <li>/patients-by-first_name</li>
                <li>/providers-by-specialty</li>
            </ol>
        `);
    });
})


