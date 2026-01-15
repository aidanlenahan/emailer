# Email Sender Application

**NOTE: Most of this project has been created with generative AI**

A professional email sender application available in three formats:
1. Desktop application (Windows/Mac/Linux)
2. Web interface (PHP-based)
3. Development mode for testing

## Desktop Application

### Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run in Development Mode**
   ```bash
   npm start
   ```

3. **Configure Settings**
   - Click the Settings button in the application
   - Enter your SMTP configuration:
     - SMTP Host: e.g., `smtp.gmail.com`
     - SMTP Port: `587` (TLS) or `465` (SSL)
     - Username: Your email address
     - Password: Your app password
   - Click "Test Connection" to verify settings
   - Click "Save Settings"

### Gmail Setup

For Gmail users, you need an App Password:
1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password in the settings

Note: Regular Gmail passwords will not work for security reasons.

### Building Executables

#### Quick Build (No Admin Rights Required)

```bash
npm run build:simple
```

Your executable will be in: `dist\Email Sender Pro-win32-x64\Email Sender Pro.exe`

#### Advanced Build (Requires Developer Mode)

For Windows installer:
```bash
npm run build:win
```

For macOS:
```bash
npm run build:mac
```

For Linux:
```bash
npm run build:linux
```

For all platforms:
```bash
npm run build
```

Note: Advanced builds may require Windows Developer Mode or administrator privileges for symbolic link creation.

### Distribution

To share the desktop application:
1. Copy the entire `dist\Email Sender Pro-win32-x64\` folder
2. Recipients can run `Email Sender Pro.exe` directly
3. No installation required - the application is portable

### Configuration Storage

Desktop app settings are stored securely in your system's user data directory:
- Windows: `%APPDATA%\email-sender-pro\config.json`
- macOS: `~/Library/Application Support/email-sender-pro/config.json`
- Linux: `~/.config/email-sender-pro/config.json`

## Web Application

### Prerequisites

- WAMP, XAMPP, or similar PHP server
- PHP with OpenSSL enabled

### Setup Instructions

1. **Install PHPMailer**

   Via Composer:
   ```bash
   composer require phpmailer/phpmailer
   ```

   Or manually:
   - Go to https://github.com/PHPMailer/PHPMailer/releases
   - Download the latest release
   - Extract to a folder named `PHPMailer` in this directory

2. **Configure Settings**

   Edit `config.php` to:
   - Set your Gmail credentials
   - Set a default recipient (or leave empty to always ask)
   - Adjust maximum message length if needed

3. **Start Your Server**

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

- Clean, modern interface
- Character counter with visual feedback
- Real-time form validation
- Success/error messages
- Gmail SMTP integration
- Optional predefined recipient
- Secure credential storage (desktop app)
- Available as web app or standalone desktop executable
- No hardcoded credentials in desktop version

## Version Control Best Practices

### Files to Keep in .gitignore

The following should remain in `.gitignore`:

**node_modules/**
- Contains 100+ MB of dependencies
- Can be recreated with `npm install`
- Should NEVER be committed to git

**dist/**
- Contains built executables (200+ MB)
- Can be rebuilt with `npm run build:simple`
- Generated files should not be in version control

**package-lock.json**
- KEEP this file and commit it to git
- Ensures consistent dependency versions across installations
- Critical for reproducible builds

**config.php**
- Contains sensitive credentials
- Should remain in .gitignore for security

## Troubleshooting

### Web Application Issues

If emails aren't sending from the web app:
- Make sure the app password is correct
- Check that port 587 is not blocked
- Verify WAMP's PHP has OpenSSL enabled

### Desktop Application Issues

If emails aren't sending from the desktop app:
- Verify your SMTP settings in the Settings page
- Use "Test Connection" to diagnose connection issues
- For Gmail, ensure you're using an App Password, not your regular password
- Check your firewall isn't blocking the application

### Build Issues

If `npm run build:win` fails with symbolic link errors:
- Use `npm run build:simple` instead (works without admin rights)
- Or enable Windows Developer Mode
- Or run PowerShell as Administrator

## Project Structure

```
emailer/
├── app/                      # Desktop app UI files
│   ├── index.html           # Main email sender page
│   ├── settings.html        # Settings configuration page
│   ├── styles.css           # Application styling
│   ├── renderer.js          # Main page logic
│   └── settings-renderer.js # Settings page logic
├── electron/                # Electron main process
│   ├── main.js             # Application entry point
│   └── preload.js          # Secure IPC bridge
├── PHPMailer/              # PHP email library
├── index.php               # Web app main page
├── send.php                # Web app email sender
├── config.php              # Web app configuration
├── style.css               # Web app styling
├── script.js               # Web app JavaScript
├── package.json            # Node.js dependencies and scripts
└── README.md              # This file
```
