import { useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';
import { toast } from 'sonner';

type Platform = 'ios' | 'android' | 'web';
type SaveAction = 'share' | 'save_photos' | 'save_files';

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1920;
const IMAGE_AREA_WIDTH = 900;
const IMAGE_AREA_HEIGHT = 800;

const AYLA_TEXT_LOGO = "/ayla-text-logo.png";
const LOGO_TARGET_HEIGHT = 216;

// Sanitize user input to prevent XSS attacks
const sanitizeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const getPlatform = (): Platform => {
  if (Capacitor.isNativePlatform()) {
    return Capacitor.getPlatform() as 'ios' | 'android';
  }
  return 'web';
};

interface ImageDimensions {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface LogoDimensions {
  width: number;
  height: number;
  left: number;
  top: number;
}

const calculateImageDimensions = (naturalWidth: number, naturalHeight: number): ImageDimensions => {
  const widthRatio = IMAGE_AREA_WIDTH / naturalWidth;
  const heightRatio = IMAGE_AREA_HEIGHT / naturalHeight;
  const scale = Math.min(widthRatio, heightRatio);

  const scaledWidth = Math.round(naturalWidth * scale);
  const scaledHeight = Math.round(naturalHeight * scale);

  const leftOffset = Math.round((1080 - scaledWidth) / 2);
  const topOffset = Math.round(40 + (IMAGE_AREA_HEIGHT - scaledHeight) / 2);

  return {
    width: scaledWidth,
    height: scaledHeight,
    left: leftOffset,
    top: topOffset
  };
};

const preloadImageWithDimensions = (src: string): Promise<{ dataUrl: string; dimensions: ImageDimensions }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const dimensions = calculateImageDimensions(img.naturalWidth, img.naturalHeight);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        resolve({ dataUrl, dimensions });
      } else {
        resolve({ dataUrl: src, dimensions });
      }
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;

    setTimeout(() => reject(new Error('Image load timeout')), 10000);
  });
};

const preloadLogoWithDimensions = (src: string): Promise<{ dataUrl: string; dimensions: LogoDimensions }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const height = LOGO_TARGET_HEIGHT;
      const width = Math.round(height * aspectRatio);
      const left = Math.round((1080 - width) / 2);
      const top = 1650;

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve({
          dataUrl: canvas.toDataURL('image/png'),
          dimensions: { width, height, left, top }
        });
      } else {
        resolve({
          dataUrl: src,
          dimensions: { width: 360, height: LOGO_TARGET_HEIGHT, left: 360, top: 1720 }
        });
      }
    };
    img.onerror = () => {
      resolve({
        dataUrl: src,
        dimensions: { width: 360, height: LOGO_TARGET_HEIGHT, left: 360, top: 1720 }
      });
    };
    img.src = src;
    setTimeout(() => resolve({
      dataUrl: src,
      dimensions: { width: 360, height: LOGO_TARGET_HEIGHT, left: 360, top: 1720 }
    }), 5000);
  });
};

export interface ShareArchetypeParams {
  archetype: {
    name: string;
    enName?: string;
    group?: string;
    enGroup?: string;
    className?: string;
    enClassName?: string;
    description?: string;
    enDescription?: string;
    image?: string;
    imageFull?: string;
  };
  archetypeKey: string;
  userName: string;
  energyData: {
    categories: {
      spiritual: { percentage: number };
      mental: { percentage: number };
      physical: { percentage: number };
      emotional: { percentage: number };
    };
  };
  archetypeSlogan: string;
  language: 'tr' | 'en';
  archetypeImageUrl: string;
}

