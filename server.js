const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

const OpenAI = require("openai");
const client = new OpenAI({apiKey: process.env.OPENAI_KEY});
// console.log(process.env.OPENAI_KEY);
// console.log(dotenv);






app.use(express.static('public'));
app.use(cors()); //allowing for cross origin request
app.use(bodyParser.json()); //parsin req.body


app.post('/question', async (req, res, next) => {
    try {
        const input = `You are a nutrition expert, you can asnwer any question related to nutrition, but only questions related to nutrition. 
        If asked a question not related to nutriotion please reply with I can only answer questions related to nutrition. 
        Please reply with a short, clear, and user friendly answer, pretend you are speaking to a 18 year old. Here is the question you should answer: ${req.body.question}`;
        const response = await client.responses.create({
            model: "gpt-4o",
            input: input
        });
        res.status(200).send({output_text:response.output_text});

    } catch (error) {
        next(error)
    }
})


//error handler

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(error.message || 500).send(error.message);
});

app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
})

