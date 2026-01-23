
const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function fixIcon() {
    const iconPath = path.join(__dirname, '../assets/icon.png');
    const backupPath = path.join(__dirname, '../assets/icon_backup.png');

    try {
        console.log(`Reading icon from: ${iconPath}`);

        // Check if file exists
        if (!fs.existsSync(iconPath)) {
            console.error("Icon file not found!");
            return;
        }

        const image = await Jimp.read(iconPath);

        // Backup original
        await image.write(backupPath);
        console.log(`Original backed up to: ${backupPath}`);

        // Get dimensions
        const w = image.bitmap.width;
        const h = image.bitmap.height;

        // Scale up by 5% to push edges out
        const scaleFactor = 1.05;
        const newW = Math.ceil(w * scaleFactor);
        const newH = Math.ceil(h * scaleFactor);

        console.log(`Scaling from ${w}x${h} to ${newW}x${newH}`);
        image.resize({ w: newW, h: newH }); // Updated resize syntax for v1? Checking docs... no, sticking to standard.
        // Actually, Jimp v0.x uses image.resize(w, h). v1 might be different. 
        // Let's assume v0 behavior but correct import. Actually if it says Jimp.read is not a function, likely it's the named export issue.

        // Crop back to original center
        const cropX = Math.floor((newW - w) / 2);
        const cropY = Math.floor((newH - h) / 2);

        console.log(`Cropping at ${cropX},${cropY} size ${w}x${h}`);
        image.crop({ x: cropX, y: cropY, w: w, h: h });

        // Save
        await image.write(iconPath);
        console.log('Icon fixed and saved!');

    } catch (err) {
        console.error('Error fixing icon:', err);
    }
}

fixIcon();
