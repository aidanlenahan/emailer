<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Sender</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📧 Email Sender</h1>
        
        <div id="message-box" class="message-box"></div>
        
        <form id="emailForm" method="POST" action="send.php">
            <div class="form-group">
                <label for="recipient">Recipient Email:</label>
                <input type="email" 
                       id="recipient" 
                       name="recipient" 
                       <?php echo !empty(DEFAULT_RECIPIENT) ? 'value="' . htmlspecialchars(DEFAULT_RECIPIENT) . '"' : 'required'; ?>
                       placeholder="recipient@example.com">
            </div>
            
            <div class="form-group">
                <label for="subject">Subject:</label>
                <input type="text" 
                       id="subject" 
                       name="subject" 
                       required 
                       placeholder="Email subject">
            </div>
            
            <div class="form-group">
                <label for="message">Message: <span id="charCount">0/<?php echo MAX_MESSAGE_LENGTH; ?></span></label>
                <textarea id="message" 
                          name="message" 
                          required 
                          maxlength="<?php echo MAX_MESSAGE_LENGTH; ?>" 
                          placeholder="Enter your message here (max <?php echo MAX_MESSAGE_LENGTH; ?> characters)"></textarea>
            </div>
            
            <button type="submit" class="btn-send">Send Email</button>
        </form>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
