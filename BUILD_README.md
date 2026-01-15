# Email Sender Pro - Desktop Application

A professional, standalone desktop email sender application with secure configuration management and a modern UI.

## Features

✨ **No Hardcoded Credentials** - All email settings are stored securely in user configuration files  
⚙️ **Easy Settings Management** - Professional settings page with test connection feature  
🎨 **Modern Neutral UI** - Clean, professional design with neutral colors  
🔒 **Secure** - Credentials stored locally on your machine, never hardcoded  
📦 **Standalone Executable** - No need for a web server or PHP  
🖥️ **Cross-Platform** - Works on Windows, macOS, and Linux  

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Application**
   ```bash
   npm start
   ```

3. **Configure Settings**
   - Click the ⚙️ Settings button
   - Enter your SMTP configuration:
     - **SMTP Host**: e.g., `smtp.gmail.com`
     - **SMTP Port**: `587` (TLS) or `465` (SSL)
     - **Username**: Your email address
     - **Password**: Your app password (see below for Gmail)
   - Click "Test Connection" to verify settings
   - Click "Save Settings"

### Gmail Setup (Recommended)

For Gmail users, you need to use an **App Password** instead of your regular password:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password in the settings

**Note**: Regular Gmail passwords will NOT work for security reasons.

## Building Executables

Build standalone executables for distribution:

### Windows
```bash
npm run build:win
```
Output: `dist/Email Sender Pro Setup.exe`

### macOS
```bash
npm run build:mac
```
Output: `dist/Email Sender Pro.dmg`

### Linux
```bash
npm run build:linux
```
Output: `dist/Email Sender Pro.AppImage`

### All Platforms
```bash
npm run build
```

## Project Structure

```
emailer/
├── app/                      # Application UI files
│   ├── index.html           # Main email sender page
│   ├── settings.html        # Settings configuration page
│   ├── styles.css           # Professional styling
│   ├── renderer.js          # Main page logic
│   └── settings-renderer.js # Settings page logic
├── electron/                # Electron main process
│   ├── main.js             # Application entry point
│   └── preload.js          # Secure IPC bridge
├── package.json            # Dependencies and build config
└── README.md              # This file
```

## Configuration Storage

Configuration is stored securely in your system's user data directory:

- **Windows**: `%APPDATA%\email-sender-pro\config.json`
- **macOS**: `~/Library/Application Support/email-sender-pro/config.json`
- **Linux**: `~/.config/email-sender-pro/config.json`

This ensures credentials are never hardcoded and remain on your local machine.

## Usage

1. Launch the application
2. Configure your SMTP settings (one-time setup)
3. Enter recipient, subject, and message
4. Click "Send Email"

## Supported Email Providers

- **Gmail** - Use app password (smtp.gmail.com:587)
- **Outlook/Office365** - (smtp.office365.com:587)
- **Yahoo** - (smtp.mail.yahoo.com:587)
- **Custom SMTP** - Any SMTP server with TLS/SSL

## Troubleshooting

### "Please configure SMTP settings first"
- Go to Settings and fill in all required fields
- Make sure to click "Save Settings"

### "Connection failed" when testing SMTP
- Verify your SMTP host and port are correct
- For Gmail, ensure you're using an app password, not your regular password
- Check if your firewall is blocking port 587 or 465

### Email not sending
- Use "Test Connection" in settings to verify configuration
- Check that the recipient email address is valid
- Ensure your SMTP credentials are correct

## Security Notes

- Credentials are stored locally on your machine
- No credentials are transmitted except to your chosen SMTP server
- Use app passwords instead of regular passwords when available
- Keep your config.json file secure and never share it

## Technology Stack

- **Electron** - Desktop application framework
- **Node.js** - Runtime environment
- **Nodemailer** - Email sending library
- **HTML/CSS/JavaScript** - UI and application logic

## License

MIT License - Feel free to use and modify

## Support

For issues or questions, please refer to the documentation above or check the application's settings for configuration help.

---

**Note**: This application is designed for legitimate email sending purposes. Always respect email service provider terms of service and anti-spam regulations.
