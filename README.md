# Email Sender Application

A simple web-based email sender using Gmail SMTP.

## Setup Instructions

### 1. Install PHPMailer

Run this command in the `emailer` directory:

```bash
composer require phpmailer/phpmailer
```

If you don't have Composer, download PHPMailer manually:
- Go to https://github.com/PHPMailer/PHPMailer/releases
- Download the latest release
- Extract it to a folder named `PHPMailer` in this directory

### 2. Configure Settings

Edit `config.php` to:
- Set a default recipient (or leave empty to always ask)
- Adjust maximum message length if needed

### 3. Start Your Server

Make sure WAMP is running, then access:
```
http://localhost/emailer/
```

## Usage

1. Enter recipient email (or use the predefined one)
2. Enter subject line
3. Type your message (max 500 characters)
4. Click "Send Email"

## Features

- ✅ Clean, modern interface
- ✅ Character counter
- ✅ Form validation
- ✅ Success/error messages
- ✅ Gmail SMTP integration
- ✅ Optional predefined recipient

## Troubleshooting

If emails aren't sending:
- Make sure the app password is correct
- Check that port 587 is not blocked
- Verify WAMP's PHP has OpenSSL enabled
