const pdfParser = require('pdf-parse');
const { OpenAI } = require("openai");
const fs = require("fs");

const openai = new OpenAI({
    apiKey: null
});

let example_response = fs.readFileSync(`${__dirname}/structure.json`, 'utf-8');

example_response = JSON.parse(example_response);

const generateAnkiCards = async (req, res) => {
  if (!req.files || !req.files.pdf) {
    return res.status(400).send('No files were uploaded.');
  }

  const pdfFile = req.files.pdf;
  try {
    const pdfData = await pdfParser(pdfFile.data);
    const text = pdfData.text;


    const prompt = `use the this JSON format ${JSON.stringify(example_response)} to create new json file for the following content ${text}. Do not miss any topics, make sure you describe and create quizzes for each top using the format.`

    const messages = [
        { role: 'user', content: prompt },
        { role: 'system', content: `this is the structure for the response ${example_response.toString()}`},
    ];

    const completion = await openai.chat.completions.create({
        response_format: { "type": "json_object" },
        messages,
        model: 'gpt-3.5-turbo',
        temperature: 0
      });
    
    const answer = completion.choices[0].message.content;
    const id = completion.id;

    console.log(answer)

  } catch (error) {
    console.log(error)
    res.status(500).send('Error generating questions.');
  }
};

module.exports = { generateAnkiCards };
