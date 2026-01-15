// Main page renderer
let maxLength = 500;

// Load config on page load
async function loadConfig() {
  try {
    const config = await window.electronAPI.getConfig();
    maxLength = config.maxMessageLength || 500;
    
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    messageTextarea.maxLength = maxLength;
    charCount.textContent = `0/${maxLength}`;
    
    // Set default recipient if configured
    if (config.defaultRecipient) {
      document.getElementById('recipient').value = config.defaultRecipient;
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }
}

// Settings button
document.getElementById('settingsBtn').addEventListener('click', async () => {
  await window.electronAPI.openSettings();
  // Reload config after settings window is closed
  setTimeout(loadConfig, 500);
});

// Character counter
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

messageTextarea.addEventListener('input', () => {
  const length = messageTextarea.value.length;
  charCount.textContent = `${length}/${maxLength}`;
});

// Form submission
document.getElementById('emailForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const messageBox = document.getElementById('message-box');
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  const formData = {
    recipient: document.getElementById('recipient').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };
  
  try {
    const result = await window.electronAPI.sendEmail(formData);
    
    if (result.success) {
      messageBox.textContent = result.message;
      messageBox.className = 'message-box success';
      messageBox.style.display = 'block';
      
      // Clear form on success
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
      charCount.textContent = `0/${maxLength}`;
      
      // Reload config to check for default recipient
      const config = await window.electronAPI.getConfig();
      if (!config.defaultRecipient) {
        document.getElementById('recipient').value = '';
      }
    } else {
      messageBox.textContent = result.message;
      messageBox.className = 'message-box error';
      messageBox.style.display = 'block';
    }
  } catch (error) {
    messageBox.textContent = 'Error: ' + error.message;
    messageBox.className = 'message-box error';
    messageBox.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Email';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }
});

// Load config on page load
loadConfig();