const createStaticHTML = (
  params: ShareArchetypeParams,
  archetypeImageData: { dataUrl: string; dimensions: ImageDimensions },
  logoData: { dataUrl: string; dimensions: LogoDimensions }
): string => {
  const { archetype, archetypeKey, userName, energyData, archetypeSlogan, language } = params;
  const isEn = language === 'en';

  const energyLabels = isEn
    ? { spiritual: "SPIRITUAL", mental: "MENTAL", physical: "PHYSICAL", emotional: "EMOTIONAL" }
    : { spiritual: "RUHSAL", mental: "ZİHİNSEL", physical: "FİZİKSEL", emotional: "DUYGUSAL" };

  const defaultUserName = isEn ? "TRAVELER" : "GEZGİN";
  const safeUserName = sanitizeHtml(userName || defaultUserName);
  const archetypeName = isEn ? (archetype.enName || archetype.name) : archetype.name;
  const archetypeGroup = isEn ? (archetype.enGroup || archetype.group) : archetype.group;
  const archetypeClassName = isEn ? (archetype.enClassName || archetype.className) : archetype.className;
  const archetypeDescription = isEn ? (archetype.enDescription || archetype.description) : archetype.description;

  const titleText = isEn
    ? `${safeUserName.toUpperCase()}, THE ${sanitizeHtml(archetypeName).toUpperCase()}`
    : `${safeUserName.toUpperCase()}, ${sanitizeHtml(archetypeName).toUpperCase()}`;

  const sloganMain = archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[0].trim() : archetypeSlogan;
  const sloganSub = archetypeSlogan.includes('(') ? archetypeSlogan.split('(')[1]?.replace(')', '').trim() : null;

  const { dimensions } = archetypeImageData;
  const { dimensions: logoDims, dataUrl: logoDataUrl } = logoData;

  const createStatBarHTML = (label: string, value: number, color: string, left: number): string => {
    const barWidth = Math.round((value / 100) * 175);
    return `
      <div style="position:absolute;left:${left}px;top:0;width:228px">
        <div style="position:relative;width:228px;height:32px">
          <span style="position:absolute;left:4px;top:0;font-size:18px;font-weight:800;color:${color};letter-spacing:-0.5px">${label}</span>
          <span style="position:absolute;right:4px;top:0;font-size:26px;font-weight:700;color:#FFD700;text-shadow:0 0 6px rgba(255,215,0,0.5)">%${value}</span>
        </div>
        <div style="position:absolute;top:40px;left:0;width:175px;height:12px;background-color:rgba(255,255,255,0.05);border-radius:6px;overflow:hidden">
          <div style="position:absolute;left:0;top:0;width:${barWidth}px;height:12px;background-color:${color};border-radius:6px;box-shadow:0 0 12px rgba(255,215,0,0.4)"></div>
        </div>
      </div>
    `;
  };

  return `
    <div style="width:1080px;height:1920px;background-color:#000000;position:relative;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
      <div style="position:absolute;top:0;left:0;width:1080px;height:1920px;background:radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, transparent 70%);pointer-events:none"></div>
      
      <img src="${archetypeImageData.dataUrl}" alt="${archetype.name}" style="position:absolute;top:${dimensions.top}px;left:${dimensions.left}px;width:${dimensions.width}px;height:${dimensions.height}px;object-fit:fill" />
      
      <div style="position:absolute;top:900px;left:0;width:1080px;text-align:center;padding:0 60px;box-sizing:border-box">
        <h2 style="font-size:42px;font-weight:700;color:#FFD700;text-transform:uppercase;letter-spacing:3px;line-height:1.2;margin:0 0 12px 0">${titleText}</h2>
        <p style="font-size:24px;font-weight:500;color:rgba(255,215,0,0.8);text-transform:uppercase;letter-spacing:6px;line-height:1.2;margin:0 0 8px 0">${archetypeGroup?.toUpperCase()} • ${archetypeKey}</p>
        <p style="font-size:22px;font-weight:500;color:rgba(255,215,0,0.7);text-transform:uppercase;letter-spacing:4px;line-height:1.2;margin:0">${archetypeClassName?.toUpperCase()}</p>
      </div>
      
      <div style="position:absolute;top:1080px;left:66px;width:948px;height:60px">
        ${createStatBarHTML(energyLabels.spiritual, energyData.categories.spiritual.percentage, '#A78BFA', 0)}
        ${createStatBarHTML(energyLabels.mental, energyData.categories.mental.percentage, '#60A5FA', 237)}
        ${createStatBarHTML(energyLabels.physical, energyData.categories.physical.percentage, '#FBBF24', 474)}
        ${createStatBarHTML(energyLabels.emotional, energyData.categories.emotional.percentage, '#FB7185', 711)}
      </div>
      
      <div style="position:absolute;top:1200px;left:60px;width:960px;text-align:center">
        <p style="font-size:36px;font-style:italic;font-weight:400;color:#FFD700;line-height:1.3;margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif">"${sloganMain}"</p>
        ${sloganSub ? `<p style="font-size:20px;font-style:italic;font-weight:500;color:rgba(255,215,0,0.7);text-transform:uppercase;letter-spacing:4px;line-height:1.2;margin:0">${sloganSub}</p>` : ''}
      </div>
      
        <div style="position:absolute;top:1340px;left:80px;width:920px;text-align:center">
          <p style="font-size:28px;font-weight:500;color:#FFD700;line-height:1.5;margin:0">${archetypeDescription}</p>
        </div>
        
        <img src="${logoDataUrl}" alt="ayla.app" style="position:absolute;top:${logoDims.top}px;left:${logoDims.left}px;width:${logoDims.width}px;height:${logoDims.height}px;object-fit:contain;filter:invert(1)" />
      </div>
    `;
};

