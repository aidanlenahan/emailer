const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');
const emailForm = document.getElementById('emailForm');
const messageBox = document.getElementById('message-box');

// Character counter
messageTextarea.addEventListener('input', function() {
    const length = this.value.length;
    charCount.textContent = `${length}/${this.maxLength}`;
    
    if (length >= this.maxLength * 0.9) {
        charCount.style.color = '#e74c3c';
    } else {
        charCount.style.color = '#888';
    }
});

// Form submission
emailForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    messageBox.style.display = 'none';
    
    try {
        const formData = new FormData(this);
        const response = await fetch('send.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        messageBox.className = 'message-box ' + (result.success ? 'success' : 'error');
        messageBox.textContent = result.message;
        messageBox.style.display = 'block';
        
        if (result.success) {
            // Clear form on success
            this.reset();
            charCount.textContent = '0/' + messageTextarea.maxLength;
        }
        
    } catch (error) {
        messageBox.className = 'message-box error';
        messageBox.textContent = 'An error occurred while sending the email';
        messageBox.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
