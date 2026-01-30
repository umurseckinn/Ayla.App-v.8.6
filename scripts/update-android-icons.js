
const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

const SOURCE_IMAGE = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/assets/IMG_1553.jpg';
const RES_DIR = '/Users/umurseckin/Desktop/AYLA.app-v.8.2/android/app/src/main/res';

const SIZES = {
    'mipmap-mdpi': { legacy: 48, adaptive: 108 },
    'mipmap-hdpi': { legacy: 72, adaptive: 162 },
    'mipmap-xhdpi': { legacy: 96, adaptive: 216 },
    'mipmap-xxhdpi': { legacy: 144, adaptive: 324 },
    'mipmap-xxxhdpi': { legacy: 192, adaptive: 432 }
};

async function generateIcons() {
    try {
        console.log(`Reading source image from ${SOURCE_IMAGE}...`);
        const image = await Jimp.read(SOURCE_IMAGE);
        
        // Get the background color
        const bgColor = image.getPixelColor(0, 0);
        const hexColor = '#' + image.getPixelColor(0, 0).toString(16).slice(0, -2).padStart(6, '0');
        console.log(`Detected background color: ${hexColor}`);

        for (const [folder, sizes] of Object.entries(SIZES)) {
            const folderPath = path.join(RES_DIR, folder);
            if (!fsSync.existsSync(folderPath)) {
                console.log(`Directory ${folderPath} does not exist, skipping...`);
                continue;
            }

            // 1. Generate Legacy Icon (ic_launcher.png)
            // User requested NO padding/scaling. Use full size.
            const legacySize = sizes.legacy;
            const legacyCanvas = new Jimp({ width: legacySize, height: legacySize, color: bgColor });
            const legacyImage = image.clone();
            
            // Resize to exact dimensions
            legacyImage.resize({ w: legacySize, h: legacySize }); 
            
            const legacyPath = path.join(folderPath, 'ic_launcher.png');
            const legacyBuffer = await legacyImage.getBuffer('image/png'); // Use image directly, no canvas composite needed really, but let's stick to pattern
            await fs.writeFile(legacyPath, legacyBuffer);
            console.log(`Generated ${legacyPath}`);

            // 2. Generate Round Icon (ic_launcher_round.png)
            const roundPath = path.join(folderPath, 'ic_launcher_round.png');
            await fs.writeFile(roundPath, legacyBuffer);
            console.log(`Generated ${roundPath}`);

            // 3. Generate Adaptive Foreground (ic_launcher_foreground.png)
            // User requested NO padding/scaling. Use full size.
            const adaptiveSize = sizes.adaptive;
            // const adaptiveCanvas = new Jimp({ width: adaptiveSize, height: adaptiveSize, color: bgColor });
            const adaptiveImage = image.clone();
            
            adaptiveImage.resize({ w: adaptiveSize, h: adaptiveSize });
            
            const foregroundPath = path.join(folderPath, 'ic_launcher_foreground.png');
            const adaptiveBuffer = await adaptiveImage.getBuffer('image/png');
            await fs.writeFile(foregroundPath, adaptiveBuffer);
            console.log(`Generated ${foregroundPath}`);
            
            // 4. Update Background (ic_launcher_background.png)
            const bgCanvas = new Jimp({ width: adaptiveSize, height: adaptiveSize, color: bgColor });
            const backgroundPath = path.join(folderPath, 'ic_launcher_background.png');
            const bgBuffer = await bgCanvas.getBuffer('image/png');
            await fs.writeFile(backgroundPath, bgBuffer);
            console.log(`Generated ${backgroundPath}`);
        }

        console.log('Android icon generation complete!');
        
    } catch (error) {
        console.error('Error generating icons:', error);
        process.exit(1);
    }
}

generateIcons();
