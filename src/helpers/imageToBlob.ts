export default (videoElement?: HTMLVideoElement): Promise<Blob> => new Promise((resolve, reject) => {
  try {
    if (!videoElement) return;
    const canvas = document.createElement('canvas');

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.translate(videoElement.videoWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoElement, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Blob not generated'));
        return;
      }

      resolve(blob);
    }, 'image/png');
  } catch (err) {
    reject(err);
  }
});
