
import os
from PIL import Image
import math

def distance(c1, c2):
    (r1,g1,b1,a1) = c1
    (r2,g2,b2,a2) = c2
    return math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2)

def zoom_to_fill_crop():
    source_path = 'assets/icon_original_backup.png'
    dest_path = 'assets/icon.png'
    
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    try:
        img = Image.open(source_path)
        img = img.convert("RGBA")
        
        print(f"Original Size: {img.size}")
        
        # 1. Detect Content (Fuzzy Trim)
        bg_color = img.getpixel((0, 0))
        print(f"Detected Background Color at (0,0): {bg_color}")
        
        width, height = img.size
        left, top, right, bottom = 0, 0, width, height
        
        TOLERANCE = 30 
        
        # Scan Top
        found = False
        for y in range(height):
            for x in range(width):
                if distance(img.getpixel((x, y)), bg_color) > TOLERANCE:
                    top = y
                    found = True
                    break
            if found: break
            
        # Scan Bottom
        found = False
        for y in range(height - 1, -1, -1):
            for x in range(width):
                if distance(img.getpixel((x, y)), bg_color) > TOLERANCE:
                    bottom = y + 1
                    found = True
                    break
            if found: break
            
        # Scan Left
        found = False
        for x in range(width):
            for y in range(height):
                if distance(img.getpixel((x, y)), bg_color) > TOLERANCE:
                    left = x
                    found = True
                    break
            if found: break
            
        # Scan Right
        found = False
        for x in range(width - 1, -1, -1):
            for y in range(height):
                if distance(img.getpixel((x, y)), bg_color) > TOLERANCE:
                    right = x + 1
                    found = True
                    break
            if found: break
            
        bbox = (left, top, right, bottom)
        print(f"Content BBox: {bbox}")
        
        logo = img.crop(bbox)
        logo_w, logo_h = logo.size
        print(f"Cropped Logo Size: {logo_w}x{logo_h}")
        
        # 2. Zoom to Fill with BLEED (Over-zoom) to ensure edges are cut
        TARGET_SIZE = 1024
        BLEED_FACTOR = 1.05 # Zoom 5% extra to cut off any potential edge artifacts
        
        # We want the SMALLER dimension to match TARGET_SIZE * BLEED
        # This forces the image to be slightly larger than the canvas
        
        scale = (TARGET_SIZE * BLEED_FACTOR) / min(logo_w, logo_h)
        print(f"Scale Factor (with 5% bleed): {scale}")
        
        new_w = int(logo_w * scale)
        new_h = int(logo_h * scale)
        
        print(f"Resized to: {new_w}x{new_h}")
        
        logo_resized = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # 3. Center Crop to 1024x1024
        # Calculate center crop box
        left = (new_w - TARGET_SIZE) // 2
        top = (new_h - TARGET_SIZE) // 2
        right = left + TARGET_SIZE
        bottom = top + TARGET_SIZE
        
        final_img = logo_resized.crop((left, top, right, bottom))
        
        final_img.save(dest_path)
        print(f"Success: Zoom-to-Fill icon saved to {dest_path}")
        print("Note: This guarantees NO whitespace/bars on the sides.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    zoom_to_fill_crop()
