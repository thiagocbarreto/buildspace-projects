const getKey = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['openai-key'], (result) => {
      if (result['openai-key']) {
        const decodedKey = atob(result['openai-key']);
        resolve(decodedKey);
      }
    });
  });
};

const sendMessage = (content) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0].id;

    chrome.tabs.sendMessage(
      activeTab,
      { message: 'inject', content },
      (response) => {
        console.log('Service worker response:', response);
        if (response.status === 'failed') {
          console.log('injection failed.');
        }
      }
    );
  });
};

const generate = async (prompt) => {
  const key = await getKey();
  const url = 'https://api.openai.com/v1/completions';

  const completionResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1250,
      temperature: 0.7,
    }),
  });
	
  // Select the top choice and send back
  const completion = await completionResponse.json();
  console.log('API Response:', completion);
  return completion.choices.pop();
}

const generateCompletionAction = async (info) => {
  try {
    sendMessage('generating...');
    
    const { selectionText } = info;
    const basePromptPrefix = `
    You'll act as a movie recommendation system. I'll give you a list of movies and you'll find me exactly 5 other movies that you think are a good fit for my tastes. Take into account: genre (highest priority), director(s), writer(s), release year, and leading actors/actresses (lowest priority). For each movie, give me a one-liner that explains why would you think that that movies would be a good fit for my tastes (do not address me personally). Each movie item should have this structure: "ITEM_NUMBER. MOVIE_TITLE (RELEASE_YEAR): ONE_LINE_DESCRIPTION;".
  
    List of movies that I've watched: `;

    const baseCompletion = await generate(`${basePromptPrefix}${selectionText}.\n\n`);

    sendMessage(baseCompletion.text);
  } catch (error) {
    console.log('Generation failed:', error);
    sendMessage(error.toString());
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'context-run',
    title: 'Get movies like this/these',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(generateCompletionAction);