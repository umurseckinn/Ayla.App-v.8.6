const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const assetsDir = path.join(process.cwd(), 'assets');
const resDir = path.join(process.cwd(), 'android/app/src/main/res');

// Source Images (We assume icon.png is the high-res full bleed logo)
const fullLogoPath = path.join(assetsDir, 'icon.png');
const transparentPath = path.join(assetsDir, 'icon-foreground.png'); // Created in previous step

if (!fs.existsSync(fullLogoPath) || !fs.existsSync(transparentPath)) {
    console.error("Missing source assets!");
    process.exit(1);
}

// Mipmap directories
const mipmaps = [
    'mipmap-mdpi',
    'mipmap-hdpi',
    'mipmap-xhdpi',
    'mipmap-xxhdpi',
    'mipmap-xxxhdpi'
];

// Helper to copy file
function copy(src, dest) {
    fs.copyFileSync(src, dest);
    console.log(`Copied to ${path.relative(process.cwd(), dest)}`);
}

// 1. OVERWRITE ADAPTIVE ICONS (Background = Full Logo, Foreground = Transparent)
// This forces the "Background" layer to hold the image, allowing it to bleed to edges.
mipmaps.forEach(dir => {
    const destDir = path.join(resDir, dir);
    if (fs.existsSync(destDir)) {
        // Background -> Full Logo
        copy(fullLogoPath, path.join(destDir, 'ic_launcher_background.png'));
        // Foreground -> Transparent
        copy(transparentPath, path.join(destDir, 'ic_launcher_foreground.png'));
    }
});

// 2. OVERWRITE LEGACY ICONS (Full Logo)
// ic_launcher.png and ic_launcher_round.png should be the logo itself.
mipmaps.forEach(dir => {
    const destDir = path.join(resDir, dir);
    if (fs.existsSync(destDir)) {
        copy(fullLogoPath, path.join(destDir, 'ic_launcher.png'));
        copy(fullLogoPath, path.join(destDir, 'ic_launcher_round.png'));
    }
});

console.log("Manual Icon Override Complete! Android assets are now forced to Full Bleed.");
