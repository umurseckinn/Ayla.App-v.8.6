
import os
from PIL import Image

def process_icon():
    source_path = 'assets/icon_original_backup.png'
    dest_path = 'assets/icon.png'
    
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    try:
        img = Image.open(source_path)
        img = img.convert("RGBA")
        
        # Get the bounding box of the non-transparent content
        bbox = img.getbbox()
        if not bbox:
            print("Error: Image is empty")
            return
            
        print(f"Original Size: {img.size}")
        print(f"Content Bounding Box: {bbox}")
        
        # Crop to the content
        content = img.crop(bbox)
        
        # Calculate new size to ensure safe zones
        # iOS Safe Zone: Centered square.
        # Android Safe Zone: Centered circle with diameter = 66% - 72% of canvas width.
        # To satisfy "Logo'nun tamamı gözükecek" (Full logo visible) AND "Hiçbir beyazlık görünmeyecek" (Minimal whitespace),
        # we need to balance.
        # If we make the content 100% of the canvas, Android circle mask WILL cut the corners.
        # To be safe for Android, content diagonal should ideally fit within the circle, or at least the main visual mass.
        # A common safe bet is padding the content by ~20-25%.
        # Let's aim for the content to occupy about 75% of the total canvas size.
        # This gives a good balance between "big logo" and "safe from clipping".
        
        content_w, content_h = content.size
        max_dim = max(content_w, content_h)
        
        # Target content size relative to canvas (e.g. 0.75 means content is 75% of icon width)
        # 0.8 is aggressive but good for "less whitespace". 0.66 is Google's strict recommendation.
        # User complained about "too much whitespace" (likely < 0.6) and "too zoomed" (likely > 0.9 or clipped).
        # Let's try 0.75 (75%)
        SCALE_FACTOR = 0.75
        
        canvas_size = int(max_dim / SCALE_FACTOR)
        
        # Create new square transparent canvas
        new_img = Image.new("RGBA", (canvas_size, canvas_size), (255, 255, 255, 0))
        
        # Paste content in center
        x = (canvas_size - content_w) // 2
        y = (canvas_size - content_h) // 2
        new_img.paste(content, (x, y))
        
        # Resize to standard 1024x1024 for Capacitor
        final_img = new_img.resize((1024, 1024), Image.Resampling.LANCZOS)
        
        final_img.save(dest_path)
        print(f"Processed icon saved to {dest_path}")
        print(f"Applied padding calculation: Content occupies ~{int(SCALE_FACTOR*100)}% of the canvas")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    process_icon()
