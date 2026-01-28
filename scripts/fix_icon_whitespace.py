
import os
from PIL import Image, ImageChops
import math

def distance(c1, c2):
    (r1,g1,b1,a1) = c1
    (r2,g2,b2,a2) = c2
    return math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2)

def trim_fuzzy_whitespace():
    source_path = 'assets/icon_original_backup.png'
    dest_path = 'assets/icon.png'
    
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    try:
        img = Image.open(source_path)
        img = img.convert("RGBA")
        
        print(f"Original Size: {img.size}")
        
        # Get background color from top-left pixel
        bg_color = img.getpixel((0, 0))
        print(f"Detected Background Color at (0,0): {bg_color}")
        
        # Create a mask: 0 for background, 255 for content
        # We'll use a tolerance.
        # If a pixel is close to bg_color, it's background.
        
        width, height = img.size
        
        left = 0
        top = 0
        right = width
        bottom = height
        
        # Scan for top bound
        # We scan horizontal lines from top. 
        # If we find a pixel significantly different from bg, that's the start.
        
        TOLERANCE = 30 # standard deviation roughly
        
        found = False
        for y in range(height):
            for x in range(width):
                pixel = img.getpixel((x, y))
                if distance(pixel, bg_color) > TOLERANCE:
                    top = y
                    found = True
                    break
            if found: break
            
        if not found:
            print("Warning: Image seems to be solid color.")
            return

        # Scan for bottom bound
        found = False
        for y in range(height - 1, -1, -1):
            for x in range(width):
                pixel = img.getpixel((x, y))
                if distance(pixel, bg_color) > TOLERANCE:
                    bottom = y + 1 # +1 because range is exclusive
                    found = True
                    break
            if found: break
            
        # Scan for left bound
        found = False
        for x in range(width):
            for y in range(height):
                pixel = img.getpixel((x, y))
                if distance(pixel, bg_color) > TOLERANCE:
                    left = x
                    found = True
                    break
            if found: break

        # Scan for right bound
        found = False
        for x in range(width - 1, -1, -1):
            for y in range(height):
                pixel = img.getpixel((x, y))
                if distance(pixel, bg_color) > TOLERANCE:
                    right = x + 1
                    found = True
                    break
            if found: break
            
        bbox = (left, top, right, bottom)
        print(f"Calculated Fuzzy BBox: {bbox}")
        
        logo = img.crop(bbox)
        
        # Now scale to 1024x1024
        canvas_size = 1024
        # We use the detected bg_color for the new canvas to match
        final_img = Image.new("RGBA", (canvas_size, canvas_size), bg_color)
        
        logo_w, logo_h = logo.size
        scale = canvas_size / max(logo_w, logo_h)
        
        new_w = int(logo_w * scale)
        new_h = int(logo_h * scale)
        
        logo_resized = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        x = (canvas_size - new_w) // 2
        y = (canvas_size - new_h) // 2
        
        final_img.paste(logo_resized, (x, y))
        
        final_img.save(dest_path)
        print(f"Success: Trimmed (Fuzzy) icon saved to {dest_path}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    trim_fuzzy_whitespace()
