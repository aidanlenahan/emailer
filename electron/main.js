const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

let mainWindow;
let settingsWindow;

// Config file path
const configPath = path.join(app.getPath('userData'), 'config.json');

// Default config
const defaultConfig = {
  smtpHost: '',
  smtpPort: 587,
  smtpUsername: '',
  smtpPassword: '',
  fromEmail: '',
  fromName: '',
  defaultRecipient: '',
  maxMessageLength: 500
};

// Load config
function loadConfig() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }
  return { ...defaultConfig };
}

// Save config
function saveConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 750,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#f5f5f5',
    resizable: false,
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, '../app/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 600,
    height: 700,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#f5f5f5',
    resizable: false,
    autoHideMenuBar: true
  });

  settingsWindow.loadFile(path.join(__dirname, '../app/settings.html'));

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

// Create menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+,',
          click: () => createSettingsWindow()
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            // Could add about dialog here
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMainWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers

// Get config
ipcMain.handle('get-config', () => {
  return loadConfig();
});

// Save config
ipcMain.handle('save-config', (event, config) => {
  return saveConfig(config);
});

// Test SMTP connection
ipcMain.handle('test-smtp', async (event, config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: {
        user: config.smtpUsername,
        pass: config.smtpPassword
      }
    });

    await transporter.verify();
    return { success: true, message: 'Connection successful!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Send email
ipcMain.handle('send-email', async (event, { recipient, subject, message }) => {
  try {
    const config = loadConfig();

    // Validate config
    if (!config.smtpHost || !config.smtpUsername || !config.smtpPassword || !config.fromEmail) {
      return { 
        success: false, 
        message: 'Please configure SMTP settings first (File → Settings)' 
      };
    }

    // Validate inputs
    if (!recipient || !subject || !message) {
      return { success: false, message: 'All fields are required' };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: {
        user: config.smtpUsername,
        pass: config.smtpPassword
      }
    });

    // Send email
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: recipient,
      subject: subject,
      text: message,
      html: message.replace(/\n/g, '<br>')
    });

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Open settings window
ipcMain.handle('open-settings', () => {
  createSettingsWindow();
});
