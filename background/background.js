// Function to store API keys securely
function storeApiKey(key) {
    chrome.storage.sync.set({ 'geminiApiKey': key }, function() {
        console.log('Gemini API Key saved.');
    });
}

function storeGitHubToken(token) {
    chrome.storage.sync.set({ 'githubToken': token }, function() {
        console.log('GitHub Token saved.');
    });
}

// Function to retrieve stored API keys
function getApiKey() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('geminiApiKey', function(data) {
            if (data.geminiApiKey) {
                resolve(data.geminiApiKey);
            } else {
                reject('Gemini API Key not found');
            }
        });
    });
}

function getGitHubToken() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('githubToken', function(data) {
            if (data.githubToken) {
                resolve(data.githubToken);
            } else {
                reject('GitHub Token not found');
            }
        });
    });
}
