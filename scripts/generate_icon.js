const { Jimp } = require('jimp');
const path = require('path');

async function generateIcon() {
    try {
        const inputPath = path.join(__dirname, '../assets/icon_original_backup.png');
        const outputPath = path.join(__dirname, '../assets/icon.png');

        console.log(`Reading image from ${inputPath}...`);
        const original = await Jimp.read(inputPath);
        
        // --- 1. Background Layer (Extended Atmosphere) ---
        // Clone and resize to COVER the square (zooms in to fill width/height)
        const bg = original.clone();
        bg.cover({ w: 1024, h: 1024 });
        
        // Apply heavy blur to create a smooth texture
        bg.blur(50);
        // Darken the background slightly to make the subject pop
        bg.brightness(-0.1); 

        // --- 2. Foreground Layer (Subject) ---
        // Clone and resize to FIT within the square (preserves full content)
        const fg = original.clone();
        fg.scaleToFit({ w: 1024, h: 1024 });
        
        // --- 3. Edge Blending (Feathering) ---
        // To avoid the "boxy" look, we fade the alpha on the left and right edges of the foreground
        const fadeWidth = 60; // width of the gradient transition in pixels
        const width = fg.width;
        const height = fg.height;

        // Iterate through all pixels to apply alpha mask at edges
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Calculate current alpha (preserve existing transparency if any)
                const idx = fg.getPixelIndex(x, y);
                // Jimp doesn't expose getPixelIndex easily in all versions, use scan or getPixelColor
                // But scan is faster. Let's use loop with getPixelColor/setPixelColor for simplicity or direct bitmap access
            }
        }
        
        // Using scan is more efficient
        fg.scan(0, 0, width, height, function(x, y, idx) {
            // idx is the position in the buffer (R, G, B, A)
            
            let alphaFactor = 1.0;
            
            // Left Edge Fade
            if (x < fadeWidth) {
                alphaFactor = x / fadeWidth; // 0 to 1
            } 
            // Right Edge Fade
            else if (x > width - fadeWidth) {
                alphaFactor = (width - x) / fadeWidth; // 1 to 0
            }
            
            // Apply ease-in-out curve for smoother blending
            // alphaFactor = alphaFactor < 0.5 ? 2 * alphaFactor * alphaFactor : -1 + (4 - 2 * alphaFactor) * alphaFactor;
            // Simple cubic ease out
             alphaFactor = Math.pow(alphaFactor, 2); // Squared makes it fade faster at edge

            const currentAlpha = this.bitmap.data[idx + 3];
            this.bitmap.data[idx + 3] = Math.floor(currentAlpha * alphaFactor);
        });

        // --- 4. Composition ---
        // Center the foreground on the background
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
