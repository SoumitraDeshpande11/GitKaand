// Function to retrieve stored Gemini API key
async function getApiKey() {
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

// Function to retrieve stored GitHub PAT
async function getGitHubToken() {
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

// Function to generate files using Gemini API
async function generateFiles(language, numFiles, linesPerFile) {
    const apiKey = await getApiKey(); // Function to retrieve stored Gemini API key
    const response = await fetch('https://gemini.api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ language, numFiles, linesPerFile })
    });

    if (response.ok) {
        const files = await response.json();
        console.log('Files generated:', files);
        // Logic to save files locally
    } else {
        console.error('Failed to generate files:', response.statusText);
    }
}

// Function to commit and push files to GitHub
async function commitAndPushFiles() {
    const token = await getGitHubToken(); // Function to retrieve stored GitHub PAT
    const response = await fetch('https://api.github.com/repos/username/repo/contents/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify({
            message: 'Add generated files',
            content: 'base64-encoded-content', // Replace with actual file content
            branch: 'main'
        })
    });

    if (response.ok) {
        console.log('Files committed and pushed to GitHub');
    } else {
        console.error('Failed to push files to GitHub:', response.statusText);
    }
}

// Function to fetch repositories
async function fetchRepositories() {
    const token = await getGitHubToken();
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const repos = await response.json();
        const repoSelect = document.getElementById('repository');
        repos.forEach(repo => {
            const option = document.createElement('option');
            option.value = repo.name;
            option.textContent = repo.name;
            repoSelect.appendChild(option);
        });
    } else {
        console.error('Failed to fetch repositories:', response.statusText);
    }
}

// Function to save settings
async function saveSettings() {
    // Logic to save settings
}

// Add event listeners to buttons
document.getElementById('generateBtn').addEventListener('click', async function() {
    const language = document.getElementById('language').value;
    const numFiles = document.getElementById('numFiles').value;
    const linesPerFile = document.getElementById('linesPerFile').value;
    // Call Gemini API to generate files
    console.log(`Generating ${numFiles} ${language} files with ${linesPerFile} lines each.`);
    await generateFiles(language, numFiles, linesPerFile);
});

document.getElementById('commitPushBtn').addEventListener('click', async function() {
    // Logic to commit and push files to GitHub
    console.log('Committing and pushing files to GitHub.');
    await commitAndPushFiles();
});

document.getElementById('settingsBtn').addEventListener('click', function() {
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('settingsView').style.display = 'block';
    fetchRepositories();
});

document.getElementById('backBtn').addEventListener('click', function() {
    document.getElementById('settingsView').style.display = 'none';
    document.getElementById('mainView').style.display = 'block';
});

document.getElementById('saveSettingsBtn').addEventListener('click', async function() {
    // Call function to save settings
    console.log('Saving settings.');
    await saveSettings();
});
