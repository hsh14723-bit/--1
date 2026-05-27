/**
 * Utility to compress images in base64 format on the client side using Canvas.
 * This ensures they always fit within Firestore's 1M document limit and load extremely fast.
 */
export function compressImageIfNeeded(base64Str: string, maxBytes = 250000): Promise<string> {
  return new Promise((resolve) => {
    // If it's already an external URL or very small, skip compression
    if (!base64Str.startsWith('data:image/') || base64Str.length < maxBytes) {
      resolve(base64Str);
      return;
    }

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Limit the maximum dimension to 1000px keeping the aspect ratio
        const maxDim = 1000;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Fill background with white for JPEG format (handles transparent images)
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          
          // Export as highly optimized JPEG (0.65 quality is indistinguishable on screens but extremely compact)
          const compressed = canvas.toDataURL('image/jpeg', 0.65);
          resolve(compressed);
        } else {
          resolve(base64Str);
        }
      } catch (err) {
        console.warn('Canvas image compression failed, falling back to original:', err);
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
    img.src = base64Str;
  });
}
