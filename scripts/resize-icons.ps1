
$sourceIcon = "$PSScriptRoot\..\assets\icon.png"
$resDir = "$PSScriptRoot\..\android\app\src\main\res"

# Add System.Drawing assembly
Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param([string]$Src, [string]$Dest, [int]$Width, [int]$Height)
    
    $srcImage = [System.Drawing.Bitmap]::FromFile($Src)
    $destImage = New-Object System.Drawing.Bitmap($Width, $Height)
    $graphics = [System.Drawing.Graphics]::FromImage($destImage)
    
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
    $graphics.DrawImage($srcImage, $rect)
    
    $destImage.Save($Dest, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $graphics.Dispose()
    $destImage.Dispose()
    $srcImage.Dispose()
}

function Create-Transparent {
    param([string]$Dest, [int]$Width, [int]$Height)
    $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
    # Default is transparent
    $bmp.Save($Dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$densities = @{
    "mipmap-mdpi" = @{ adaptive = 108; legacy = 48 }
    "mipmap-hdpi" = @{ adaptive = 162; legacy = 72 }
    "mipmap-xhdpi" = @{ adaptive = 216; legacy = 96 }
    "mipmap-xxhdpi" = @{ adaptive = 324; legacy = 144 }
    "mipmap-xxxhdpi" = @{ adaptive = 432; legacy = 192 }
}

foreach ($key in $densities.Keys) {
    $targetDir = Join-Path $resDir $key
    $sizes = $densities[$key]
    
    if (Test-Path $targetDir) {
        Write-Host "Processing $key..."
        
        # 1. Adaptive Icon Background -> Full Logo Resized
        Resize-Image -Src $sourceIcon -Dest (Join-Path $targetDir "ic_launcher_background.png") -Width $sizes.adaptive -Height $sizes.adaptive
        
        # 2. Adaptive Icon Foreground -> Transparent Resized
        Create-Transparent -Dest (Join-Path $targetDir "ic_launcher_foreground.png") -Width $sizes.adaptive -Height $sizes.adaptive
        
        # 3. Legacy Icons -> Full Logo Resized
        Resize-Image -Src $sourceIcon -Dest (Join-Path $targetDir "ic_launcher.png") -Width $sizes.legacy -Height $sizes.legacy
        Resize-Image -Src $sourceIcon -Dest (Join-Path $targetDir "ic_launcher_round.png") -Width $sizes.legacy -Height $sizes.legacy
    }
}

Write-Host "Icon resizing complete."
