import 'server-only';

const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';
const MAX_IMAGE_SIZE_BYTES = 32 * 1024 * 1024;

interface UploadImageToImgBBOptions {
  imageName: string;
}

export async function uploadImageToImgBB(
  file: File,
  options: UploadImageToImgBBOptions,
): Promise<{ url: string; deleteUrl: string | null }> {
  const apiKey = process.env.IMGBB_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('IMGBB_API_KEY is missing on the server.');
  }

  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Only image files are supported for ImgBB uploads.');
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Image is too large. Max size is 32MB.');
  }

  const imageBase64 = Buffer.from(await file.arrayBuffer()).toString('base64');
  const body = new URLSearchParams();
  body.set('key', apiKey);
  body.set('image', imageBase64);
  body.set('name', options.imageName);

  const response = await fetch(IMGBB_UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const payload = (await response.json().catch(() => null)) as
    | {
        data?: {
          url?: string;
          delete_url?: string;
        };
      }
    | null;

  const url = payload?.data?.url;
  const deleteUrl = payload?.data?.delete_url;

  if (!response.ok || !url) {
    throw new Error('Failed to upload image to ImgBB.');
  }

  return {
    url,
    deleteUrl: typeof deleteUrl === 'string' && deleteUrl.trim() ? deleteUrl : null,
  };
}
