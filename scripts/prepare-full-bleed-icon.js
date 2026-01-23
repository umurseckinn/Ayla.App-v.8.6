const fs = require('fs');
const path = require('path');

// 1x1 Pixel Transparent PNG
const transparentPngHex = '89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000A49444154789C63000100000500010D0A2D340000000049454E44AE426082';
const buffer = Buffer.from(transparentPngHex, 'hex');

const assetsDir = path.join(process.cwd(), 'assets');
if (!fs.existsSync(assetsDir)) {
    console.error('Assets directory not found');
    process.exit(1);
}

// 1. Write Transparent Foreground
fs.writeFileSync(path.join(assetsDir, 'icon-foreground.png'), buffer);
console.log('Created transparent icon-foreground.png');

// 2. Copy icon.png to icon-background.png
// ensuring we preserve the original
const iconPath = path.join(assetsDir, 'icon.png');
const backgroundPath = path.join(assetsDir, 'icon-background.png');

if (fs.existsSync(iconPath)) {
    fs.copyFileSync(iconPath, backgroundPath);
    console.log('Copied icon.png to icon-background.png');
} else {
    console.error('icon.png not found!');
    process.exit(1);
}