const generateCanvasFromHTML = async (params: ShareArchetypeParams): Promise<HTMLCanvasElement> => {
  console.log('[iOS Export] Loading images as base64...');

  const [archetypeImageData, logoData] = await Promise.all([
    preloadImageWithDimensions(params.archetypeImageUrl),
    preloadLogoWithDimensions(AYLA_TEXT_LOGO),
  ]);

  console.log('[iOS Export] All images loaded, creating static HTML...');

  const renderContainer = document.createElement('div');
  renderContainer.id = 'ios-export-render-container';
  renderContainer.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${EXPORT_WIDTH}px;
    height: ${EXPORT_HEIGHT}px;
    z-index: -9999;
    pointer-events: none;
    overflow: hidden;
    background: #000000;
    transform: none;
    opacity: 1;
    visibility: visible;
  `;

  renderContainer.innerHTML = createStaticHTML(params, archetypeImageData, logoData);
  document.body.appendChild(renderContainer);

  try {
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 100));

    console.log('[iOS Export] Running html2canvas...');

    const canvas = await html2canvas(renderContainer, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
      windowWidth: EXPORT_WIDTH,
      windowHeight: EXPORT_HEIGHT,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      backgroundColor: '#000000',
      logging: false,
      imageTimeout: 0,
      foreignObjectRendering: false,
      removeContainer: false,
      onclone: (_clonedDoc, clonedElement) => {
        clonedElement.style.position = 'absolute';
        clonedElement.style.left = '0';
        clonedElement.style.top = '0';
        clonedElement.style.transform = 'none';
        clonedElement.style.width = `${EXPORT_WIDTH}px`;
        clonedElement.style.height = `${EXPORT_HEIGHT}px`;
      },
    });

    console.log('[iOS Export] Canvas created successfully');
    return canvas;
  } finally {
    if (renderContainer.parentNode) {
      document.body.removeChild(renderContainer);
    }
  }
};

export const useArchetypeShare = () => {
  const isSharing = useRef(false);

  const shareWithParams = useCallback(async (
    params: ShareArchetypeParams,
    action: SaveAction = 'share'
  ) => {
    if (isSharing.current) {
      console.log('[iOS Export] Already sharing, skipping...');
      return;
    }

    const platform = getPlatform();

    try {
      isSharing.current = true;
      console.log(`[iOS Export] Starting | Platform: ${platform} | Action: ${action}`);

      const canvas = await generateCanvasFromHTML(params);
      console.log(`[iOS Export] Canvas captured: ${canvas.width}x${canvas.height}`);

      const archetypeTitle = params.archetype.name;
      const fileName = `ayla-archetype-${archetypeTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
      const base64Full = canvas.toDataURL('image/jpeg', 0.92);
      const base64Data = base64Full.split(',')[1];

      if (!base64Data) {
        throw new Error('Failed to generate base64 data from canvas');
      }

      if (platform === 'ios' || platform === 'android') {
        if (action === 'save_photos') {
          console.log('[iOS Export] Saving to Photos library...');

          const tempFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache,
          });

          try {
            await Media.savePhoto({ path: tempFile.uri });
            toast.success('Fotoğraflara kaydedildi');
            console.log('[iOS Export] Saved to Photos library');
          } catch (mediaError) {
            console.error('[iOS Export] Media save failed:', mediaError);
            toast.error('Fotoğraflara kaydetme başarısız. Lütfen izinleri kontrol edin.');
          }

          try {
            await Filesystem.deleteFile({ path: fileName, directory: Directory.Cache });
          } catch { }

        } else if (action === 'save_files') {
          console.log('[iOS Export] Saving to Files (Documents)...');

          try {
            await Filesystem.writeFile({
              path: fileName,
              data: base64Data,
              directory: Directory.Documents,
            });
            toast.success('Dosyalara kaydedildi');
            console.log('[iOS Export] Saved to Documents folder');
          } catch (fsError) {
            console.error('[iOS Export] Files save failed:', fsError);
            toast.error('Dosyalara kaydetme başarısız.');
          }

        } else {
          console.log('[iOS Export] Opening share sheet...');

          const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache,
          });

          try {
            await Share.share({
              title: `Ayla - ${archetypeTitle}`,
              text: `Ayla Arketip Sistemi: Benim arketipim ${archetypeTitle}!`,
              url: savedFile.uri,
              dialogTitle: 'Arketipini Paylaş',
            });
            console.log('[iOS Export] Share dialog opened');
          } catch (shareError: unknown) {
            const errorMessage = shareError instanceof Error ? shareError.message : String(shareError);
            if (errorMessage.includes('canceled') || errorMessage.includes('cancelled')) {
              console.log('[iOS Export] User cancelled sharing');
              return;
            }
            throw shareError;
          }
        }
      } else {
        console.log('[iOS Export] Web platform fallback');

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Blob creation failed'))),
            'image/jpeg',
            0.92
          );
        });

        const file = new File([blob], fileName, { type: 'image/jpeg' });

        if (action === 'share' && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `Ayla - ${archetypeTitle}`,
              text: `Ayla Arketip Sistemi: Benim arketipim ${archetypeTitle}!`,
            });
            console.log('[iOS Export] Web Share API succeeded');
          } catch (webShareError: unknown) {
            if (webShareError instanceof Error && webShareError.name === 'AbortError') {
              console.log('[iOS Export] User cancelled web share');
              return;
            }
            throw webShareError;
          }
        } else {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          const link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success('Görsel indirildi.');
          console.log('[iOS Export] Download triggered');
        }
      }
    } catch (error: unknown) {
      console.error('[iOS Export] Critical error:', error);

      try {
        const shareText = `Ayla Arketip Sistemi: Benim arketipim ${params.archetype.name}!`;

        if (Capacitor.isNativePlatform()) {
          await Share.share({
            title: 'Ayla Arketipim',
            text: shareText,
            dialogTitle: 'Arketipini Paylaş',
          });
        } else if (navigator.share) {
          await navigator.share({ text: shareText });
        } else {
          toast.error('Görsel oluşturulamadı. Lütfen tekrar deneyin.');
        }
      } catch {
        toast.error('Paylaşım başarısız. Lütfen tekrar deneyin.');
      }
    } finally {
      isSharing.current = false;
      console.log('[iOS Export] Process completed');
    }
  }, []);

  const shareArchetypeCard = useCallback(async (
    _elementId: string,
    _archetypeTitle: string,
    _action?: SaveAction
  ) => {
    console.warn('[iOS Export] Legacy shareArchetypeCard called - use shareWithParams instead');
    toast.error('Paylaşım için güncellenmiş API kullanılmalı');
  }, []);

  const saveToPhotos = useCallback(async (params: ShareArchetypeParams) => {
    return shareWithParams(params, 'save_photos');
  }, [shareWithParams]);

  const saveToFiles = useCallback(async (params: ShareArchetypeParams) => {
    return shareWithParams(params, 'save_files');
  }, [shareWithParams]);

  return {
    shareArchetypeCard,
    shareWithParams,
    saveToPhotos,
    saveToFiles,
  };
};
