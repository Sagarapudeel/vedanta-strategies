import { supabase, isSupabaseConfigured } from './supabase';

export function slugifySeoName(input = '') {
  return String(input)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9]+/g, '-')     // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '')         // trim hyphens
    .slice(0, 60);
}

export function generateSeoFilename(contextName = '', originalFilename = '', folder = 'uploads') {
  const ext = (originalFilename.split('.').pop() || 'jpg')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') || 'jpg';

  const baseSlug = slugifySeoName(contextName) || slugifySeoName(originalFilename.replace(/\.[^/.]+$/, '')) || 'image';
  const prefix = baseSlug.startsWith('vedanta') ? '' : 'vedanta-strategies-';
  const cleanSlug = `${prefix}${baseSlug}`.replace(/^-+|-+$/g, '').slice(0, 70);
  const uniqueTag = Math.random().toString(36).slice(2, 6);

  return `${folder}/${cleanSlug}-${uniqueTag}.${ext}`;
}

export async function uploadMediaFile(file, folder = 'uploads', contextName = '') {
  if (!file) throw new Error('No file selected');
  if (!file.type.startsWith('image/')) throw new Error('Please select an image file (JPG, PNG, WebP, SVG)');
  if (file.size > 10 * 1024 * 1024) throw new Error('Please choose an image smaller than 10MB.');

  // If Supabase is configured, attempt upload to Supabase storage bucket
  if (isSupabaseConfigured && supabase) {
    try {
      const path = generateSeoFilename(contextName, file.name, folder);
      const { error } = await supabase.storage.from('media').upload(path, file, {
        upsert: false,
        contentType: file.type
      });
      if (!error) {
        const { data } = supabase.storage.from('media').getPublicUrl(path);
        if (data?.publicUrl) return data.publicUrl;
      } else {
        console.warn('Supabase storage error, falling back to local image data:', error);
      }
    } catch (err) {
      console.warn('Supabase upload exception, falling back to local image data:', err);
    }
  }

  // Robust fallback: read file as Data URL so image uploading always works locally and offline
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };
    reader.readAsDataURL(file);
  });
}

