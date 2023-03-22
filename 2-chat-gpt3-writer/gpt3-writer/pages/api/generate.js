import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
  You'll act as a movie recommendation system. I'll give you a list of movies and you'll find me exactly 5 other movies that you think are a good fit for my tastes. Take into account: genre (highest priority), director(s), writer(s), release year, and leading actors/actresses (lowest priority). For each movie, give me a one-liner that explains why would you think that that movies would be a good fit for my tastes (do not address me personally). Each movie item should have this structure: "ITEM_NUMBER. MOVIE_TITLE (RELEASE_YEAR): ONE_LINE_DESCRIPTION;".

  List of movies that I've watched: `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}.\n\n`,
    temperature: 0.9,
    max_tokens: 400,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;