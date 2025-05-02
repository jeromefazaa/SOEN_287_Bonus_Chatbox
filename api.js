const OpenAI = require("openai");
const client = new OpenAI({apiKey: process.env.OPENAI_KEY});
module.exports = client;