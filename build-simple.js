const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building Email Sender Pro...\n');

// Install electron-packager if not present
try {
    require.resolve('electron-packager');
} catch (e) {
    console.log('📦 Installing electron-packager...');
    execSync('npm install --save-dev electron-packager', { stdio: 'inherit' });
}

// Build the application
console.log('📦 Packaging application...');
try {
    execSync('npx electron-packager . "Email Sender Pro" --platform=win32 --arch=x64 --out=dist --overwrite --icon=assets/icon.ico --ignore="dist|node_modules/(electron-builder|@electron)" --prune=false', {
        stdio: 'inherit'
    });
    
    console.log('\n✅ Build complete!');
    console.log('📁 Your .exe file is in: dist\\Email Sender Pro-win32-x64\\');
    console.log('🚀 Run "Email Sender Pro.exe" to start the application');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
