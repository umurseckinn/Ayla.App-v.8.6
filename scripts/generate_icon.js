const { Jimp } = require('jimp');
const path = require('path');

async function generateIcon() {
    try {
        const inputPath = path.join(__dirname, '../assets/icon_original_backup.png');
        const outputPath = path.join(__dirname, '../assets/icon.png');

        console.log(`Reading image from ${inputPath}...`);
        const original = await Jimp.read(inputPath);
        console.log('Original image loaded:', original.width, 'x', original.height);
        
        // Create the background (blurred version)
        console.log('Creating background...');
        const bg = original.clone();
        
        // Resize bg to cover the square area (zoom in to fill)
        console.log('Resizing background to cover 1024x1024...');
        bg.cover({ w: 1024, h: 1024 }); // Check if object syntax is needed
        
        // Apply heavy blur
        console.log('Blurring background...');
        bg.blur(40); 
        
        // Create the foreground (sharp subject)
        console.log('Creating foreground...');
        const fg = original.clone();
        
        // Resize foreground to FIT inside the 1024x1024 square
        console.log('Resizing foreground to fit 1024x1024...');
        fg.contain({ w: 1024, h: 1024 }); // scaleToFit vs contain? contain adds bars, we want just resize
        // Actually, scaleToFit just resizes dimensions, doesn't add bars.
        // Let's use resize with 'contain' logic manually if needed, but contain() usually adds background.
        // scaleToFit() resizes the image to fit within the box.
        fg.scaleToFit({ w: 1024, h: 1024 }); 
        
        // Composite foreground onto background
        console.log('Compositing...');
        // Center calculation is needed if scaleToFit doesn't center (it doesn't, it just resizes).
        const x = (1024 - fg.width) / 2;
        const y = (1024 - fg.height) / 2;
        
        bg.composite(fg, x, y);
        
        console.log(`Writing processed icon to ${outputPath}...`);
        await bg.write(outputPath);
        console.log('Icon generation complete!');
        
    } catch (error) {
        console.error('Error generating icon:', error.message);
        if (error.stack) console.error(error.stack);
    }
}

generateIcon();
