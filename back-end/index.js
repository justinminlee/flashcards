const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json()); // Middleware to parse JSON in the request body

// app.use(express.static(`${__dirname}/story/movies`));

app.get('/upload_file', async (req, res) => {
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        return res.send(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});
 

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

