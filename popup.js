// Functions to be injected into the web page
function summarizeText() {
    let text = document.body.innerText;
    
    // Split the text into sentences
    let sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    // Remove common stop words
    const stopWords = new Set(["the", "is", "in", "and", "to", "with", "a", "of", "for", "on", "that", "as", "it", "at", "by", "from", "an", "be", "this", "which", "or", "but", "are", "not", "has", "have", "was", "were", "they", "their", "its", "them"]);
    
    // Count word frequencies, ignoring stop words
    let wordFrequencies = {};
    sentences.forEach(sentence => {
        let words = sentence.toLowerCase().match(/\b[a-z]+\b/g) || [];
        words.forEach(word => {
            if (!stopWords.has(word)) {
                wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
            }
        });
    });
    
    // Calculate sentence scores based on word frequencies
    let sentenceScores = sentences.map(sentence => {
        let score = 0;
        let words = sentence.toLowerCase().match(/\b[a-z]+\b/g) || [];
        words.forEach(word => {
            if (wordFrequencies[word]) {
                score += wordFrequencies[word];
            }
        });
        return { sentence, score };
    });
    
    // Sort sentences by score in descending order and select top sentences
    sentenceScores.sort((a, b) => b.score - a.score);
    let summarySentences = sentenceScores.slice(0, Math.min(3, sentenceScores.length)).map(item => item.sentence);
    
    // Join top sentences to form the summary
    return summarySentences.join(' ');
}

function calculateReadingTime() {
    let text = document.body.innerText;
    let words = text.split(/\s+/).length;
    let readingSpeed = 200; // Average words per minute
    let minutes = Math.ceil(words / readingSpeed);
    return minutes;
}

function highlightText() {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        let span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        range.surroundContents(span);
    }
}

function readAloud() {
    let text = document.body.innerText;
    let utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// New function to stop text-to-speech
function stopReadAloud() {
    window.speechSynthesis.cancel();
}

function activateReadingMode() {
    const elementsToRemove = ['header', 'footer', 'aside', '.ads'];
    elementsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.style.display = 'none');
    });
    document.body.style.maxWidth = '800px';
    document.body.style.margin = 'auto';
}

// Utility function to clear output
function clearOutput() {
    document.getElementById('summary').innerText = '';
    document.getElementById('readingTime').innerText = '';
}

// Inject functions and execute on button click
document.getElementById('summarizeBtn').addEventListener('click', () => {
    clearOutput();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: summarizeText
        }, (results) => {
            const summary = results[0].result;
            document.getElementById('summary').innerText = summary;
        });
    });
});

document.getElementById('readingTimeBtn').addEventListener('click', () => {
    clearOutput();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: calculateReadingTime
        }, (results) => {
            const readingTime = results[0].result;
            document.getElementById('readingTime').innerText = `Estimated reading time: ${readingTime} minutes`;
        });
    });
});

document.getElementById('highlightBtn').addEventListener('click', () => {
    clearOutput();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: highlightText
        });
    });
});

document.getElementById('ttsBtn').addEventListener('click', () => {
    clearOutput();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: readAloud
        });
    });
});

// New event listener for the "Stop Read Aloud" button
document.getElementById('stopTtsBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: stopReadAloud
        });
    });
});

document.getElementById('readingModeBtn').addEventListener('click', () => {
    clearOutput();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: activateReadingMode
        });
    });
});
