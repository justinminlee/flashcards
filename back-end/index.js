const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const pdfParser = require('pdf-parse');


const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Enable CORS
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Middleware to parse JSON in the request body

const { generateAnkiCards } = require('./controller/question');

app.post("/new_module", )


app.post('/upload', generateAnkiCards);

// app.use(express.static(`${__dirname}/story/movies`));

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

