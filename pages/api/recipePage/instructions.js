const axios = require("axios");
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getInstructions = async (req, res) => {
  if (req.body.prompt !== undefined) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body.prompt}`,
      n: 1,
      max_tokens: 400,
    });
    res.status(201).json({ text: `${response.data.choices[0].text}` });
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
};

// const getInstructions = async (req, res) => {
//   if (req.body.prompt !== undefined) {
//     const response = await axios.post(
//       "https://api.openai.com/v1/completions",
//       {
//         prompt: `${req.body.prompt}`,
//         model: "gpt-3.5-turbo",
//         max_tokens: 500,
//         n: 1,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_KEY}`,
//         },
//       }
//     );
//     return response.data.choices[0].text.then((data) => {
//       console.log(data);
//     });
//   } else {
//     res.status(400).json({ text: "No prompt provided." });
//   }
// };

export default getInstructions;
