const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const OpenAI = require("openai");
const client = new OpenAI({apiKey: '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'});







app.use(express.static('public'));
app.use(cors()); //allowing for cross origin request
app.use(bodyParser.json()); //parsin req.body


app.post('/question', async (req, res, next) => {
    try {
        console.log('request received');
        const input = `You are a nutrition expert, you can asnwer any question related to nutrition, but only questions related to nutrition. 
        If asked a question not related to nutriotion please reply with (I can only answer questions related to nutrition). 
        Please reply with a short, clear, and user friendly answer, pretend you are speaking to a 10 year old. Here is the question you should answer: ${req.body.question}`;
        const response = await client.responses.create({
            model: "gpt-4o",
            input: input
        });
        console.log(response.output_text);
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

