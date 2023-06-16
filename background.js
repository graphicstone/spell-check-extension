document.addEventListener('DOMContentLoaded', function() {
    const scrapeButton = document.getElementById('scrapeButton');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: scrapeWebsiteText
            });
        });
    });
});


async function scrapeWebsiteText() {
    console.log("Scrapping started");
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let textContent = '';

    while (walker.nextNode()) {
        const node = walker.currentNode;
        const trimmedText = node.textContent.trim();

        if (trimmedText.length > 0) {
            textContent += trimmedText + '\n';
        }
    }

    console.log("Scrapping ended");
    console.log("Grammar check initialised");
    console.log("Calling for spell check");

    console.log("Spell check API call started");
    const apiKey = config.openAIApi;
    const apiUrl = 'https://api.openai.com/v1/completions';

    console.log("API ", apiKey);

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Is there any spelling mistake in this text: ${textContent}. 
            And if there are any, list down the words that had spelling mistake beautifully in a tabular from.`,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        })
    })
        .then(response => response.json())
        .then(data => {
            // Process the spelling check results
            console.log("Response: ", JSON.stringify(data));
            console.log("Response: ", data.choices[0].text);
            console.table(data.choices[0].text);
        })
        .catch(error => {
            console.error('Error checking spelling:', error);
        });
    console.log("Spell check completed");
}
