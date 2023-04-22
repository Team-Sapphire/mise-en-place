const axios = require("axios");
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
// const getChatGPT = () => {
//   let ingredients = "";
//   thisRecipe.ingredientLines.forEach((ingredient) => {
//     ingredients += ingredient + ", ";
//   });
//   setPrompt(
//     `Give me a recipe for ${thisRecipe.label} with these ingredients ${ingredients}`
//   );
//   axios
//     .post(
//       "https://api.openai.com/v1/completions",
//       {
//         prompt: prompt,
//         model: "gpt-3.5-turbo",
//         n: 1,
//         max_tokens: 500,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_KEY}`,
//         },
//       }
//     )
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
