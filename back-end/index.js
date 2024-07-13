const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const pdfParser = require('pdf-parse');


const configurations = require('./knexfile.js');
const knex = require('knex')(configurations);

knex.raw("SELECT VERSION()").then(() => {
    console.log("db connection successful")
});

const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Enable CORS
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Middleware to parse JSON in the request body

const { generateAnkiCards } = require('./controller/question');
const { handleModuleCreation, handleModuleDeletion } = require("./controller/course")

 
app.use((req, res, next) => {
  req.db = knex;
  next();
});


// TO DO: send module name
app.post("/new_module", handleModuleCreation);
app.post("delete_module", handleModuleDeletion);

app.post('/upload', generateAnkiCards);



app.get('/upload_file', async (req, res) => {
    try {
        console.log(data);
        const data = fs.readFileSync('data.json', 'utf-8');
        return res.send(data).status(200);
    } catch (err) {
        console.error(err);
        return res.send(data);
    }
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

