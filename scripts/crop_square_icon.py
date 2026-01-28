
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
        
        width, height = img.size
        print(f"Original Dimensions: {width}x{height}")
        
        # Calculate the size of the square crop (min dimension)
        crop_size = min(width, height)
        
        # Calculate coordinates for center crop
        left = (width - crop_size) // 2
        top = (height - crop_size) // 2
        right = left + crop_size
        bottom = top + crop_size
        
        print(f"Cropping to square: {crop_size}x{crop_size} at ({left}, {top}, {right}, {bottom})")
        
        # Crop the image
        img_cropped = img.crop((left, top, right, bottom))
        
        # Resize to standard 1024x1024 for Capacitor
        # High quality resampling
        final_img = img_cropped.resize((1024, 1024), Image.Resampling.LANCZOS)
        
        # Ensure no transparency if user wants "no white background" (assuming app bg is white)
        # But usually icons support transparency. 
        # However, if the user complains about "white background" showing up where they don't want it,
        # it implies the logo was too small.
        # By cropping to full bleed, we eliminate the background issue.
        
        final_img.save(dest_path)
        print(f"Success: Processed icon saved to {dest_path} (1024x1024)")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    process_icon()
