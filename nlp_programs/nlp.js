const { NlpManager } = require('node-nlp');
 
const manager = new NlpManager({ languages: ['hi'] });
// Adds the utterances and intents for the NLP
manager.addDocument('hi', 'अब के लिए अलविदा', 'greetings.bye');
manager.addDocument('hi', 'अलविदा अपना ध्यान रखना', 'greetings.bye');
manager.addDocument('hi', 'अच्छा बाद में मिलते है', 'greetings.bye');
manager.addDocument('hi', 'अभी के लिए अलविदा', 'greetings.bye');
manager.addDocument('hi', 'मुझे जाना चाहिए', 'greetings.bye');
manager.addDocument('hi', 'नमस्कार', 'greetings.hello');
manager.addDocument('hi', 'नमस्ते', 'greetings.hello');
manager.addDocument('hi', 'कैसे हो', 'greetings.hello');
 
// Train also the NLG
manager.addAnswer('hi', 'greetings.bye', 'अगली बार तक');
manager.addAnswer('hi', 'greetings.bye', 'जल्द ही फिर मिलेंगे!');
manager.addAnswer('hi', 'greetings.hello', 'सुनो!');
manager.addAnswer('hi', 'greetings.hello', 'अभिवादन!');
 
// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
    const response = await manager.process('hi', 'भई यो आपका हार्दिक स्वगत है');
    console.log(response.answer);
})();