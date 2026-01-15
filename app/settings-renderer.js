// Settings page renderer

// Load config on page load
async function loadSettings() {
  try {
    const config = await window.electronAPI.getConfig();
    
    document.getElementById('smtpHost').value = config.smtpHost || '';
    document.getElementById('smtpPort').value = config.smtpPort || 587;
    document.getElementById('smtpUsername').value = config.smtpUsername || '';
    document.getElementById('smtpPassword').value = config.smtpPassword || '';
    document.getElementById('fromEmail').value = config.fromEmail || '';
    document.getElementById('fromName').value = config.fromName || '';
    document.getElementById('defaultRecipient').value = config.defaultRecipient || '';
    document.getElementById('maxMessageLength').value = config.maxMessageLength || 500;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Show message
function showMessage(message, isSuccess) {
  const messageBox = document.getElementById('message-box');
  messageBox.textContent = message;
  messageBox.className = isSuccess ? 'message-box success' : 'message-box error';
  messageBox.style.display = 'block';
  
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 5000);
}

// Test connection button
document.getElementById('testConnectionBtn').addEventListener('click', async () => {
  const btn = document.getElementById('testConnectionBtn');
  btn.disabled = true;
  btn.textContent = 'Testing...';
  
  const config = {
    smtpHost: document.getElementById('smtpHost').value.trim(),
    smtpPort: parseInt(document.getElementById('smtpPort').value),
    smtpUsername: document.getElementById('smtpUsername').value.trim(),
    smtpPassword: document.getElementById('smtpPassword').value
  };
  
  try {
    const result = await window.electronAPI.testSmtp(config);
    showMessage(result.message, result.success);
  } catch (error) {
    showMessage('Error: ' + error.message, false);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Test Connection';
  }
});

// Save settings
document.getElementById('settingsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';
  
  const config = {
    smtpHost: document.getElementById('smtpHost').value.trim(),
    smtpPort: parseInt(document.getElementById('smtpPort').value),
    smtpUsername: document.getElementById('smtpUsername').value.trim(),
    smtpPassword: document.getElementById('smtpPassword').value,
    fromEmail: document.getElementById('fromEmail').value.trim(),
    fromName: document.getElementById('fromName').value.trim(),
    defaultRecipient: document.getElementById('defaultRecipient').value.trim(),
    maxMessageLength: parseInt(document.getElementById('maxMessageLength').value)
  };
  
  try {
    const result = await window.electronAPI.saveConfig(config);
    
    if (result) {
      showMessage('Settings saved successfully!', true);
      setTimeout(() => {
        window.close();
      }, 1500);
    } else {
      showMessage('Error saving settings', false);
    }
  } catch (error) {
    showMessage('Error: ' + error.message, false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Settings';
  }
});

// Cancel button
document.getElementById('cancelBtn').addEventListener('click', () => {
  window.close();
});

// Load settings on page load
loadSettings();
