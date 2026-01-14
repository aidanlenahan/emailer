<?php
// Gmail SMTP Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com');
define('SMTP_PASSWORD', 'your-app-password-here');
define('FROM_EMAIL', 'your-email@gmail.com');
define('FROM_NAME', 'Your Name');

// Predefined recipient (leave empty to always ask)
define('DEFAULT_RECIPIENT', '');

// Maximum message length
define('MAX_MESSAGE_LENGTH', 500);
?>
