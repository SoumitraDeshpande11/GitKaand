document.getElementById('saveBtn').addEventListener('click', function() {
    const geminiApiKey = document.getElementById('geminiApiKey').value;
    const githubToken = document.getElementById('githubToken').value;
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.storeApiKey(geminiApiKey);
        backgroundPage.storeGitHubToken(githubToken);
    });
    alert('Settings saved!');
});

document.getElementById('resetBtn').addEventListener('click', function() {
    chrome.storage.sync.clear(function() {
        alert('Settings reset!');
    });
});
