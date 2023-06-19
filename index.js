document.addEventListener('DOMContentLoaded', function() {
    const scrapeButton = document.getElementById('spellingCheck');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: spellingCheck
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrapeButton = document.getElementById('grammarCheck');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: grammarCheck
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrapeButton = document.getElementById('getHighlightedText');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: grammarCheck
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrapeButton = document.getElementById('tldrSummarize');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: tldrSummarize
            });
        });
    });
});


async function spellingCheck() {
    let textContent = scrapeText();
    fetchData();
    function fetchData() {
        console.log("Fetching correct results for you...");
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/completions';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Is there spelling mistake in this: ${textContent}. List down the words that had spelling mistake in a tabular from.`,
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
                console.log("Response: ", data.choices[0].text);
            })
            .catch(error => {
                console.error('Error checking spelling:', error);
            });
    }

    function scrapeText() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        );
        let textContent = '';
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const trimmedText = node.textContent.trim();

            if (trimmedText.length > 0) {
                textContent += trimmedText + '\n';
            }
        }
        return textContent;
    }
}

async function grammarCheck() {
    let textContent = scrapeText();
    fetchData();
    function fetchData() {
        console.log("Fetching correct results for you...");
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/completions';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Is this grammatically correct: ${textContent}.`,
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
                console.log("Response: ", data.choices[0].text);
            })
            .catch(error => {
                console.error('Error checking spelling:', error);
            });
    }

    function scrapeText() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        );
        let textContent = '';
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const trimmedText = node.textContent.trim();

            if (trimmedText.length > 0) {
                textContent += trimmedText + '\n';
            }
        }
        return textContent;
    }
}

async function tldrSummarize() {
    let textContent = scrapeText();
    fetchData();
    function fetchData() {
        console.log("Fetching correct results for you...");
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/completions';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Summarize this for a second-grade student:\n\n${textContent}`,
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
                console.log("Response: ", data.choices[0].text);
            })
            .catch(error => {
                console.error('Error checking spelling:', error);
            });
    }

    function scrapeText() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        );
        let textContent = '';
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const trimmedText = node.textContent.trim();

            if (trimmedText.length > 0) {
                textContent += trimmedText + '\n';
            }
        }
        return textContent;
    }
}
